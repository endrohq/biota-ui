import { UploadState } from '@shared/components/uploadState';
import { CreateProposalForm, WriteStatus } from '@shared/typings';
import { randomBytes32 } from '@shared/utils/string.utils';
import { ethers, utils } from 'ethers';
import { useEffect, useState } from 'react';

import { proposalContract } from '../../../../config/contracts/proposals';
import { useStorage } from '../../../../hooks/useStorage';
import { useUser } from '../../../../hooks/useUser';

interface CreateModalProps {
  proposal: CreateProposalForm;
  onSuccess: (id: string) => void;
  onError: (error: Error | unknown) => void;
}

export function CreateProposal({
  proposal,
  onSuccess,
  onError,
}: CreateModalProps) {
  const { signer } = useUser();
  const { uploadProposal } = useStorage();
  const [writeStatus, setWriteStatus] = useState<WriteStatus>('stale');
  const [cid, setCid] = useState<string>('');

  useEffect(() => {
    if (writeStatus === 'stale') {
      uploadContent();
    } else if (writeStatus === 'writeToHedera') {
      createProposal();
    }
  }, [writeStatus]);

  const uploadContent = async () => {
    try {
      const cid = await uploadProposal(proposal);
      setCid(cid);
      setWriteStatus('writeToHedera');
    } catch (error) {
      onError(error);
    }
  };

  async function createProposal() {
    // Check if Web3 has been injected by the browser
    // MetaMask is present, set it as the current provider for ethers.js

    try {
      const startTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
      const endTimestamp = startTimestamp + 604800;
      const proposalId = randomBytes32();
      const myContract = new ethers.Contract(
        proposalContract.address,
        proposalContract.abi,
        signer,
      );
      const incrementTx = await myContract.createProposal(
        proposal.forest?.tokenId,
        utils.formatBytes32String(proposalId),
        cid,
        startTimestamp,
        endTimestamp,
      );
      await incrementTx.wait();
      onSuccess(proposalId);
    } catch (error) {
      onError(error);
      console.log(error);
    }
  }

  return <UploadState title="Create Proposal" writeStatus={writeStatus} />;
}
