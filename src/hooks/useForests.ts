import { NftId, TokenInfoQuery, TokenNftInfoQuery } from '@hashgraph/sdk';

import { Forest } from '@shared/typings';
import { useEffect, useMemo, useState } from 'react';

import { useHederaClient } from './useHederaClient';
import { useStorage } from './useStorage';

export function useForests(tokenId: string) {
  const { client } = useHederaClient();
  const { getJsonFile } = useStorage();
  const [forests, setForests] = useState<Forest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getForests().then(() => setLoading(false));
  }, []);

  const extractCID = (buffer: Uint8Array | null) => {
    const decoder = new TextDecoder();
    // @ts-ignore
    const metadataString = decoder.decode(buffer);
    const hashWithSuffix = metadataString.split('ipfs://')[1];
    return hashWithSuffix.split('/')[0];
  };

  async function getForests() {
    const query = new TokenInfoQuery().setTokenId(tokenId);

    // Submit the query to the network and obtain the token supply
    const tokenInfo = await query.execute(client);
    const totalSupply = await tokenInfo.totalSupply;

    const arr = [];
    for (let i = 0; i < Number(totalSupply); i++) {
      const nftId = new NftId(tokenInfo.tokenId, i + 1);
      // Returns the info for the specified NFT ID
      const nftInfos = await new TokenNftInfoQuery()
        .setNftId(nftId)
        .execute(client);
      const data = await getJsonFile(
        extractCID(nftInfos?.[0].metadata),
        'metadata',
      );
      arr.push({
        ...data,
        tokenId: nftId.toString(),
      });
    }

    setForests(arr);
  }

  return useMemo(() => ({ loading, forests }), [loading, forests]);
}
