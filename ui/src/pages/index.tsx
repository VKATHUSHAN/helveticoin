import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { WalletConnect } from '@/components/WalletConnect';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">HelvetiCoin</h1>
                <p className="text-xs text-gray-500 -mt-1">HCHF</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-red-600 transition-colors duration-200">
                {t('navigation.home')}
              </a>
              <a href="#roadmap" className="text-gray-700 hover:text-red-600 transition-colors duration-200">
                {t('navigation.roadmap')}
              </a>
              <a href="#docs" className="text-gray-700 hover:text-red-600 transition-colors duration-200">
                {t('navigation.docs')}
              </a>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <WalletConnect />
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          {/* Swiss Cross Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 text-red-600">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="40" y="20" width="20" height="60" fill="currentColor" />
                <rect x="20" y="40" width="60" height="20" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute top-32 right-20 w-16 h-16 text-red-600">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="40" y="20" width="20" height="60" fill="currentColor" />
                <rect x="20" y="40" width="60" height="20" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 text-red-600">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="40" y="20" width="20" height="60" fill="currentColor" />
                <rect x="20" y="40" width="60" height="20" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                  <span className="text-swiss-red">Swiss-Minted</span>{' '}
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Stability
                  </span>
                  <br />
                  <span className="text-gray-700">on Ethereum & Tron</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <WalletConnect />
                <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-red-600 hover:text-red-600 transition-all duration-200">
                  {t('hero.learnMore')}
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">1B</div>
                  <div className="text-sm text-gray-500 mt-1">Max Supply</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">18</div>
                  <div className="text-sm text-gray-500 mt-1">Decimals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-500 mt-1">Networks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-swiss-red">CHF</div>
                  <div className="text-sm text-gray-500 mt-1">Pegged To</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('features.title')}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('features.stability.title')}
                </h3>
                <p className="text-gray-600">
                  {t('features.stability.description')}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('features.security.title')}
                </h3>
                <p className="text-gray-600">
                  {t('features.security.description')}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('features.compliance.title')}
                </h3>
                <p className="text-gray-600">
                  {t('features.compliance.description')}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('features.multichain.title')}
                </h3>
                <p className="text-gray-600">
                  {t('features.multichain.description')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Roadmap Preview */}
        <section id="roadmap" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('roadmap.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('roadmap.subtitle')}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Q4 2025 - Q2 2027</h3>
                <p className="text-gray-600 mb-6">Complete roadmap with detailed milestones</p>
                <a href="#roadmap-full" className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200">
                  <span>View Full Roadmap</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">HelvetiCoin</h3>
                  <p className="text-gray-400 text-sm">HCHF</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                {t('footer.tagline')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#docs" className="hover:text-white transition-colors">{t('footer.links.docs')}</a></li>
                <li><a href="#github" className="hover:text-white transition-colors">{t('footer.links.github')}</a></li>
                <li><a href="#twitter" className="hover:text-white transition-colors">{t('footer.links.twitter')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#privacy" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">{t('footer.legal.terms')}</a></li>
                <li><a href="#disclaimer" className="hover:text-white transition-colors">{t('footer.legal.disclaimer')}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
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