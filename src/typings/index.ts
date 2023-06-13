export type User = {
  uid: string;
  displayName: string;
  photoURL: string;
  createdAt: string;
};

export type Proposal = {
  id: string;
  title: string;
  description?: string;
  requiredCourseIds: string[];
};

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
