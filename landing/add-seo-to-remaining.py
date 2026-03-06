#!/usr/bin/env python3
import re
from pathlib import Path

# Page metadata
PAGES = {
    'index.tsx': {
        'title': 'SheetLink - Sync Bank Transactions to Google Sheets',
        'description': 'Privacy-first bank transaction sync for Google Sheets. Connect 10,000+ banks via Plaid. Free for last 7 days, $39.99/year for unlimited history. Your data stays in YOUR Google account.',
        'keywords': 'bank sync google sheets, plaid google sheets, financial tracking, budget spreadsheet, transaction sync',
        'type': 'website',
    },
    'pricing.tsx': {
        'title': 'SheetLink Pricing - $39.99/Year or Free for 7 Days',
        'description': 'SheetLink pricing: Free forever for last 7 days of transactions. Pro plan just $39.99/year ($3.33/mo) for unlimited history. No hidden fees.',
        'keywords': 'sheetlink pricing, bank sync cost, google sheets budget pricing',
        'type': 'website',
    },
    'plaid-google-sheets.tsx': {
        'title': 'Plaid + Google Sheets Integration - Auto-Sync Bank Transactions',
        'description': 'Connect Plaid to Google Sheets with SheetLink. Automatically sync bank transactions from 10,000+ financial institutions to your own spreadsheets.',
        'keywords': 'plaid google sheets, plaid integration, bank api google sheets, plaid spreadsheet',
        'type': 'article',
    },
    'how-to-guides.tsx': {
        'title': 'How-To Guides - Financial Tracking with Google Sheets',
        'description': 'Step-by-step guides for tracking finances, bookkeeping, and budgeting in Google Sheets. Learn how to sync bank data and automate your financial tracking.',
        'keywords': 'google sheets finance, bookkeeping guides, budget tutorials',
        'type': 'website',
    },
    'pricing-guides.tsx': {
        'title': 'Pricing Guides - Compare Financial App Costs (2026)',
        'description': 'Detailed pricing comparisons for financial apps and tools. Compare Tiller, YNAB, Mint alternatives, and more. Find the best value for your budget.',
        'keywords': 'finance app pricing, budget app costs, financial tool comparison',
        'type': 'website',
    },
    'integration-guides.tsx': {
        'title': 'Integration Guides - Connect Banks to Google Sheets',
        'description': 'Integration guides for connecting financial services to Google Sheets. Learn about Plaid, bank APIs, and automated data syncing.',
        'keywords': 'bank integration, plaid setup, google sheets api',
        'type': 'website',
    },
    'comparisons.tsx': {
        'title': 'Financial App Comparisons - Find the Best Alternative',
        'description': 'Compare financial tracking apps and tools. See how SheetLink stacks up against Tiller, YNAB, Mint, Quicken, and other budgeting solutions.',
        'keywords': 'budget app comparison, financial tool alternatives, mint vs ynab',
        'type': 'website',
    },
    'use-cases.tsx': {
        'title': 'Use Cases - Financial Tracking for Every Need',
        'description': 'See how freelancers, small businesses, real estate investors, and more use SheetLink for custom financial tracking in Google Sheets.',
        'keywords': 'freelance bookkeeping, small business finance, financial tracking use cases',
        'type': 'website',
    },
    'docs.tsx': {
        'title': 'SheetLink Documentation - Getting Started Guide',
        'description': 'Complete SheetLink documentation. Learn how to install, connect banks, sync transactions, and get the most out of your financial spreadsheets.',
        'keywords': 'sheetlink docs, setup guide, user manual',
        'type': 'article',
    },
    'how-it-works.tsx': {
        'title': 'How SheetLink Works - Secure Bank Sync to Sheets',
        'description': 'Learn how SheetLink securely syncs bank transactions to Google Sheets using Plaid. Privacy-first, manual sync, bank-level security.',
        'keywords': 'how sheetlink works, bank sync process, plaid security',
        'type': 'article',
    },
    'about.tsx': {
        'title': 'About SheetLink - Privacy-First Financial Tracking',
        'description': 'Learn about SheetLink\'s mission to provide privacy-first, affordable financial tracking. Your data stays in YOUR Google account, forever.',
        'keywords': 'about sheetlink, company info, privacy first finance',
        'type': 'website',
    },
    'recipes.tsx': {
        'title': 'SheetLink Recipes - Pre-Built Financial Spreadsheets',
        'description': 'Ready-to-use Google Sheets templates for budgeting, expense tracking, and financial analysis. One-click install with bank sync.',
        'keywords': 'budget templates, financial spreadsheets, google sheets recipes',
        'type': 'website',
    },
}

def update_page(filepath):
    filename = filepath.name
    if filename not in PAGES:
        return False
    
    metadata = PAGES[filename]
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Skip if already has SEOHead
    if 'SEOHead' in content:
        print(f"✓ Skipping {filename} (already has SEOHead)")
        return False
    
    slug = f'/{filename.replace(".tsx", "")}'.replace('/index', '')
    
    # Replace Head import
    content = content.replace(
        "import Head from 'next/head';",
        "import SEOHead from '@/components/SEOHead';\nimport StructuredData from '@/components/StructuredData';"
    )
    
    # Find where to insert SEO components (after first return or fragment)
    # Look for patterns like "return (" or "return <>"
    match = re.search(r'(return\s+\(\s*<>|return\s+<)', content)
    if not match:
        print(f"⚠ Warning: Could not find return statement in {filename}")
        return False
    
    insert_pos = match.end()
    
    # Build SEO components
    seo_components = f'''
      <SEOHead
        title="{metadata['title']}"
        description="{metadata['description']}"
        canonical="https://sheetlink.app{slug}"
        keywords="{metadata['keywords']}"
        ogType="{metadata['type']}"
      />

      <StructuredData
        type="article"
        headline="{metadata['title']}"
        description="{metadata['description']}"
        url="https://sheetlink.app{slug}"
        datePublished="2026-03-05T00:00:00Z"
      />
'''
    
    # Insert at position
    content = content[:insert_pos] + seo_components + content[insert_pos:]
    
    # Remove old <Head> block if present
    content = re.sub(r'<Head>.*?</Head>\s*', '', content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"✓ Updated {filename}")
    return True

def main():
    pages_dir = Path('src/pages')
    updated = 0
    
    for filename in PAGES.keys():
        filepath = pages_dir / filename
        if filepath.exists() and update_page(filepath):
            updated += 1
    
    print(f"\n✓ Complete! Updated {updated} pages")

if __name__ == '__main__':
    main()
