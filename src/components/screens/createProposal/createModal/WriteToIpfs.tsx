import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { CreateProposalForm } from '@shared/typings';

import { useEffect } from 'react';

import { useStorage } from '../../../../hooks/useStorage';

interface CreateModalProps {
  proposal: CreateProposalForm;
  id: string;
  setCid: (cid: string) => void;
  onError: (error: Error | unknown) => void;
}

export function WriteToIpfs({
  proposal,
  setCid,
  onError,
  id,
}: CreateModalProps) {
  const { uploadIncident } = useStorage();

  useEffect(() => {
    const uploadContent = async () => {
      try {
        const cid = await uploadIncident(id, proposal);
        setCid(cid);
      } catch (error) {
        onError(error);
      }
    };
    uploadContent();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      <LoadingOutlined className="text-2xl text-gray-600" />
      <div>Writing to IPFS..</div>
    </div>
  );
}
