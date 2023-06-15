import { utils } from 'ethers';
import { useState } from 'react';

import { useContractRead } from 'wagmi';

import { abi } from '../config/contracts/abi';
import { proposalContractAddress } from '../env';

type UseProposalProps = {
  proposalIds: string[];
  loading: boolean;
};

export function useProposals(): UseProposalProps {
  const [proposalIds, setProposalIds] = useState<string[]>([]);
  const [loading, _] = useState<boolean>(true);

  useContractRead({
    address: proposalContractAddress,
    abi,
    functionName: 'getProposalIds',
    onSuccess: (data: any) => {
      setProposalIds(data?.map((id: any) => utils.parseBytes32String(id)));
    },
  });

  return { loading, proposalIds };
}
