import { WrongNetwork } from '@shared/components/container/WrongNetwork';
import { Header } from '@shared/components/header';

import { useUser } from '../../../hooks/useUser';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const { address } = useUser();
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="container mx-auto mt-20">
        {!address ? (
          <div className="mx-auto w-1/2">Connect your wallet first</div>
        ) : (
          children
        )}
      </div>
      <WrongNetwork />
    </div>
  );
}
