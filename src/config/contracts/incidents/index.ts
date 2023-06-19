import { Hash } from '@shared/typings';

import { abi } from './abi';
import { bytecode } from './bytecode';

export const incidentContract = {
  abi,
  byteCode: bytecode,
  address:
    (process.env.NEXT_PUBLIC_INCIDENTS_CONTRACT_ADDRESS as Hash) || undefined,
};
