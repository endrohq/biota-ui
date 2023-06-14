import { Web3Storage } from 'web3.storage';

export function useStorage() {
  function makeStorageClient() {
    return new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN,
    });
  }

  async function upload(props: Record<string, any>) {
    const client = makeStorageClient();
    const data = JSON.stringify(props);

    // Web3.Storage requires data to be a File object, so we create a Blob with our data,
    // then turn it into a File
    const file = new File([new Blob([data])], 'proposal.json', {
      type: 'application/json',
      lastModified: new Date().getTime(),
    });

    const cid = await client.put([file]);

    return cid; // The IPFS hash of the data
  }

  return { upload };
}
