export const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_forestTokenId',
        type: 'uint256',
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
    name: 'createProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_proposalId',
        type: 'bytes32',
      },
    ],
    name: 'getProposalById',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'id',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'forestTokenId',
            type: 'uint256',
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
          {
            internalType: 'uint256',
            name: 'forVotes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'againstVotes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'abstainVotes',
            type: 'uint256',
          },
        ],
        internalType: 'struct ProposalContract.Proposal',
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
    name: 'getProposalsByPage',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'id',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'forestTokenId',
            type: 'uint256',
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
          {
            internalType: 'uint256',
            name: 'forVotes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'againstVotes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'abstainVotes',
            type: 'uint256',
          },
        ],
        internalType: 'struct ProposalContract.Proposal[]',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'proposalIds',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
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
    name: 'proposals',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'forestTokenId',
        type: 'uint256',
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
      {
        internalType: 'uint256',
        name: 'forVotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'againstVotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'abstainVotes',
        type: 'uint256',
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
        internalType: 'bool',
        name: 'voteFor',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'voteAgainst',
        type: 'bool',
      },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'voted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
