import { Proposal, StorageJsonFileType } from '@shared/typings';
import {
  convertToIpfsProposal,
  convertToOnChainProposal,
} from '@shared/utils/proposal.utils';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import toast from 'react-hot-toast';

import { useStorage } from './useStorage';

import { useUser } from './useUser';

import { proposalContract } from '../config/contracts/proposals';

type useIncidentsProps = {
  proposals: Proposal[];
  loading: boolean;
};

export function useProposals(): useIncidentsProps {
  const { signer } = useUser();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getJsonFile } = useStorage();

  useEffect(() => {
    getProposalsByPage();
  }, []);

  async function getProposalsByPage() {
    try {
      // Create a new contract instance with the Contract constructor
      const contract = new ethers.Contract(
        proposalContract.address,
        proposalContract.abi,
        signer,
      );
      const arr: Proposal[] = [];
      const onChainProposals = await contract.getProposalsByPage(0);
      for (const onChainProposal of onChainProposals) {
        const props = convertToOnChainProposal(onChainProposal);
        const res = await getJsonFile(
          onChainProposal.cid,
          StorageJsonFileType.PROPOSAL,
        );
        const proposal = convertToIpfsProposal(res);
        arr.push({
          ...props,
          ...proposal,
        } as Proposal);
      }
      setProposals(arr);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please reload the page.');
    }
  }

  return useMemo(() => ({ loading, proposals }), [loading, proposals]);
}
