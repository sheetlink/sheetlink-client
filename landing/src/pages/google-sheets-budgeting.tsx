import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function GoogleSheetsBudgeting() {
  const seoTitle = 'Google Sheets Budgeting - Auto-Sync Bank Transactions for Budget Tracking';
  const seoDescription = 'Build a budget in Google Sheets with automatic bank transaction sync. Track spending by category, monitor cash flow, and stay on budget. Free budgeting template with SheetLink.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I use Google Sheets for budgeting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Google Sheets is excellent for budgeting. With SheetLink, you can automatically sync bank transactions to Google Sheets, making it easy to track spending by category, compare actual vs budgeted amounts, and monitor cash flow in real-time. It's free, flexible, and more customizable than apps like YNAB or Mint."
        }
      },
      {
        "@type": "Question",
        "name": "How do I automatically update my Google Sheets budget with bank transactions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink Chrome extension, connect your bank accounts through Plaid, and select your budget spreadsheet. New transactions will sync automatically with date, merchant, amount, and category. Use formulas to categorize expenses and compare against your monthly budget targets. Free for 7 days of history."
        }
      },
      {
        "@type": "Question",
        "name": "Is SheetLink better than YNAB or Mint for budgeting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink offers more flexibility than YNAB ($14.99/mo) or Mint (discontinued) because you control the spreadsheet formulas and layout. SheetLink costs $2/month for unlimited history vs YNAB's $14.99/month. However, YNAB has a specific budgeting methodology and mobile app. SheetLink is best if you prefer spreadsheet control and lower cost."
        }
      },
      {
        "@type": "Question",
        "name": "What's the best Google Sheets budget template to use with SheetLink?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink offers pre-built budget templates through the Recipes feature. You can choose a monthly budget template that auto-categorizes transactions, tracks spending vs budget targets, and calculates remaining balances. Or use your own custom Google Sheets budget and point SheetLink to sync transactions to it."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="google sheets budgeting, budget template google sheets, track spending sheets, monthly budget google sheets, personal finance spreadsheet" />

        {/* FAQ Schema for AI Answer Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="mb-8 text-5xl font-bold text-sheetlink-text">
            Google Sheets Budgeting: Track Spending Automatically
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              <strong>Google Sheets is perfect for budgeting.</strong> It's flexible, free, and lets you
              build a budget system that actually matches how you spend money. The only downside? Manually
              entering every transaction is a pain.
            </p>
            <p className="text-xl leading-relaxed">
              <strong>SheetLink fixes this.</strong> Instead of typing in transactions by hand, SheetLink
              automatically syncs your bank data to Google Sheets using Plaid. Your budget updates in
              real-time as you spend.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Use Google Sheets for Budgeting?
            </h2>
            <p>
              Budgeting apps like Mint or YNAB cost $10-15/month and force you into their budget categories
              and workflows. Google Sheets gives you complete freedom:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Custom budget categories</strong> - Track exactly what matters to you (not generic templates)</li>
              <li><strong>Flexible time periods</strong> - Weekly, bi-weekly, monthly, or annual budgets</li>
              <li><strong>Zero cost</strong> - Google Sheets is free forever (SheetLink has a free tier too)</li>
              <li><strong>Full control</strong> - See every formula, customize every calculation</li>
              <li><strong>Works offline</strong> - Access your budget even without internet (via Google Drive)</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How SheetLink Automates Google Sheets Budgeting
            </h2>
            <p>
              Traditional Google Sheets budgeting requires you to manually log every purchase. With SheetLink:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Takes 30 seconds
              </li>
              <li>
                <strong>Connect Your Bank via Plaid</strong> - Securely link checking accounts, credit cards, savings
              </li>
              <li>
                <strong>Choose Your Budget Sheet</strong> - Use your existing template or start fresh
              </li>
              <li>
                <strong>Auto-Sync Transactions</strong> - SheetLink writes transactions to your Sheet automatically
              </li>
              <li>
                <strong>Track Spending by Category</strong> - Use SUMIF formulas to compare actual vs. budgeted spending
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Simple Google Sheets Budget Template
            </h2>
            <p>
              A basic budget in Google Sheets needs two tabs: <strong>Transactions</strong> and <strong>Budget Summary</strong>.
            </p>

            <h3 className="mt-8 text-2xl font-bold text-sheetlink-text">Tab 1: Transactions (Auto-Synced)</h3>
            <p>
              SheetLink writes your bank data here. Each row is one transaction with:
            </p>
            <ul className="list-disc pl-6">
              <li>Date</li>
              <li>Description (merchant name)</li>
              <li>Amount (negative = spending, positive = income)</li>
              <li>Category (auto-categorized by Plaid)</li>
              <li>Account (which bank/card)</li>
            </ul>

            <h3 className="mt-8 text-2xl font-bold text-sheetlink-text">Tab 2: Budget Summary</h3>
            <p>
              Create your budget categories and use formulas to track actual spending vs. budget:
            </p>
            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Category</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Budgeted</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Actual</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Food & Dining</td>
                    <td className="px-6 py-4">$500</td>
                    <td className="px-6 py-4">=SUMIF(Transactions!D:D,"Food",...)</td>
                    <td className="px-6 py-4">=B2-C2</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Transportation</td>
                    <td className="px-6 py-4">$200</td>
                    <td className="px-6 py-4">=SUMIF(Transactions!D:D,"Travel",...)</td>
                    <td className="px-6 py-4">=B3-C3</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Shopping</td>
                    <td className="px-6 py-4">$300</td>
                    <td className="px-6 py-4">=SUMIF(Transactions!D:D,"Shopping",...)</td>
                    <td className="px-6 py-4">=B4-C4</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Use conditional formatting to turn "Remaining" cells red when you're over budget.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Budget Categories That Actually Work
            </h2>
            <p>
              Most budgeting apps force you into predefined categories. In Google Sheets, you control the categories.
              Popular setups include:
            </p>
            <h3 className="mt-6 text-xl font-bold text-sheetlink-text">50/30/20 Budget</h3>
            <ul className="list-disc pl-6">
              <li><strong>50% Needs</strong> - Rent, utilities, groceries, insurance</li>
              <li><strong>30% Wants</strong> - Dining out, entertainment, hobbies</li>
              <li><strong>20% Savings</strong> - Emergency fund, retirement, investments</li>
            </ul>

            <h3 className="mt-6 text-xl font-bold text-sheetlink-text">Zero-Based Budget</h3>
            <p>
              Assign every dollar a job. Income minus expenses = zero. Track categories like:
            </p>
            <ul className="list-disc pl-6 grid grid-cols-2 gap-2">
              <li>Housing</li>
              <li>Transportation</li>
              <li>Food (groceries)</li>
              <li>Food (dining out)</li>
              <li>Utilities</li>
              <li>Insurance</li>
              <li>Debt payments</li>
              <li>Savings goals</li>
              <li>Entertainment</li>
              <li>Personal care</li>
              <li>Subscriptions</li>
              <li>Miscellaneous</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Spending in Real-Time
            </h2>
            <p>
              The power of Google Sheets budgeting with SheetLink is real-time visibility into your spending.
              Instead of waiting for your monthly credit card statement, you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Check your budget mid-month</strong> - See if you're on track or overspending</li>
              <li><strong>Adjust spending behavior</strong> - If you've spent $450 of your $500 food budget by the 20th, slow down</li>
              <li><strong>Monitor multiple accounts</strong> - Combine spending from checking, credit cards, and cash into one budget</li>
              <li><strong>Set up alerts</strong> - Use Google Sheets notifications when a category exceeds budget</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Advanced Budgeting Features
            </h2>
            <p>
              Once you've mastered basic budgeting, Google Sheets lets you build advanced features:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Savings goals tracker</strong> - Chart progress toward emergency fund, vacation, or down payment</li>
              <li><strong>Irregular expenses planner</strong> - Budget for annual insurance premiums or quarterly taxes</li>
              <li><strong>Income vs. expense trends</strong> - Line chart showing cash flow over 6-12 months</li>
              <li><strong>Spending heatmap</strong> - Pivot table showing which days/weeks you spend the most</li>
              <li><strong>Shared budgets</strong> - Give your partner view or edit access for joint finances</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Budgeting with Multiple Bank Accounts
            </h2>
            <p>
              If you use multiple banks or credit cards, SheetLink syncs them all to one Google Sheet.
              Each transaction includes an "Account" column so you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Filter by account (see just credit card spending)</li>
              <li>Sum total spending across all accounts</li>
              <li>Track which accounts you're using most</li>
              <li>Reconcile each account separately</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Is Google Sheets Better Than Mint or YNAB for Budgeting?
            </h2>
            <p>
              <strong>Use Google Sheets if:</strong>
            </p>
            <ul className="list-disc pl-6">
              <li>You want full control over categories and calculations</li>
              <li>You prefer a simple, transparent system</li>
              <li>You don't need bells and whistles (investment tracking, bill reminders)</li>
              <li>You like spreadsheets</li>
            </ul>
            <p className="mt-4">
              <strong>Use Mint/YNAB if:</strong>
            </p>
            <ul className="list-disc pl-6">
              <li>You want a mobile app with push notifications</li>
              <li>You need bill payment reminders and alerts</li>
              <li>You prefer a guided budgeting methodology (YNAB's 4 rules)</li>
              <li>You don't want to build formulas</li>
            </ul>
            <p className="mt-4">
              <strong>The SheetLink advantage:</strong> You get the automation of Mint (auto-sync transactions)
              with the flexibility of a spreadsheet. Best of both worlds.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing: Free Budgeting for 7 Days of Transactions
            </h2>
            <p>
              <strong>SheetLink is free forever for the last 7 days of transactions.</strong> Perfect for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Weekly budget check-ins</li>
              <li>Tracking spending for the current week</li>
              <li>Testing SheetLink before upgrading</li>
            </ul>
            <p>
              Want to track monthly or annual budgets? Upgrade to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Basic ($1.99/month)</strong> - 90 days of history, auto-sync every 24 hours</li>
              <li><strong>Pro ($9.99/month)</strong> - 24 months of history, hourly sync, AI categorization</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Start Budgeting in Google Sheets Today
            </h2>
            <p>
              Stop manually entering transactions. Start syncing your bank data automatically and build
              a budget that actually works for you.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to automate your Google Sheets budget?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for 7 days of transaction history. No credit card required.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
                </svg>
                Add to Chrome - Start Budgeting
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
