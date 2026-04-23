'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { 
  Swap, 
  SwapAmountInput, 
  SwapToggleButton, 
  SwapButton, 
  SwapMessage, 
  SwapToast,
  SwapSettings,
} from '@coinbase/onchainkit/swap';
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { ArrowDown, Settings2, Activity, Zap, TrendingUp, History } from 'lucide-react';
import { motion } from 'motion/react';

const ETHToken = {
  address: '',
  chainId: 8453,
  decimals: 18,
  name: 'Ethereum',
  symbol: 'ETH',
  image: 'https://dynamic-assets.coinbase.com/dbb4721c85e2754803395dcdecc1180194b15093555ae3bca393661159842f7c0062a4d336a7cb8d313769c7924372e9124237d6e87747833a6778f244498305/asset_icons/c33f9909241517452d37ef95a9757657d4726f53443a290cb90e S46995646 S46995646 S46995646.png',
};

const USDCToken = {
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  chainId: 8453,
  decimals: 6,
  name: 'USDC',
  symbol: 'USDC',
  image: 'https://dynamic-assets.coinbase.com/3c15df5e2cbc17079633215264b3ed037df66e2c34091599351c099308cc4b6f125a0733ba4c718b95886d2678602b9e6727F47f9e4e6f4e6f4e6f4e6f4e6f4e6f4e6f.png',
};

const DAIToken = {
  address: '0x50c5716b9a209391928033320f6667958742513f',
  chainId: 8453,
  decimals: 18,
  name: 'DAI',
  symbol: 'DAI',
  image: 'https://dynamic-assets.coinbase.com/3c15df5e2cbc17079633215264b3ed037df66e2c34091599351c099308cc4b6f125a0733ba4c718b95886d2678602b9e6727F47f9e4e6f4e6f4e6f4e6f4e6f4e6f4e6f4e6f.png',
};

const tokens = [ETHToken, USDCToken, DAIToken];

export default function SwapPage() {
  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready();
      } catch (e) {
        console.error('Farcaster SDK init failed', e);
      }
    };
    init();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0c] text-[#e4e4e7] overflow-x-hidden">
      <header className="h-[72px] border-b border-[#1f1f22] flex items-center justify-between px-8 bg-[#0d0d0f] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#6366f1] to-[#a855f7] shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          <span className="text-2xl font-bold tracking-tighter text-white">BASESWAP</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['Swap', 'Tokens', 'Pools', 'Explore'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className={`text-sm font-medium transition-colors hover:text-white ${item === 'Swap' ? 'text-white' : 'text-[#a1a1aa]'}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <Wallet className="!bg-[#1f1f22] !border-[#3f3f46] hover:!bg-[#27272a] transition-all !rounded-xl">
           <ConnectWallet className="px-5 py-2.5 text-sm font-semibold !bg-transparent !border-none !text-white" />
        </Wallet>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-8">
        <aside className="space-y-6 hidden lg:block">
          <div className="bg-[#151518] border border-[#27272a] rounded-2xl p-4 space-y-4 shadow-sm">
            <StatItem label="Base Network" value="Active" icon={<Activity className="w-4 h-4 text-emerald-500" />} />
            <StatItem label="Gas Price" value="0.05 Gwei" icon={<Zap className="w-4 h-4 text-amber-500" />} />
            <StatItem label="ETH Price" value="$2,451.08" trend="+1.2%" />
          </div>

          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-[#52525b] uppercase tracking-[2px] px-2 flex items-center gap-2">
              <TrendingUp className="w-3 h-3" /> Trending Pairs
            </h3>
            <div className="bg-[#151518] border border-[#27272a] rounded-2xl overflow-hidden">
               <MarketTable />
            </div>
          </div>
        </aside>

        <section className="flex flex-col items-center pt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[460px]"
          >
            <div className="bg-[#151518] border border-[#27272a] rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#6366f1] via-[#a855f7] to-[#6366f1]" />
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold tracking-tight">Swap</h2>
                 <SwapSettings className="!bg-transparent !p-0">
                   <Settings2 className="w-5 h-5 text-[#71717a] hover:text-white transition-colors cursor-pointer" />
                 </SwapSettings>
              </div>

              <Swap>
                <div className="space-y-3">
                  <div className="bg-[#1c1c20] border border-[#27272a] rounded-2xl p-4 hover:border-[#3f3f46] transition-colors">
                    <label className="text-xs font-semibold text-[#71717a] mb-2 block uppercase tracking-wider">Sell</label>
                    <SwapAmountInput
                      label="From"
                      swappableTokens={tokens}
                      token={ETHToken}
                      type="from"
                    />
                  </div>

                  <div className="relative z-10 h-0 flex items-center justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 bg-[#151518] rounded-xl">
                      <div className="bg-[#1c1c20] border border-[#27272a] rounded-lg p-2 group-hover:border-[#6366f1] transition-all transform active:scale-95 cursor-pointer">
                        <SwapToggleButton className="!bg-transparent !p-0">
                           <ArrowDown className="w-5 h-5 text-[#6366f1]" />
                        </SwapToggleButton>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1c1c20] border border-[#27272a] rounded-2xl p-4 hover:border-[#3f3f46] transition-colors">
                    <label className="text-xs font-semibold text-[#71717a] mb-2 block uppercase tracking-wider">Buy</label>
                    <SwapAmountInput
                      label="To"
                      swappableTokens={tokens}
                      token={USDCToken}
                      type="to"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <SwapButton className="!w-full !rounded-2xl !py-7 !text-lg font-bold !bg-linear-to-br !from-[#6366f1] !to-[#8b5cf6] !border-none hover:!scale-[1.02] active:!scale-95 transition-transform !shadow-[0_10px_25px_rgba(99,102,241,0.3)]" />
                  <SwapMessage />
                </div>
              </Swap>

              <div className="mt-6 pt-6 border-t border-[#1f1f22] space-y-3">
                 <PriceDetail label="Price Impact" value="<0.01%" />
                 <PriceDetail label="Max Slippage" value="0.5%" />
                 <PriceDetail label="Fee" value="0.3%" />
              </div>
            </div>
            
            <SwapToast />
          </motion.div>
        </section>

        <aside className="hidden lg:block">
           <div className="h-full border-l border-[#1f1f22] pl-6 space-y-8">
              <div className="space-y-6">
                <h3 className="text-sm font-bold flex items-center gap-2 tracking-tight">
                  <History className="w-4 h-4 text-[#6366f1]" /> Recent Activity
                </h3>
                <div className="space-y-5">
                   <ActivityItem title="Swap ETH for USDC" time="2 mins ago" />
                   <ActivityItem title="Add Liquidity ETH/USDC" time="15 mins ago" />
                   <ActivityItem title="Enable USDC" time="1 hour ago" />
                </div>
              </div>

              <div className="mt-auto bg-linear-to-br from-[#1e1b4b] to-[#0b0b0c] border border-[#312e81] rounded-2xl p-5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[#6366f1] blur-[60px] opacity-20 -mr-12 -mt-12 group-hover:opacity-40 transition-opacity" />
                 <div className="text-[10px] text-[#818cf8] font-bold uppercase tracking-[1.5px] mb-2">Rewards</div>
                 <div className="text-xl font-bold text-white mb-1">0.142 BASE</div>
                 <p className="text-[11px] text-[#a5b4fc]">Unclaimed trading fees</p>
              </div>
           </div>
        </aside>
      </main>
    </div>
  );
}

function StatItem({ label, value, trend, icon }: { label: string; value: string; trend?: string; icon?: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] text-[#71717a] uppercase tracking-wider font-bold">{label}</div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-white">{value}</span>
        {trend && <span className="text-[10px] font-bold bg-[#1d1d21] text-[#10b981] px-1.5 py-0.5 rounded uppercase">{trend}</span>}
        {icon}
      </div>
    </div>
  );
}

function MarketTable() {
  const pairs = [
    { name: 'ETH/USDC', price: '$2,450', change: '+0.8%', up: true },
    { name: 'cbBTC/ETH', price: '$43,120', change: '-1.4%', up: false },
    { name: 'DEGEN/ETH', price: '$0.0142', change: '+12.4%', up: true },
    { name: 'PEPE/ETH', price: '$0.0000', change: '-5.1%', up: false },
  ];

  return (
    <table className="w-full text-left">
      <thead>
        <tr className="text-[9px] text-[#52525b] uppercase tracking-[1px] border-b border-[#1f1f22]">
          <th className="py-2.5 px-4">Pair</th>
          <th className="py-2.5 px-2">Price</th>
          <th className="py-2.5 px-4 text-right">24h</th>
        </tr>
      </thead>
      <tbody className="text-[13px] font-medium">
        {pairs.map((p, i) => (
          <tr key={i} className="hover:bg-[#1c1c20] transition-colors cursor-pointer group">
            <td className="py-3 px-4">{p.name}</td>
            <td className="py-3 px-2 text-[#a1a1aa] group-hover:text-white transition-colors">{p.price}</td>
            <td className={`py-3 px-4 text-right ${p.up ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{p.change}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PriceDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-[13px]">
      <span className="text-[#a1a1aa]">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

function ActivityItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
      <div>
        <div className="text-[13px] font-medium text-white group-hover:text-[#6366f1] transition-colors">{title}</div>
        <div className="text-[10px] text-[#52525b]">{time}</div>
      </div>
      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
    </div>
  );
}
