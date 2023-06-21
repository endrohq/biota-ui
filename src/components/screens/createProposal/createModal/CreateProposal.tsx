import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';

import { MinusCircleOutlined } from '@shared/components/icons/MinusCircleOutlined';
import { CreateProposalForm } from '@shared/typings';
import { randomBytes32 } from '@shared/utils/string.utils';
import { ethers, utils } from 'ethers';
import { useEffect, useState } from 'react';

import { proposalContract } from '../../../../config/contracts/proposals';
import { useStorage } from '../../../../hooks/useStorage';
import { useUser } from '../../../../hooks/useUser';

interface CreateModalProps {
  incidentId: string;
  proposal: CreateProposalForm;
  onSuccess: () => void;
  onError: (error: Error | unknown) => void;
}

type WriteStatus = 'stale' | 'writeToIpfs' | 'writeToHedera' | 'done' | 'error';

export function CreateProposal({
  incidentId,
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
      const proposalId = randomBytes32();
      const myContract = new ethers.Contract(
        proposalContract.address,
        proposalContract.abi,
        signer,
      );
      const incrementTx = await myContract.createProposal(
        utils.formatBytes32String(incidentId),
        utils.formatBytes32String(proposalId),
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
    <div className="flex h-full flex-col px-4">
      <div className="mb-3 border-b border-gray-100 pb-4 text-sm font-semibold">
        Uploading Proposal
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
