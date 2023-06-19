import { Hash } from '@shared/typings';

import { abi } from './abi';
import { byteCode } from './bytecode';

export const objectionContract = {
  abi,
  byteCode,
  address:
    (process.env.NEXT_PUBLIC_OBJECTIONS_CONTRACT_ADDRESS as Hash) || undefined,
};
