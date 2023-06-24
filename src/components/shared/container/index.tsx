import { WrongNetwork } from '@shared/components/container/WrongNetwork';
import { Header } from '@shared/components/header';

import clsx from 'clsx';

import { useUser } from '../../../hooks/useUser';

interface ContainerProps {
  children: React.ReactNode;
  access?: 'public' | 'private';
  withTopPadding?: boolean;
  withWidth?: boolean;
}

export function Container({
  children,
  access,
  withTopPadding = true,
  withWidth = true,
}: ContainerProps) {
  const { address } = useUser();
  return (
    <div className="h-screen">
      <Header />
      <div
        style={{ height: 'calc(100% - 4rem)' }}
        className={clsx(
          withTopPadding && 'pt-14',
          withWidth && 'container mx-auto',
        )}
      >
        {!address && access === 'private' ? (
          <div className="mx-auto w-1/2">Connect your wallet first</div>
        ) : (
          children
        )}
      </div>
      <WrongNetwork />
    </div>
  );
}
