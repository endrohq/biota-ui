import { AccountId, Client, PrivateKey } from '@hashgraph/sdk';

const operatorPrivateKey = PrivateKey.fromString(
  process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY || '',
);
const accountId = AccountId.fromString(
  process.env.NEXT_PUBLIC_ADMIN_HEDERA_ADDRESS || '',
);

export function useHederaClient() {
  function getClient() {
    const client = Client.forTestnet();
    client.setOperator(accountId, operatorPrivateKey);
    return client;
  }

  return { accountId, privateKey: operatorPrivateKey, client: getClient() };
}
