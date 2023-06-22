import { NftId, TokenInfoQuery, TokenNftInfoQuery } from '@hashgraph/sdk';

import { Forest } from '@shared/typings';
import { useEffect, useMemo, useState } from 'react';

import { useHederaClient } from './useHederaClient';
import { useStorage } from './useStorage';

export function useForest(forestId: string) {
  const { client } = useHederaClient();
  const { getJsonFile } = useStorage();
  const [forest, setForest] = useState<Forest>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getForest().then(() => setLoading(false));
  }, []);

  const extractCID = (buffer: Uint8Array | null) => {
    const decoder = new TextDecoder();
    // @ts-ignore
    const metadataString = decoder.decode(buffer);
    const hashWithSuffix = metadataString.split('ipfs://')[1];
    return hashWithSuffix.split('/')[0];
  };

  async function getForest() {
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
      'metadata',
    );

    setForest({
      ...data,
      tokenId: nftId.toString(),
    });
  }

  return useMemo(() => ({ loading, forest }), [loading, forest]);
}
