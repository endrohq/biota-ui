import { Hbar, TokenMintTransaction } from '@hashgraph/sdk';
import { Feature } from '@nebula.gl/edit-modes';
import { Button } from '@shared/components/button';
import InputText from '@shared/components/input/InputText';
import { BackLink } from '@shared/components/link/BackLink';
import { MapBox } from '@shared/components/map';

import { Paragraph } from '@shared/components/typography/Paragraph';
import { ROUTE_FORESTS } from '@shared/utils/route';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useHederaClient } from '../../../hooks/useHederaClient';
import { useStorage } from '../../../hooks/useStorage';

export function CreateForestPage() {
  const { uploadForest } = useStorage();
  const router = useRouter();
  const [uploading, setUploading] = useState<boolean>(false);
  const { client, privateKey } = useHederaClient();
  const [name, setName] = useState<string>('Zennebeemden, Mechelen (Belgium)');
  const [location, setLocation] = useState<Feature[]>([]);

  useEffect(() => {
    if (uploading) {
      mint().then(() => setUploading(false));
    }
  }, [uploading]);

  async function mint() {
    const cid = await uploadForest(
      name,
      'Mechelen',
      `Forest: ${name}`,
      location,
    );

    const maxTransactionFee = new Hbar(20);

    const CID = [Buffer.from(`ipfs://${cid}/metadata.json`)];
    const mintTx = new TokenMintTransaction()
      .setTokenId(process.env.NEXT_PUBLIC_FOREST_TOKEN_ID || '')
      .setMetadata(CID)
      .setMaxTransactionFee(maxTransactionFee)
      .freezeWith(client);

    const mintTxSigned = await mintTx.sign(privateKey);
    const mintTxSubmit = await mintTxSigned.execute(client);
    await mintTxSubmit.getReceipt(client);
    router.push(ROUTE_FORESTS);
  }

  return (
    <div className="flex h-full items-center">
      <div className="flex h-full w-4/12 flex-col space-y-10 rounded bg-white p-20">
        <div className="w-full space-y-4">
          <BackLink href={ROUTE_FORESTS} />
          <div>
            <div>Location</div>
            <Paragraph className="text-sm text-gray-700">
              Pinpoint the location where the incident is happening
            </Paragraph>
          </div>
          <div className="space-y-1">
            <label className="text-sm" htmlFor="title">
              Title
            </label>
            <InputText
              name="title"
              placeholder="Zennebeemden"
              value={name}
              onChange={value => setName(value)}
            />
          </div>
          <div className="!mt-10 flex justify-end space-y-1 border-t border-gray-100 pt-10">
            <Button
              fullSize
              disabled={location?.length === 0}
              onClick={() => setUploading(true)}
              className="px-6 py-2"
              variant="primary"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="flex h-full w-8/12 p-4">
        <MapBox
          theme="dark"
          positions={location}
          height="100%"
          rounded={false}
          mode="editable"
          onChange={value => setLocation(value)}
        />
      </div>
    </div>
  );
}
