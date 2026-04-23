'use client';

import { ReactNode, useState } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { base } from 'viem/chains';
import { getConfig } from '@/lib/wagmi';

export function Providers({ children }: { children: ReactNode }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
