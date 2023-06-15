import { Web3Storage } from 'web3.storage';

export function useStorage() {
  function makeStorageClient() {
    return new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || '',
    });
  }

  async function uploadProposal(id: string, props: Record<string, any>) {
    const client = makeStorageClient();
    const data = JSON.stringify(props);

    // Web3.Storage requires data to be a File object, so we create a Blob with our data,
    // then turn it into a File
    const file = new File([new Blob([data])], `${id}.json`, {
      type: 'application/json',
      lastModified: new Date().getTime(),
    });

    return client.put([file]); // The IPFS hash of the data
  }

  async function readProposal(cid: string) {
    const client = makeStorageClient();
    const res = await client.get(cid);
    const files = await res?.files();
    res?.body;
    for (const file of files || []) {
      console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
    }
  }

  return { upload: uploadProposal, readProposal };
}
