import { CreateIncidentForm, CreateProposalForm } from '@shared/typings';
import { Web3Storage } from 'web3.storage';

const incidentFileName = 'incident.json';
const metadataFileName = 'metadata.json';

type FileType = 'incident' | 'metadata';

export function useStorage() {
  function getClient() {
    return new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || '',
    });
  }

  async function uploadIncident(props: CreateIncidentForm) {
    const client = await getClient();
    const { location } = props;
    const files: File[] = [
      // all contents
      createJsonFile(JSON.stringify({ location }), incidentFileName),
      // metadata
      createJsonFile(
        JSON.stringify({ locationName: props.locationName }),
        metadataFileName,
      ),
    ];

    return client.put(files); // The IPFS hash of the data
  }

  async function uploadProposal(props: CreateProposalForm) {
    const client = await getClient();
    const { images, ...incident } = props;
    const files: File[] = [
      // all contents
      createJsonFile(JSON.stringify(incident), incidentFileName),
      // metadata
      createJsonFile(
        JSON.stringify({ title: incident.title }),
        metadataFileName,
      ),
    ];

    if (images) {
      files.push(
        ...images.map(file => new File([file], `images/${file.name}`)),
      );
    }

    return client.put(files); // The IPFS hash of the data
  }

  function createJsonFile(data: string, fileName: string) {
    return new File([new Blob([data])], fileName, {
      type: 'application/json',
      lastModified: new Date().getTime(),
    });
  }

  async function getJsonFile(cid: string, type: FileType) {
    const client = await getClient();
    const res = await client?.get(cid);

    // Retrieve the specific file directly using its path
    const files = await res?.files();
    const fileName = type === 'incident' ? incidentFileName : metadataFileName;
    const file = files?.find(file => file.name === fileName);
    if (!file) return;

    const decoder = new TextDecoder();
    let fileContent = '';
    await readStream(file, value => (fileContent += decoder.decode(value)));

    return JSON.parse(fileContent);
  }

  async function readStream(file: File, callback: (value: Uint8Array) => void) {
    const reader = file.stream().getReader();
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

  return { getJsonFile, uploadIncident, getImageUrls, uploadProposal };
}
