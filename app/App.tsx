/* 'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base],
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
 */
'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { Chain, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
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
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, mande],
  ssr: true, // If your dApp uses server-side rendering (SSR)
});
export default function App({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" initialChain={mande} >{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
