import Link from 'next/link';

interface BreadcrumbProps {
  category?: 'pricing' | 'how-to' | 'integration' | 'comparison';
  pageTitle: string;
}

const categoryInfo = {
  pricing: {
    title: 'Pricing Guides',
    href: '/pricing-guides',
  },
  'how-to': {
    title: 'How-To Guides',
    href: '/how-to-guides',
  },
  integration: {
    title: 'Integration Guides',
    href: '/integration-guides',
  },
  comparison: {
    title: 'Alternatives',
    href: '/',
  },
};

export default function Breadcrumbs({ category, pageTitle }: BreadcrumbProps) {
  return (
    <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-sheetlink-green-700 transition-colors">
        Home
      </Link>

      {category && (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link
            href={categoryInfo[category].href}
            className="hover:text-sheetlink-green-700 transition-colors"
          >
            {categoryInfo[category].title}
          </Link>
        </>
      )}

      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="font-medium text-gray-900">{pageTitle}</span>
    </nav>
  );
}
