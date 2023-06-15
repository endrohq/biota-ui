import jazzicon from '@raugfer/jazzicon';
import { Hash } from '@shared/typings';
import clsx from 'clsx';

interface EthAddressIconProps {
  address: Hash;
  size?: 'large' | 'medium';
}

export function EthAddressIcon({
  address,
  size = 'medium',
}: EthAddressIconProps) {
  // builds an image data url for embedding
  function buildDataUrl(address: string): string {
    return `data:image/svg+xml;base64,${btoa(jazzicon(address))}`;
  }
  const imageUrl = buildDataUrl(address);
  return (
    <img
      className={clsx('rounded-full', {
        'h-10 w-10': size === 'large',
        'h-6 w-6': size === 'medium',
      })}
      src={imageUrl}
      alt="user address"
    />
  );
}
