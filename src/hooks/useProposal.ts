import { Proposal } from '@shared/typings';
import { utils } from 'ethers';
import { useState } from 'react';

import { useContractRead } from 'wagmi';

import { useStorage } from './useStorage';

import { abi } from '../config/contracts/abi';
import { proposalContractAddress } from '../env';

type UseProposalProps = {
  proposal: Proposal | null;
  loading: boolean;
};

export function useProposal(proposalId: string): UseProposalProps {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const { readProposal } = useStorage();
  const [loading, _] = useState<boolean>(true);

  useContractRead({
    address: proposalContractAddress,
    abi,
    args: [utils.formatBytes32String(proposalId)],
    functionName: 'getProposalById',
    onSuccess: async (data: any) => {
      console.log(data);
      const content = await readProposal(data?.fileId);
      console.log(content);
      setProposal({} as Proposal);
    },
  });

  return { loading, proposal };
}
