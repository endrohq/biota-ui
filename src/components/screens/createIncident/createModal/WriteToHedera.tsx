import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';

import { ethers, utils } from 'ethers';
import { useEffect } from 'react';

import { incidentContract } from '../../../../config/contracts/incidents';
import { useUser } from '../../../../hooks/useUser';

interface CreateModalProps {
  id: string;
  cid: string;
  onSuccess: () => void;
  onError: (error: Error | unknown) => void;
}

export function WriteToHedera({
  cid,
  onSuccess,
  onError,
  id,
}: CreateModalProps) {
  const { signer } = useUser();
  useEffect(() => {
    const handleContractSave = async () => {
      createIncident?.();
    };
    if (cid) handleContractSave();
  }, [cid]);

  async function createIncident() {
    // Check if Web3 has been injected by the browser
    // MetaMask is present, set it as the current provider for ethers.js

    try {
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
      onSuccess();
    } catch (error) {
      onError(error);
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <LoadingOutlined className="text-2xl text-gray-500" />
      <div>Writing to Hedera..</div>
    </div>
  );
}
