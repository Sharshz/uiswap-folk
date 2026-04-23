'use client';

import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base, mainnet } from 'viem/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export function getConfig() {
  return createConfig({
    chains: [base, mainnet],
    connectors: [
      coinbaseWallet({
        appName: 'BaseSwap Mini',
        preference: 'smartWalletOnly',
        version: '4',
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(),
      [mainnet.id]: http(),
    },
  });
}
