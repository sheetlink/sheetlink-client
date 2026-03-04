import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPagesByCategory, categoryInfo } from '@/lib/programmatic-pages';

export default function PricingGuides() {
  const category = 'pricing';
  const info = categoryInfo[category];
  const pages = getPagesByCategory(category);

  const seoTitle = `${info.title} 2026 | SheetLink`;
  const seoDescription = info.description;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="personal finance pricing, budget app costs, tiller pricing, ynab cost, quicken price" />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="mb-4 text-5xl font-bold text-sheetlink-text">
            {info.h1}
          </h1>
          <p className="mb-12 text-xl text-gray-600">
            {info.description}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {pages.map((page) => (
              <a
                key={page.slug}
                href={page.slug}
                className="block rounded-lg border-2 border-gray-200 p-6 transition-all hover:border-sheetlink-green-700 hover:shadow-md"
              >
                <h2 className="mb-2 text-xl font-bold text-sheetlink-text">
                  {page.title}
                </h2>
                <p className="text-gray-600">{page.description}</p>
              </a>
            ))}
          </div>

          <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">
              Looking for a More Affordable Alternative?
            </h2>
            <p className="mb-4 text-gray-600">
              SheetLink offers powerful bank sync to Google Sheets for less than $4/month.
              Free forever for the last 7 days of transactions.
            </p>
            <a
              href="/pricing"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
            >
              View SheetLink Pricing
            </a>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
