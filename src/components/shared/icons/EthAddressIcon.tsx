import jazzicon from '@raugfer/jazzicon';
import { Hash } from '@shared/typings';

interface EthAddressIconProps {
  address: Hash;
}

export function EthAddressIcon({ address }: EthAddressIconProps) {
  // builds an image data url for embedding
  function buildDataUrl(address: string): string {
    return `data:image/svg+xml;base64,${btoa(jazzicon(address))}`;
  }
  const imageUrl = buildDataUrl(address);
  return (
    <img className="h-6 w-6 rounded-full" src={imageUrl} alt="user address" />
  );
}
