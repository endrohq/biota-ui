export type OnChainProposal = {
  fileId: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  author: string;
};

export type IpfsProposal = {
  title: string;
  description: string;
  author: string;
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
