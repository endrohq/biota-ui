import { Hash } from '@shared/typings';

export const incidentContractAddress =
  (process.env.NEXT_PUBLIC_INCIDENTS_CONTRACT_ADDRESS as Hash) || undefined;
