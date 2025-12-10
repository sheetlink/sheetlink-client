import Head from 'next/head';
import Header from '@/components/Header';
import HeroFreeTier from '@/components/HeroFreeTier';
import FreeTierFeatures from '@/components/FreeTierFeatures';
import HowItWorks from '@/components/HowItWorks';
import UpgradesTeaser from '@/components/UpgradesTeaser';
import SecurityPrivacy from '@/components/SecurityPrivacy';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function Home() {
  const seoTitle = `${BRAND.name} - ${BRAND.tagline}`;
  const seoDescription = BRAND.description;
  const seoUrl = 'https://sheetlink.app';
  const seoImage = `${seoUrl}/og-image.svg`;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="google sheets, plaid, bank sync, personal finance, budgeting, spreadsheet, chrome extension, free tier" />
        <meta name="author" content={BRAND.name} />

        {/* OpenGraph */}
        <meta property="og:url" content={seoUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:site_name" content={BRAND.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sheetlink" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />

        <link rel="canonical" href={seoUrl} />
      </Head>

      <Header />
      <main className="pt-16">
        <HeroFreeTier />
        <FreeTierFeatures />
        <HowItWorks />
        <UpgradesTeaser />
        <SecurityPrivacy />
        <Footer />
      </main>
    </>
  );
}
