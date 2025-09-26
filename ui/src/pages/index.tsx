import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FuturisticBackground } from '@/components/FuturisticBackground';
import { FuturisticWalletConnect } from '@/components/FuturisticWalletConnect';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { GlowingCard } from '@/components/GlowingCard';
import { NetworkSelector } from '@/components/NetworkSelector';
import { TokenStats } from '@/components/TokenStats';
import { TradingInterface } from '@/components/TradingInterface';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <FuturisticBackground />

      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur opacity-30 animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  HelvetiCoin
                </h1>
                <p className="text-sm text-red-400 font-medium -mt-1">HCHF MEME</p>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                {t('navigation.home')}
              </a>
              <a href="#trade" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Trade
              </a>
              <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                {t('navigation.roadmap')}
              </a>
              <a href="https://hchfmeme.fun/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Website
              </a>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <NetworkSelector />
              <LanguageSwitcher />
              <FuturisticWalletConnect />
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
                <span className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent">
                  Swiss Meme
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Revolution
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Experience the future of Swiss precision meets meme culture. 
              HelvetiCoin (HCHF) brings Alpine stability to the decentralized meme economy 
              across Ethereum, BNB Chain, and Sui Network.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <FuturisticWalletConnect />
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://hchfmeme.fun/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-bold rounded-xl hover:border-white hover:text-white transition-all duration-200 backdrop-blur-sm"
              >
                Visit Website
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex justify-center gap-6 mb-16"
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://x.com/helveticowmeme"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl p-4 text-white hover:border-blue-400 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://t.me/helveticow"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl p-4 text-white hover:border-blue-400 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://github.com/VKATHUSHAN/helveticoin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl p-4 text-white hover:border-gray-400 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            </motion.div>

            {/* Token Stats */}
            <TokenStats />
          </div>
        </section>

        {/* Trading Section */}
        <section id="trade" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Trade HCHF
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Swap tokens instantly across multiple networks with zero slippage and minimal fees
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <TradingInterface />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <GlowingCard>
                  <h3 className="text-2xl font-bold text-white mb-4">Multi-Chain Support</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">E</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Ethereum</div>
                        <div className="text-gray-400 text-sm">Native HCHF support</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">B</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">BNB Chain</div>
                        <div className="text-gray-400 text-sm">Low fees, fast transactions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Sui Network</div>
                        <div className="text-gray-400 text-sm">Next-gen performance</div>
                      </div>
                    </div>
                  </div>
                </GlowingCard>

                <GlowingCard glowColor="#10B981">
                  <h3 className="text-2xl font-bold text-white mb-4">Why Trade HCHF?</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Swiss-backed stability</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Meme community power</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Cross-chain liquidity</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Instant settlements</span>
                    </li>
                  </ul>
                </GlowingCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                {t('features.title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <GlowingCard>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏔️</div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {t('features.stability.title')}
                    </h3>
                    <p className="text-gray-400">
                      {t('features.stability.description')}
                    </p>
                  </div>
                </GlowingCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <GlowingCard glowColor="#10B981">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {t('features.security.title')}
                    </h3>
                    <p className="text-gray-400">
                      {t('features.security.description')}
                    </p>
                  </div>
                </GlowingCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <GlowingCard glowColor="#F59E0B">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📋</div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {t('features.compliance.title')}
                    </h3>
                    <p className="text-gray-400">
                      {t('features.compliance.description')}
                    </p>
                  </div>
                </GlowingCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GlowingCard glowColor="#8B5CF6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🌐</div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {t('features.multichain.title')}
                    </h3>
                    <p className="text-gray-400">
                      {t('features.multichain.description')}
                    </p>
                  </div>
                </GlowingCard>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-md border-t border-gray-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                    <span className="text-white font-bold text-xl">H</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur opacity-30 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">HelvetiCoin</h3>
                  <p className="text-red-400 font-medium">HCHF MEME</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Swiss Precision meets Meme Revolution. From Zurich to the Moon! 🚀
              </p>
              <div className="text-gray-400 text-sm">
                <p>📍 Zurich, Switzerland</p>
                <p>📧 hello@hchfmeme.fun</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="https://hchfmeme.fun/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Website</a></li>
                <li><a href="https://github.com/VKATHUSHAN/helveticoin" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#docs" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Community</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="https://x.com/helveticowmeme" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter/X</a></li>
                <li><a href="https://t.me/helveticow" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram</a></li>
                <li><a href="#discord" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 HelvetiCoin. Swiss-made with ❤️ for the meme community.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'roadmap'])),
    },
  };
};