import { Hash } from '@shared/typings';

export const proposalContractAddress =
  (process.env.NEXT_PUBLIC_PROPOSAL_CONTRACT_ADDRESS as Hash) || undefined;
