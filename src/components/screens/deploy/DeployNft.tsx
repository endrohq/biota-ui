import {
  TokenCreateTransaction,
  TokenSupplyType,
  TokenType,
} from '@hashgraph/sdk';
import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { MinusCircleOutlined } from '@shared/components/icons/MinusCircleOutlined';
import { DeployedToken, DeployState } from '@shared/typings';
import { useEffect, useState } from 'react';

import { useHederaClient } from '../../../hooks/useHederaClient';

interface DeployNFTProps {
  name: string;
  symbol: string;
  variable: string;
  deployingIndex: number;
  idx: number;
  register: (deployedToken: DeployedToken) => void;
}

export function DeployNFT({
  name,
  symbol,
  register,
  variable,
  deployingIndex,
  idx,
}: DeployNFTProps) {
  const { client, accountId, privateKey } = useHederaClient();
  const [status, setStatus] = useState<DeployState>('stale');
  const [tokenId, setTokenId] = useState<string>();

  useEffect(() => {
    if (deployingIndex === idx && status !== 'deploying') {
      setStatus('deploying');
    } else if (status === 'deploying') {
      deploy();
    }
  }, [deployingIndex, status]);

  useEffect(() => {
    if (tokenId) {
      register({ variable, tokenId });
      setStatus('deployed');
    }
  }, [tokenId]);

  async function deploy() {
    const nftCreateTx = new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(accountId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(250)
      .setSupplyKey(privateKey.publicKey)
      .freezeWith(client);

    const nftCreateTxSigned = await nftCreateTx.sign(privateKey);

    const nftCreateSubmit = await nftCreateTxSigned.execute(client);

    // Get the transaction receipt
    const receipt = await nftCreateSubmit.getReceipt(client);
    setTokenId(receipt.tokenId?.toString());
  }

  return (
    <div className="mb-1.5 flex items-center space-x-10 rounded">
      <div className="w-2/12">
        <div className="text-sm">1. HIP-412 Token</div>
      </div>
      <div className="flex items-center space-x-10">
        <div className="text-sm font-medium">
          {status === 'stale' ? (
            <MinusCircleOutlined className="text-gray-600" />
          ) : status === 'deploying' ? (
            <LoadingOutlined />
          ) : status === 'deployed' ? (
            <CheckCircleOutlined className="text-green-800" />
          ) : (
            <MinusCircleOutlined className="text-gray-600" />
          )}
        </div>
      </div>
    </div>
  );
}
