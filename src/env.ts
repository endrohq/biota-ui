import { Hash } from '@shared/typings';

export const incidentContractAddress =
  (process.env.NEXT_PUBLIC_INCIDENTS_CONTRACT_ADDRESS as Hash) || undefined;

export const proposalsContractAddress =
  (process.env.NEXT_PUBLIC_PROPOSALS_CONTRACT_ADDRESS as Hash) || undefined;

export const objectionsContractAddress =
  (process.env.NEXT_PUBLIC_OBJECTIONS_CONTRACT_ADDRESS as Hash) || undefined;
