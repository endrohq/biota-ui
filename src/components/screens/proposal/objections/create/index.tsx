import { Modal } from '@shared/components/modal';
import { UploadState } from '@shared/components/uploadState';
import { IpfsObjection, WriteStatus } from '@shared/typings';
import { randomBytes32 } from '@shared/utils/string.utils';
import { ethers, utils } from 'ethers';
import React, { useEffect, useState } from 'react';

import { ObjectionForm } from './ObjectionForm';

import { objectionContract } from '../../../../../config/contracts/objections';
import { useStorage } from '../../../../../hooks/useStorage';
import { useUser } from '../../../../../hooks/useUser';

interface CreateObjectionProps {
  close: () => void;
  onSuccess: () => void;
  proposalId: string;
}

export function CreateObjectionForm({
  close,
  proposalId,
  onSuccess,
}: CreateObjectionProps) {
  const { signer } = useUser();
  const { uploadObjection } = useStorage();
  const [objectionForm, setObjectionForm] = useState<IpfsObjection>();

  const [writeStatus, setWriteStatus] = useState<WriteStatus>('stale');
  const [cid, setCid] = useState<string>('');

  useEffect(() => {
    if (objectionForm) {
      setWriteStatus('writeToIpfs');
    }
  }, [objectionForm]);

  useEffect(() => {
    if (writeStatus === 'writeToIpfs') {
      handleIpfsWrite();
    } else if (writeStatus === 'writeToHedera') {
      handleHederaWrite();
    }
  }, [writeStatus, objectionForm]);

  const handleIpfsWrite = async () => {
    if (!objectionForm) return;
    try {
      const cid = await uploadObjection(objectionForm);
      setCid(cid);
      setWriteStatus('writeToHedera');
    } catch (error) {
      console.error(error);
    }
  };

  async function handleHederaWrite() {
    // Check if Web3 has been injected by the browser
    // MetaMask is present, set it as the current provider for ethers.js

    try {
      const objectionId = randomBytes32();
      const myContract = new ethers.Contract(
        objectionContract.address,
        objectionContract.abi,
        signer,
      );
      const incrementTx = await myContract.createObjection(
        utils.formatBytes32String(objectionId),
        proposalId,
        cid,
      );
      await incrementTx.wait();
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal open close={close} position="right">
      {!objectionForm ? (
        <ObjectionForm create={setObjectionForm} />
      ) : writeStatus === 'writeToHedera' || writeStatus === 'writeToIpfs' ? (
        <UploadState writeStatus={writeStatus} title="Uploading Objection" />
      ) : (
        <></>
      )}
    </Modal>
  );
}
