import { ConnectWallet } from '@shared/components/container/ConnectWallet';
import { WrongNetwork } from '@shared/components/container/WrongNetwork';
import { Header } from '@shared/components/header';

import clsx from 'clsx';

import { useUser } from '../../../hooks/useUser';

interface ContainerProps {
  children: React.ReactNode;
  withTopPadding?: boolean;
  withWidth?: boolean;
}

export function Container({
  children,
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
        {!address ? <ConnectWallet /> : children}
      </div>
      <WrongNetwork />
    </div>
  );
}
