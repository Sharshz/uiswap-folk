import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css'; 
import '@coinbase/onchainkit/styles.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.APP_URL || process.env.NEXT_PUBLIC_URL || 'https://ais-dev-zztcn6lc7sqfr2aggkozay-615601803900.asia-southeast1.run.app';
  
  return {
    title: 'BaseSwap Mini',
    description: 'A decentralized exchange mini app built on Base using OnchainKit.',
    other: {
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: `${URL}/hero.png`,
        button: {
          title: 'Launch BaseSwap',
          action: {
            type: 'launch_miniapp',
            name: 'BaseSwap Mini',
            url: URL,
            splashImageUrl: `${URL}/splash.png`,
            splashBackgroundColor: '#0b0b0c',
          },
        },
      }),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.className} bg-[#0b0b0c] text-[#e4e4e7] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
