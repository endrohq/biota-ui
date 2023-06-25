import { Objection, StorageJsonFileType } from '@shared/typings';
import {
  convertToIpfsObjection,
  convertToOnChainObjection,
} from '@shared/utils/objection.utils';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import toast from 'react-hot-toast';

import { useStorage } from './useStorage';

import { useUser } from './useUser';

import { objectionContract } from '../config/contracts/objections';

type useIncidentsProps = {
  objections: Objection[];
  loading: boolean;
};

export function useObjections(proposalId: string): useIncidentsProps {
  const { getJsonFile } = useStorage();
  const [objections, setObjections] = useState<Objection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { signer } = useUser();

  useEffect(() => {
    if (proposalId) {
      getObjections(proposalId);
    }
  }, [proposalId]);

  async function getObjections(proposalId: string) {
    try {
      // Create a new contract instance with the Contract constructor
      const contract = new ethers.Contract(
        objectionContract.address,
        objectionContract.abi,
        signer,
      );
      const onChainObjections = await contract.getObjectionsByPage(
        proposalId,
        0,
      );
      const arr: Objection[] = [];
      for (const onChainObjection of onChainObjections) {
        const props = convertToOnChainObjection(onChainObjection);
        const res = await getJsonFile(
          onChainObjection.cid,
          StorageJsonFileType.OBJECTION,
        );
        const objection = convertToIpfsObjection(res);
        arr.push({
          ...props,
          ...objection,
        } as Objection);
      }

      setObjections(arr);
    } catch (error) {
      // toast.error('Something went wrong. Please reload the page.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return useMemo(() => ({ loading, objections }), [loading, objections]);
}
