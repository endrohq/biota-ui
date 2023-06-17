import { WrongNetwork } from '@shared/components/container/WrongNetwork';
import { Header } from '@shared/components/header';

import clsx from 'clsx';

import { useUser } from '../../../hooks/useUser';

interface ContainerProps {
  children: React.ReactNode;
  access?: 'public' | 'private';
  withTopPadding?: boolean;
}

export function Container({
  children,
  access,
  withTopPadding = true,
}: ContainerProps) {
  const { address } = useUser();
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className={clsx('container mx-auto', withTopPadding && 'pt-20')}>
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
