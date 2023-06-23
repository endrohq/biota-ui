import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { Proposal } from '@shared/typings';
import React, { createContext, ReactNode, useContext } from 'react';

import { useProposal } from '../hooks/useProposal';

interface ProposalContextProps {
  children: ReactNode;
  proposalId: string;
}

interface useProposalContextProps {
  proposal?: Proposal;
}

export const useProposalContext = () => {
  const context = useContext(ProposalContext);
  if (!context) {
    throw new Error(
      `useProposalContext must be used within a ProposalProvider`,
    );
  }
  return context;
};

const ProposalContext = createContext<useProposalContextProps>({
  proposal: undefined,
});

export default function ProposalProvider({
  proposalId,
  children,
}: ProposalContextProps) {
  const { proposal, loading } = useProposal(proposalId);

  return (
    <ProposalContext.Provider value={{ proposal }}>
      {loading ? <LoadingOutlined /> : children}
    </ProposalContext.Provider>
  );
}
