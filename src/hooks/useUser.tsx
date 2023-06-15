'use client';

import { JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider';
import { Hash } from '@shared/typings';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import { ConnectorData, useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { ROUTE_LANDING_PAGE } from '../utils/route';

export interface AuthContextProps {
  logout(): Promise<void>;
  login(): void;
  address: Hash | undefined;
  signer: JsonRpcSigner | undefined;
  isConnected: boolean;
}

export const AuthenticatedContext = createContext<AuthContextProps>({
  logout: async () => {},
  login: () => {},
  address: undefined,
  isConnected: false,
  signer: undefined,
});

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
  const { address, isConnected, connector } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const router = useRouter();

  useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      if (account) {
        // console.log('new account', account);
      } else if (chain) {
        // console.log('new chain', chain);
      }
    };

    connector?.on('change', handleConnectorUpdate);
    return () => {
      connector?.off('change', handleConnectorUpdate);
    };
  }, [connector]);

  async function handleLogout() {
    disconnect();
    router.push(ROUTE_LANDING_PAGE);
  }

  const value = useMemo(() => {
    let signer: JsonRpcSigner | undefined;
    if (typeof window !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(
        // @ts-ignore
        window?.ethereum,
        'any',
      );
      signer = provider.getSigner();
    }

    return {
      logout: handleLogout,
      address,
      isConnected,
      signer,
      login: () => connect(),
    };
  }, [address, isConnected]);

  return (
    <AuthenticatedContext.Provider value={value}>
      {children}
    </AuthenticatedContext.Provider>
  );
}
