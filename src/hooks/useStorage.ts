import { Feature } from '@nebula.gl/edit-modes';
import { CreateProposalForm, StorageJsonFileType } from '@shared/typings';
import { Web3Storage } from 'web3.storage';

export function useStorage() {
  function getClient() {
    return new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || '',
    });
  }

  async function uploadForest(
    name: string,
    creator: string,
    description: string,
    location: Feature[],
  ) {
    const props = {
      name,
      creator,
      description,
      image:
        'https://bafybeibv3qve4co27gkgapqwftkmzcxgscbp4il7rwiyj2al4vl36hzfcu.ipfs.w3s.link/nft-placeholder.png',
      checksum:
        'ff32974d2a8cfeb8deb2437556b53296021bfe02d466f449d52b583a6e8fbcef',
      type: 'image/png',
      format: 'HIP412@2.0.0',
      properties: {
        location,
      },
    };
    const client = await getClient();
    const files: File[] = [
      createJsonFile(
        JSON.stringify(props),
        `${StorageJsonFileType.METADATA}.json`,
      ),
    ];

    return client.put(files); // The IPFS hash of the data
  }

  async function uploadProposal(props: CreateProposalForm) {
    const client = await getClient();
    const { images, forest, ...proposal } = props;
    const files: File[] = [
      // all contents
      createJsonFile(
        JSON.stringify(proposal),
        `${StorageJsonFileType.PROPOSAL}.json`,
      ),
      // metadata
      createJsonFile(
        JSON.stringify({ title: proposal.title }),
        `${StorageJsonFileType.METADATA}.json`,
      ),
    ];

    if (images) {
      files.push(
        ...images.map(file => new File([file], `images/${file.name}`)),
      );
    }

    return client.put(files); // The IPFS hash of the data
  }

  async function uploadObjection(props: { content: string; category: string }) {
    const client = await getClient();
    return client.put([
      createJsonFile(
        JSON.stringify(props),
        `${StorageJsonFileType.OBJECTION}.json`,
      ),
    ]);
  }

  function createJsonFile(data: string, fileName: string) {
    return new File([new Blob([data])], fileName, {
      type: 'application/json',
      lastModified: new Date().getTime(),
    });
  }

  async function getJsonFile(cid: string, type: StorageJsonFileType) {
    const client = await getClient();
    const res = await client?.get(cid);

    // Retrieve the specific file directly using its path
    const files = await res?.files();
    const fileName = `${type}.json`;
    const file = files?.find(file => file.name === fileName);
    if (!file) return;

    const decoder = new TextDecoder();
    let fileContent = '';
    await readStream(file, value => (fileContent += decoder.decode(value)));

    return { ...JSON.parse(fileContent), cid };
  }

  async function readStream(file: File, callback: (value: Uint8Array) => void) {
    const reader = file.stream().getReader();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      callback(value);
    }
  }

  const getIpfsUrlPath = (cid: string, name: string) =>
    `https://dweb.link/ipfs/${cid}/${name}`;

  async function getImageUrls(cid: string) {
    const client = await getClient();
    const res = await client.get(cid);
    const files = await res?.files();

    // We assume files are images if they're in the 'images/' directory and end with '.png'
    const imageFiles = files?.filter(file => file.name.startsWith('images/'));

    // Construct URLs for each image file
    return imageFiles?.map(file => getIpfsUrlPath(cid, file.name)) || [];
  }

  return {
    getJsonFile,
    uploadForest,
    getImageUrls,
    uploadProposal,
    uploadObjection,
  };
}
