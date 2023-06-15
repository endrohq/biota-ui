export type OnChainProposal = {
  id: string;
  cid: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  author: Hash;
};

export type IpfsProposal = {
  title: string;
  description: string;
  requiredCourseIds: string[];
};

export type Proposal = IpfsProposal & OnChainProposal;

export type Course = {
  id: string;
  title: string;
  description?: string;
};

export enum VoteTypes {
  'for' = 'for',
  'against' = 'against',
  'abstain' = 'abstain',
}

export type Hash = `0x${string}`;
