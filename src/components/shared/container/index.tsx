import { Header } from '@shared/components/header';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="container mx-auto mt-20">{children}</div>
    </div>
  );
}
