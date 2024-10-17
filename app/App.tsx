"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  Chain,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { ToastContainer, toast } from "react-toastify";

// react toastify
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const mande = {
  id: 18071918,
  name: "Mande",
  nativeCurrency: { name: "Mande", symbol: "MAND", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mande-mainnet.public.blastapi.io"] },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: "moonx",
  projectId: "b52456c0ffdabb5678905aae9f2aa217",
  chains: [mande],
  ssr: true, // If your dApp uses server-side rendering (SSR)
});
export default function App({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize='compact' initialChain={mande}>
          {children}
          <ToastContainer />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
