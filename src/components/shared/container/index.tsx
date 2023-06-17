import { WrongNetwork } from '@shared/components/container/WrongNetwork';
import { Header } from '@shared/components/header';

import { useUser } from '../../../hooks/useUser';

interface ContainerProps {
  children: React.ReactNode;
  access?: 'public' | 'private';
}

export function Container({ children, access }: ContainerProps) {
  const { address } = useUser();
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="container mx-auto mt-20">
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
