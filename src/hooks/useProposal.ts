import { Proposal, StorageJsonFileType } from '@shared/typings';
import {
  convertToOnChainProposal,
  convertToIpfsProposal,
} from '@shared/utils/proposal.utils';
import { ethers, utils } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import { useStorage } from './useStorage';

import { useUser } from './useUser';

import { proposalContract } from '../config/contracts/proposals';

type useProposalProps = {
  proposal?: Proposal | undefined;
  loading: boolean;
};

export function useProposal(id: string): useProposalProps {
  const { signer } = useUser();
  const { getJsonFile } = useStorage();
  const [isLoadingIpfs, setIsLoadingIpfs] = useState<boolean>(true);
  const [proposal, setProposal] = useState<Proposal>();

  useEffect(() => {
    getProposal();
  }, []);

  async function getProposal() {
    // Create a new contract instance with the Contract constructor
    const contract = new ethers.Contract(
      proposalContract.address,
      proposalContract.abi,
      signer,
    );
    const data = await contract.getProposalById(utils.formatBytes32String(id));
    const props = convertToOnChainProposal(data as Record<string, any>);

    if (props?.cid) {
      const res = await getJsonFile(props.cid, StorageJsonFileType.PROPOSAL);
      const ipfsProposal = convertToIpfsProposal(res);
      setProposal({
        ...props,
        ...ipfsProposal,
      } as Proposal);
      setIsLoadingIpfs(false);
    }
  }

  return useMemo(
    () => ({
      loading: isLoadingIpfs,
      proposal,
    }),
    [isLoadingIpfs, proposal],
  );
}
