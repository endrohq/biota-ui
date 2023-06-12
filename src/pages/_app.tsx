import { Space_Grotesk } from 'next/font/google';

import '../styles/style.css';
import React from 'react';

import AuthenticatedProvider from '../hooks/useUser';
import {createConfig, WagmiConfig, } from "wagmi";
import {createPublicClient, http} from "viem";
import {hederaTestnet} from "../config/chains";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: hederaTestnet,
    transport: http()
  }),
})


// If loading a variable font, you don't need to specify the font weight
// eslint-disable-next-line babel/new-cap
const inter = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ Component, pageProps }: any) {
  return (
    <div className={inter.className}>
      <WagmiConfig config={config}>
      <AuthenticatedProvider>
        <Component {...pageProps} />
      </AuthenticatedProvider>
      </WagmiConfig>
    </div>
  );
}
