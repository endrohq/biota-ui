import { Feature } from '@nebula.gl/edit-modes';
import { Position } from '@nebula.gl/edit-modes/src/geojson-types';

export type OnChainProposal = {
  id: string;
  cid: string;
  forestTokenId: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  startTimestamp: Date;
  endTimestamp: Date;
  author: Hash;
};

export type IpfsProposal = {
  title: string;
  description: string;
};

export type Proposal = IpfsProposal & OnChainProposal;

export type Course = {
  id: string;
  title: string;
  description?: string;
};

export enum VoteType {
  FOR = 0,
  AGAINST = 1,
  ABSTAIN = 2,
}

export type Hash = `0x${string}`;

export type CreateProposalForm = {
  title?: string;
  description?: string;
  images?: File[];
  forest?: Forest;
};

export interface DeployedContract {
  variable: string;
  contractAddress: string;
}

export interface DeployedToken {
  variable: string;
  tokenId: string;
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

export type WriteStatus =
  | 'stale'
  | 'writeToIpfs'
  | 'writeToHedera'
  | 'done'
  | 'error';

export type DeployState = 'deploying' | 'error' | 'deployed' | 'stale';

export interface Forest {
  tokenId: string;
  cid: string;
  name: string;
  creator: string;
  description: string;
  image: string;
  checksum: string;
  properties: { location: Feature[] };
}

export type OnChainObjection = {
  id: string;
  cid: string;
  proposalId: string;
  author: string;
  dateCreated: Date;
};

export type IpfsObjection = {
  content: string;
  category: Category;
};

export type Objection = IpfsObjection & OnChainObjection;

export enum StorageJsonFileType {
  OBJECTION = 'objection',
  METADATA = 'metadata',
  PROPOSAL = 'proposal',
}

export type Vote = {
  voter: string;
  choice: VoteType;
};

export enum HederaMessageTopics {
  PROPOSAL = 'proposal',
}

export type MessageType = 'PROPOSAL_CREATED';

export type HcsNewProposalMessage = {
  type: MessageType;
  location: Position;
  name?: string;
  route: string;
  isViewed?: boolean;
};

export type HcsMessage = HcsNewProposalMessage;
