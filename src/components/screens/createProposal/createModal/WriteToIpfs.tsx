import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { IpfsProposal } from '@shared/typings';

import { useEffect } from 'react';

import { useStorage } from '../../../../hooks/useStorage';

interface CreateModalProps {
  proposal: Partial<IpfsProposal>;
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
  const { upload } = useStorage();

  useEffect(() => {
    const uploadContent = async () => {
      try {
        const cid = await upload(id, proposal);
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
