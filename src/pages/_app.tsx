import { Space_Grotesk } from 'next/font/google';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/style.css';
import React from 'react';

import { createPublicClient, http } from 'viem';
import { createConfig, WagmiConfig } from 'wagmi';

import { hederaTestnet } from '../config/chains';
import AuthenticatedProvider from '../hooks/useUser';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: hederaTestnet,
    transport: http(),
  }),
});

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
