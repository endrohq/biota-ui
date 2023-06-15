import { IpfsProposal } from '@shared/typings';
import { utils } from 'ethers';
import { useState } from 'react';

import { useContractRead } from 'wagmi';

import { useStorage } from './useStorage';

import { abi } from '../config/contracts/abi';
import { proposalContractAddress } from '../env';

type UseProposalProps = {
  proposal: IpfsProposal | null;
  loading: boolean;
};

export function useProposal(proposalId: string): UseProposalProps {
  const [proposal, setProposal] = useState<IpfsProposal | null>(null);
  const { readProposal } = useStorage();
  const [loading, _] = useState<boolean>(true);

  return { loading, proposal };
}
