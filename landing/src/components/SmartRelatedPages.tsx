import { getSmartRelatedPages } from '@/lib/programmatic-pages';

interface SmartRelatedPagesProps {
  currentSlug: string;
  title?: string;
  limit?: number;
}

export default function SmartRelatedPages({ currentSlug, title = 'You might also like', limit = 4 }: SmartRelatedPagesProps) {
  const relatedPages = getSmartRelatedPages(currentSlug, limit);

  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="mb-6 text-2xl font-bold text-sheetlink-text">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {relatedPages.map((page) => (
          <a
            key={page.slug}
            href={page.slug}
            className="group block rounded-lg border-2 border-gray-200 p-5 transition-all hover:border-sheetlink-green-700 hover:shadow-md"
          >
            <div className="mb-2 flex items-start justify-between">
              <h3 className="font-semibold text-sheetlink-text group-hover:text-sheetlink-green-700">
                {page.title}
              </h3>
              <svg
                className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-sheetlink-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-600">{page.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
