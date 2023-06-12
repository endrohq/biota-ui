'use client';

import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useMemo } from 'react';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { ROUTE_LANDING_PAGE } from '../utils/route';

export interface AuthContextProps {
  logout(): void;
  login(): void;
  address: string;
  isConnected: boolean;
}

export const AuthenticatedContext = createContext(undefined);

export const useUser = (): AuthContextProps => {
  const context = useContext(AuthenticatedContext);
  if (!context) {
    throw new Error(
      `useAuthentication must be used within a AuthenticatedProvider`,
    );
  }
  return context;
};

type AuthenticatedProviderProps = {
  children: ReactNode;
};

export default function AuthenticatedProvider({
  children,
}: AuthenticatedProviderProps) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const router = useRouter();

  async function handleLogout() {
    disconnect();
    router.push(ROUTE_LANDING_PAGE);
  }

  const value = useMemo(() => {
    return {
      logout: handleLogout,
      address,
      isConnected,
      login: () => connect(),
    };
  }, [address, isConnected]);

  return (
    <AuthenticatedContext.Provider value={value}>
      {children}
    </AuthenticatedContext.Provider>
  );
}
