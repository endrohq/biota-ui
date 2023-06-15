import { Modal } from '@shared/components/modal';
import { IpfsProposal } from '@shared/typings';
import { useState } from 'react';

import { ErrorMessage } from './ErrorMessage';
import { SuccessfulCreate } from './SucessfulCreate';
import { WriteToHedera } from './WriteToHedera';
import { WriteToIpfs } from './WriteToIpfs';

interface CreateModalProps {
  proposal: Partial<IpfsProposal>;
  close: () => void;
  id: string;
}

export function CreateModal({ proposal, close, id }: CreateModalProps) {
  const [cid, setCid] = useState<string>();
  const [txSuccess, setTxSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>();

  return (
    <Modal open>
      <div className="py-20">
        {error ? (
          <ErrorMessage error={error} close={close} />
        ) : !cid ? (
          <WriteToIpfs
            proposal={proposal}
            setCid={setCid}
            onError={setError}
            id={id}
          />
        ) : !txSuccess ? (
          <WriteToHedera
            cid={cid}
            id={id}
            onSuccess={() => setTxSuccess(true)}
            onError={setError}
          />
        ) : (
          <SuccessfulCreate cid={cid} />
        )}
      </div>
    </Modal>
  );
}
