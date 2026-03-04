import { getRelatedPages } from '@/lib/programmatic-pages';

interface RelatedPagesProps {
  currentSlug: string;
  title?: string;
  limit?: number;
}

export default function RelatedPages({ currentSlug, title = 'Related Guides', limit = 4 }: RelatedPagesProps) {
  const relatedPages = getRelatedPages(currentSlug, limit);

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
            className="block rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-sheetlink-green-700 hover:shadow-md"
          >
            <h3 className="mb-2 font-semibold text-sheetlink-text">{page.title}</h3>
            <p className="text-sm text-gray-600">{page.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
