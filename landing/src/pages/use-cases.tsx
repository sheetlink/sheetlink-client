import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';

export default function UseCases() {
  const seoTitle = 'Use Cases - SheetLink for Every Financial Need';
  const seoDescription = 'Discover how SheetLink helps freelancers, small businesses, side hustlers, and individuals automate their bookkeeping and budgeting in Google Sheets.';

  const useCases = [
    {
      title: 'Tax Prep Spreadsheet',
      slug: '/tax-prep-spreadsheet',
      description: 'Organize bank transactions for tax season. Track income, categorize deductible expenses, and generate reports for your accountant.',
      icon: '📊',
      audience: 'Freelancers, Contractors, Small Businesses'
    },
    {
      title: 'Freelance Income Tracker',
      slug: '/freelance-income-tracker',
      description: 'Track income from multiple clients and deductible business expenses. Perfect for 1099 contractors and independent consultants.',
      icon: '💼',
      audience: 'Freelancers, 1099 Contractors'
    },
    {
      title: 'Etsy Seller Finances',
      slug: '/etsy-seller-finances',
      description: 'Track Etsy sales, fees, material costs, and profit margins. Manage your creative business finances in one spreadsheet.',
      icon: '🎨',
      audience: 'Etsy Sellers, Crafters'
    },
    {
      title: 'Amazon FBA Bookkeeping',
      slug: '/amazon-fba-bookkeeping',
      description: 'Complex COGS tracking, Amazon fees breakdown, PPC spend, and inventory management for FBA sellers.',
      icon: '📦',
      audience: 'Amazon Sellers, FBA Businesses'
    },
    {
      title: 'Gig Worker Bookkeeping',
      slug: '/gig-worker-bookkeeping',
      description: 'Track income from Uber, DoorDash, Instacart, and other gig platforms. Monitor mileage deductions and vehicle expenses.',
      icon: '🚗',
      audience: 'Uber, DoorDash, Gig Workers'
    },
    {
      title: 'Dropshipping Finance Tracker',
      slug: '/dropshipping-finance-tracker',
      description: 'Track revenue from Shopify/Amazon, COGS from suppliers, ad spend, and profit margins for your dropshipping business.',
      icon: '🛍️',
      audience: 'Dropshippers, Ecommerce Sellers'
    },
    {
      title: 'Airbnb Income Tracker',
      slug: '/airbnb-income-tracker',
      description: 'Seasonal income tracking, occupancy rates, cleaning fees, maintenance costs for short-term rental hosts.',
      icon: '🏠',
      audience: 'Airbnb Hosts, STR Owners'
    },
    {
      title: 'Rental Property Cash Flow',
      slug: '/rental-property-cash-flow',
      description: 'Track rental income, maintenance costs, and cash flow across multiple properties. Perfect for landlords.',
      icon: '🏘️',
      audience: 'Landlords, Property Managers'
    },
    {
      title: 'Real Estate Investment Tracker',
      slug: '/real-estate-investment-tracker',
      description: 'Track property performance, ROI calculations (cash-on-cash, cap rate, IRR), fix-and-flip, and BRRRR strategy.',
      icon: '🏗️',
      audience: 'Real Estate Investors'
    },
    {
      title: 'Reseller Profit Tracker',
      slug: '/reseller-profit-tracker',
      description: 'Item-level profit tracking, platform fees, shipping costs, and sourcing channel ROI for eBay, Poshmark, Mercari sellers.',
      icon: '🏷️',
      audience: 'Resellers, Flippers'
    },
    {
      title: 'Consulting Income Tracker',
      slug: '/consulting-income-tracker',
      description: 'Project-based revenue, client profitability, retainer vs hourly tracking for consultants and coaches.',
      icon: '📈',
      audience: 'Consultants, Coaches'
    }
  ];

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-bold text-sheetlink-text">
              SheetLink Use Cases
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Automate your bookkeeping and budgeting in Google Sheets. Whether you're a freelancer, side hustler, small business owner, or investor, SheetLink syncs your bank transactions automatically.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <Link
                key={useCase.slug}
                href={useCase.slug}
                className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all duration-200 hover:border-sheetlink-green-700 hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">{useCase.icon}</div>
                <h2 className="mb-3 text-xl font-bold text-sheetlink-text group-hover:text-sheetlink-green-700">
                  {useCase.title}
                </h2>
                <p className="mb-4 text-gray-600">
                  {useCase.description}
                </p>
                <p className="text-sm font-semibold text-sheetlink-green-700">
                  Perfect for: {useCase.audience}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">
              How SheetLink Works
            </h2>
            <div className="mx-auto max-w-4xl space-y-4 text-left text-gray-600">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="mb-2 font-bold text-sheetlink-text">1. Connect Your Bank</h3>
                <p>Link your bank account(s) via Plaid. 10,000+ banks supported with bank-grade security.</p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="mb-2 font-bold text-sheetlink-text">2. Choose Your Google Sheet</h3>
                <p>Create a new sheet or use an existing one. SheetLink writes transactions directly to your spreadsheet.</p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="mb-2 font-bold text-sheetlink-text">3. Sync Automatically</h3>
                <p>Transactions flow to your sheet with date, merchant, amount, and category. Build custom dashboards with spreadsheet formulas.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
            <p className="text-lg font-semibold text-sheetlink-text">
              Ready to automate your bookkeeping?
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Free forever for the last 7 days of transactions. No credit card required.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
            >
              Add to Chrome - Start Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
