import { Feature } from '@nebula.gl/edit-modes';

export type OnChainIncident = {
  id: string;
  cid: string;
  author: Hash;
};

export type IncidentContent = {
  locationName: string;
  location: Feature[];
};

export type Incident = IncidentContent & OnChainIncident;

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

export type Proposal = IncidentContent & OnChainIncident;

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

export enum Category {
  MOBILITY = 'mobility',
  SPATIAL_PLANNING = 'spatial-planning',
  CONFLICT_OF_INTEREST = 'conflict-of-interest',
  DE_PAVING = 'de-paving',
  PROCEDURE = 'procedure',
  CONSTRUCTION_PHASE = 'construction-phase',
  IMPACT_ON_CLIMATE = 'impact-on-climate',
  SAFETY = 'safety',
  VISUAL_IMPACT = 'visual-impact',
  PRIVACY = 'privacy',
  NUISANCE = 'nuisance',
  MATERIAL_USAGE = 'material-usage',
  FOREST_COMPENSATION = 'forest-compensation',
  HEALTH = 'health',
  ENERGY_CONSUMPTION = 'energy-consumption',
  PLANNING_CONTEXT = 'planning-context',
  ENVIRONMENTAL_IMPACT_REPORT = 'environmental-impact-report',
  WATER = 'water',
  AIR_QUALITY = 'air-quality',
  ECOLOGY = 'ecology',
  NOISE_POLLUTION = 'noise-pollution',
  LIGHT_POLLUTION = 'light-pollution',
  ODOR_NUISANCE = 'odor-nuisance',
}

export type CategoryWithName = { name: string; identifier: Category };

export type MenuItem<T> = {
  label: T;
  id: string;
};
