import { Hash } from '@shared/typings';

import { abi } from './abi';
import { bytecode } from './bytecode';

export const proposalContract = {
  abi,
  byteCode: bytecode,
  address:
    (process.env.NEXT_PUBLIC_PROPOSALS_CONTRACT_ADDRESS as Hash) ||
    '0xD9a1aD695dee0512646F34819b0ac98a037A53c8',
};
