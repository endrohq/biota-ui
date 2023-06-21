import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { MinusCircleOutlined } from '@shared/components/icons/MinusCircleOutlined';
import { CreateIncidentForm } from '@shared/typings';

import { randomBytes32 } from '@shared/utils/string.utils';
import { ethers, utils } from 'ethers';
import { useEffect, useState } from 'react';

import { incidentContract } from '../../../../config/contracts/incidents';
import { useStorage } from '../../../../hooks/useStorage';
import { useUser } from '../../../../hooks/useUser';

interface CreateModalProps {
  incident: CreateIncidentForm;
  onError: (error: Error | unknown) => void;
  onSuccess: (cid: string) => void;
}

type WriteStatus = 'stale' | 'writeToIpfs' | 'writeToHedera' | 'done' | 'error';

export function RegisterLocation({
  incident,
  onError,
  onSuccess,
}: CreateModalProps) {
  const { uploadIncident } = useStorage();
  const [writeStatus, setWriteStatus] = useState<WriteStatus>('stale');
  const { signer } = useUser();
  const [cid, setCid] = useState<string>('');

  useEffect(() => {
    if (writeStatus === 'stale') {
      uploadContent();
    } else if (writeStatus === 'writeToHedera') {
      createIncident();
    }
  }, [writeStatus]);

  const uploadContent = async () => {
    try {
      const cid = await uploadIncident(incident);
      setCid(cid);
      setWriteStatus('writeToHedera');
    } catch (error) {
      onError(error);
    }
  };

  async function createIncident() {
    // Check if Web3 has been injected by the browser
    // MetaMask is present, set it as the current provider for ethers.js

    try {
      const id = randomBytes32();
      const myContract = new ethers.Contract(
        incidentContract.address,
        incidentContract.abi,
        signer,
      );
      const incrementTx = await myContract.createIncident(
        utils.formatBytes32String(id),
        cid,
      );
      await incrementTx.wait();
      onSuccess(id);
    } catch (error) {
      onError(error);
      console.log(error);
    }
  }

  return (
    <div className="flex h-full flex-col px-4">
      <div className="mb-3 border-b border-gray-100 pb-4 text-sm font-semibold">
        Registering location
      </div>
      <div className="mb-2 flex justify-between">
        <div className="text-sm">Writing to IPFS</div>
        <div className="text-gray-500">
          {writeStatus === 'stale' ? (
            <MinusCircleOutlined />
          ) : writeStatus === 'writeToIpfs' ? (
            <LoadingOutlined />
          ) : (
            (writeStatus === 'writeToHedera' || writeStatus === 'done') && (
              <CheckCircleOutlined className="text-green-500" />
            )
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm">Writing to Hedera</div>
        <div className="text-gray-500">
          {writeStatus === 'stale' || writeStatus === 'writeToIpfs' ? (
            <MinusCircleOutlined />
          ) : writeStatus === 'writeToHedera' ? (
            <LoadingOutlined />
          ) : (
            writeStatus === 'done' && (
              <CheckCircleOutlined className="text-green-500" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
