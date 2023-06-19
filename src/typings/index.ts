import { Feature } from '@nebula.gl/edit-modes';

export type OnChainIncident = {
  id: string;
  cid: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  author: Hash;
};

export type IncidentContent = {
  title: string;
  description: string;
  location: number[][];
  requiredCourseIds: string[];
  positions: Feature[];
};

export type Incident = IncidentContent & OnChainIncident;

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

export type CreateIncidentForm = {
  proposal: CreateProposalForm;
  location: Feature[];
  locationName: string;
};

export type CreateProposalForm = {
  title?: string;
  description?: string;
  images?: File[];
};

export interface DeployedContract {
  variable: string;
  contractAddress: string;
}
