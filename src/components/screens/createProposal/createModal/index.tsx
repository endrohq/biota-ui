import { Modal } from '@shared/components/modal';
import { CreateProposalForm } from '@shared/typings';
import { useState } from 'react';

import { CreateProposal } from './CreateProposal';
import { ErrorMessage } from './ErrorMessage';
import { SuccessfulCreate } from './SucessfulCreate';

interface CreateModalProps {
  proposal: CreateProposalForm;
  close: () => void;
}

export function CreateModal({ proposal, close }: CreateModalProps) {
  const [proposalId, setProposalId] = useState<string>();
  const [error, setError] = useState<Error | unknown>();

  return (
    <Modal open>
      <div className="py-20">
        {error ? (
          <ErrorMessage error={error} close={close} />
        ) : !proposalId ? (
          <CreateProposal
            proposal={proposal}
            onSuccess={id => setProposalId(id)}
            onError={setError}
          />
        ) : (
          <SuccessfulCreate id={proposalId} />
        )}
      </div>
    </Modal>
  );
}
