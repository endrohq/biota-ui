import { NftId, TokenInfoQuery, TokenNftInfoQuery } from '@hashgraph/sdk';

import { Forest, StorageJsonFileType } from '@shared/typings';
import { useEffect, useMemo, useState } from 'react';

import toast from 'react-hot-toast';

import { useHederaClient } from './useHederaClient';
import { useStorage } from './useStorage';

export function useForest(forestId: string | undefined) {
  const { client } = useHederaClient();
  const { getJsonFile } = useStorage();
  const [forest, setForest] = useState<Forest>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (forestId) {
      getForest().then(() => setLoading(false));
    }
  }, [forestId]);

  const extractCID = (buffer: Uint8Array | null) => {
    const decoder = new TextDecoder();
    // @ts-ignore
    const metadataString = decoder.decode(buffer);
    const hashWithSuffix = metadataString.split('ipfs://')[1];
    return hashWithSuffix.split('/')[0];
  };

  async function getForest() {
    if (!forestId) return;
    try {
      const [tokenId, serial] = forestId.split('/');
      const query = new TokenInfoQuery().setTokenId(tokenId);
      const tokenInfo = await query.execute(client);

      const nftId = new NftId(tokenInfo.tokenId, Number(serial));
      // Returns the info for the specified NFT ID
      const nftInfos = await new TokenNftInfoQuery()
        .setNftId(nftId)
        .execute(client);
      const data = await getJsonFile(
        extractCID(nftInfos?.[0].metadata),
        StorageJsonFileType.METADATA,
      );

      setForest({
        ...data,
        tokenId: nftId.toString(),
      });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please reload the page.');
    }
  }

  return useMemo(() => ({ loading, forest }), [loading, forest]);
}
