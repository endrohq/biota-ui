import { Modal } from '@shared/components/modal';
import { CreateIncidentForm } from '@shared/typings';
import { useState } from 'react';

import { CreateProposal } from './CreateProposal';
import { ErrorMessage } from './ErrorMessage';
import { RegisterLocation } from './RegisterLocation';
import { SuccessfulCreate } from './SucessfulCreate';

interface CreateModalProps {
  incident: CreateIncidentForm;
  close: () => void;
}

export function CreateModal({ incident, close }: CreateModalProps) {
  const [incidentId, setIncidentId] = useState<string>();
  const [txSuccess, setTxSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>();

  /*
      1. Register Location
        1.1. Write to IPFS
        1.2. Write to Hedera
      --
      2. Create Proposal
        2.1. Write to IPFS
        2.2. Write to Hedera
  */

  return (
    <Modal open>
      <div className="py-20">
        {error ? (
          <ErrorMessage error={error} close={close} />
        ) : !incidentId ? (
          <RegisterLocation
            incident={incident}
            onError={setError}
            onSuccess={id => setIncidentId(id)}
          />
        ) : !txSuccess ? (
          <CreateProposal
            incidentId={incidentId}
            proposal={incident.proposal}
            onSuccess={() => setTxSuccess(true)}
            onError={setError}
          />
        ) : (
          <SuccessfulCreate id={incidentId} />
        )}
      </div>
    </Modal>
  );
}
