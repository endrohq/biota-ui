export const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_objectionId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_proposalId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'cid',
        type: 'string',
      },
    ],
    name: 'createObjection',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_objectionId',
        type: 'bytes32',
      },
    ],
    name: 'getObjectionById',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'id',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'cid',
            type: 'string',
          },
          {
            internalType: 'bytes32',
            name: 'proposalId',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
        ],
        internalType: 'struct ObjectionContract.Objection',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_proposalId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'page',
        type: 'uint256',
      },
    ],
    name: 'getObjectionsByPage',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'id',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'cid',
            type: 'string',
          },
          {
            internalType: 'bytes32',
            name: 'proposalId',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
        ],
        internalType: 'struct ObjectionContract.Objection[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'objections',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'cid',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'proposalId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
