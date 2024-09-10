'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
const queryClient = new QueryClient();

const mande = {
  id: 18071918,
  name: "Mande",
  nativeCurrency: { name: "Mande", symbol: "MAND", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mande-mainnet.public.blastapi.io"] },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: 'moonx',
  projectId: 'b52456c0ffdabb5678905aae9f2aa217',
  chains: [mainnet, mande],
  ssr: true, // If your dApp uses server-side rendering (SSR)
});

export default function App({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
