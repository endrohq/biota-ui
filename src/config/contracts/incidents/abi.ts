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
        name: '_incidentId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'cid',
        type: 'string',
      },
    ],
    name: 'createIncident',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_incidentId',
        type: 'bytes32',
      },
    ],
    name: 'getIncidentById',
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
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
        ],
        internalType: 'struct IncidentContract.Incident',
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
        internalType: 'uint256',
        name: 'page',
        type: 'uint256',
      },
    ],
    name: 'getIncidentByPage',
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
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
        ],
        internalType: 'struct IncidentContract.Incident[]',
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
    name: 'incidents',
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
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
