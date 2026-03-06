#!/usr/bin/env python3
"""
Script to add SEOHead and StructuredData components to all SEO pages.
"""

import os
import re
from pathlib import Path

# Category mappings
CATEGORY_MAP = {
    'pricing': ('Pricing Guides', 'https://sheetlink.app/pricing-guides'),
    'alternative': ('Alternatives', 'https://sheetlink.app/'),
    'vs': ('Comparisons', 'https://sheetlink.app/'),
    'bookkeeping': ('How-To Guides', 'https://sheetlink.app/how-to-guides'),
    'income': ('How-To Guides', 'https://sheetlink.app/how-to-guides'),
    'expense': ('How-To Guides', 'https://sheetlink.app/how-to-guides'),
    'tracker': ('How-To Guides', 'https://sheetlink.app/how-to-guides'),
    'sync': ('How-To Guides', 'https://sheetlink.app/how-to-guides'),
    'google-sheets': ('How-To Guides', 'https://sheetlink.app/how-to-guides'),
    'excel': ('How-To Guides', 'https://sheetlink.app/how-to-guides'),
    'plaid': ('Integration Guides', 'https://sheetlink.app/integration-guides'),
}

def get_category(filename):
    """Determine category from filename."""
    for key, value in CATEGORY_MAP.items():
        if key in filename:
            return value
    return ('Resources', 'https://sheetlink.app/')

def process_file(filepath):
    """Add SEO components to a single file."""
    with open(filepath, 'r') as f:
        content = f.read()

    # Skip if already has SEOHead
    if 'import SEOHead' in content or 'SEOHead' in content:
        print(f"✓ Skipping {filepath.name} (already has SEOHead)")
        return False

    # Skip if doesn't import Head from next/head
    if "import Head from 'next/head'" not in content:
        print(f"✓ Skipping {filepath.name} (no Head import)")
        return False

    filename = filepath.stem
    slug = f'/{filename}'
    category_name, category_url = get_category(filename)

    # Extract seoTitle and seoDescription
    title_match = re.search(r'const seoTitle = [\'"](.+?)[\'"];', content)
    desc_match = re.search(r'const seoDescription = [\'"](.+?)[\'"];', content)
    keywords_match = re.search(r'<meta name="keywords" content="([^"]+)"', content)

    if not title_match or not desc_match:
        print(f"⚠ Warning: Could not find seoTitle or seoDescription in {filepath.name}")
        return False

    seo_title = title_match.group(1)
    seo_description = desc_match.group(1)
    keywords = keywords_match.group(1) if keywords_match else ''

    # Extract page title for breadcrumbs
    h1_match = re.search(r'<h1[^>]*>(.+?)</h1>', content, re.DOTALL)
    if h1_match:
        page_title = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip()
    else:
        page_title = seo_title.split(':')[0].strip()

    # Step 1: Replace Head import
    content = content.replace(
        "import Head from 'next/head';",
        "import SEOHead from '@/components/SEOHead';\nimport StructuredData from '@/components/StructuredData';"
    )

    # Step 2: Add slug constant after seoDescription
    if 'const slug =' not in content:
        content = re.sub(
            r"(const seoDescription = .+?;)",
            f"\\1\n  const slug = '{slug}';",
            content
        )

    # Step 3: Replace <Head> with <SEOHead> and add StructuredData
    old_head_pattern = r'<Head>.*?</Head>'

    keywords_param = f'\n        keywords="{keywords}"' if keywords else ''

    new_seo_head = f'''<SEOHead
        title={{seoTitle}}
        description={{seoDescription}}
        canonical={{`https://sheetlink.app${{slug}}`}}{keywords_param}
      />

      <StructuredData
        type="article"
        headline={{seoTitle}}
        description={{seoDescription}}
        url={{`https://sheetlink.app${{slug}}`}}
        datePublished="2026-03-05T00:00:00Z"
      />

      <StructuredData
        type="breadcrumb"
        items={{[
          {{ name: 'Home', url: 'https://sheetlink.app' }},
          {{ name: '{category_name}', url: '{category_url}' }},
          {{ name: '{page_title}', url: `https://sheetlink.app${{slug}}` }}
        ]}}
      />'''

    content = re.sub(old_head_pattern, new_seo_head, content, flags=re.DOTALL)

    # Write back
    with open(filepath, 'w') as f:
        f.write(content)

    print(f"✓ Updated {filepath.name}")
    return True

def main():
    pages_dir = Path('src/pages')

    # Patterns to match SEO pages
    patterns = [
        '*-alternative.tsx',
        '*-pricing-*.tsx',
        'sheetlink-vs-*.tsx',
        '*-bookkeeping*.tsx',
        '*-income-*.tsx',
        '*-expense-*.tsx',
        '*-tracker.tsx',
        'sync-*.tsx',
        'google-sheets-*.tsx',
        'excel-*.tsx',
        '*-plaid*.tsx',
        '*-finance-*.tsx',
        'tax-prep-*.tsx',
        'creator-*.tsx',
        'freelance-*.tsx',
        'gig-worker-*.tsx',
        'consultant-*.tsx',
        'designer-*.tsx',
        'software-developer-*.tsx',
        'marketing-agency-*.tsx',
        'real-estate-*.tsx',
        'rental-property-*.tsx',
        'reseller-*.tsx',
        'etsy-*.tsx',
        'airbnb-*.tsx',
        'amazon-fba-*.tsx',
        'dropshipping-*.tsx',
        'track-*.tsx',
    ]

    files_to_process = set()
    for pattern in patterns:
        files_to_process.update(pages_dir.glob(pattern))

    updated_count = 0
    for filepath in sorted(files_to_process):
        if process_file(filepath):
            updated_count += 1

    print(f"\n✓ Complete! Updated {updated_count} pages")

if __name__ == '__main__':
    main()
