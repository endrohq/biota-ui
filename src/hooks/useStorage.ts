import { Web3Storage } from 'web3.storage';

const proposalFileName = 'proposal.json';

export function useStorage() {
  function getClient() {
    return new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || '',
    });
  }

  async function uploadProposal(id: string, props: Record<string, any>) {
    const data = JSON.stringify(props);
    const client = await getClient();

    // Web3.Storage requires data to be a File object, so we create a Blob with our data,
    // then turn it into a File
    const file = new File([new Blob([data])], proposalFileName, {
      type: 'application/json',
      lastModified: new Date().getTime(),
    });

    return client?.put([file]); // The IPFS hash of the data
  }

  async function getIpfsProposal(cid: string) {
    const client = await getClient();
    const res = await client?.get(cid);

    // Retrieve the specific file directly using its path
    const files = await res?.files();
    const file = files?.find(file => file.name === proposalFileName);
    if (!file) return;

    const decoder = new TextDecoder();
    let fileContent = '';

    const reader = file.stream().getReader();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      fileContent += decoder.decode(value);
    }
    return JSON.parse(fileContent);
  }

  return { upload: uploadProposal, getIpfsProposal };
}
