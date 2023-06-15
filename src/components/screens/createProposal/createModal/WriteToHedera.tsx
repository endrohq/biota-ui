import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';

import { ethers, utils } from 'ethers';
import { useEffect } from 'react';

import { abi } from '../../../../config/contracts/abi';
import { proposalContractAddress } from '../../../../env';
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
      createProposal?.();
    };
    if (cid) handleContractSave();
  }, [cid]);

  async function createProposal() {
    // Check if Web3 has been injected by the browser
    // MetaMask is present, set it as the current provider for ethers.js

    try {
      const myContract = new ethers.Contract(
        proposalContractAddress,
        abi,
        signer,
      );
      const incrementTx = await myContract.createProposal(
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
