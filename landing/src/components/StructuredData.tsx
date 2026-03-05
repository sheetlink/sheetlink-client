interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ArticleStructuredDataProps {
  type: 'article';
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
}

interface BreadcrumbStructuredDataProps {
  type: 'breadcrumb';
  items: BreadcrumbItem[];
}

interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

interface HowToStructuredDataProps {
  type: 'howto';
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}

type StructuredDataProps =
  | ArticleStructuredDataProps
  | BreadcrumbStructuredDataProps
  | HowToStructuredDataProps;

export default function StructuredData(props: StructuredDataProps) {
  let structuredData: any;

  if (props.type === 'article') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: props.headline,
      description: props.description,
      url: props.url,
      datePublished: props.datePublished || new Date().toISOString(),
      dateModified: props.dateModified || new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: props.authorName || 'SheetLink',
        url: 'https://sheetlink.app',
      },
      publisher: {
        '@type': 'Organization',
        name: 'SheetLink',
        url: 'https://sheetlink.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://sheetlink.app/sheetlink-logo.svg',
        },
      },
      image: props.image || 'https://sheetlink.app/og-image.png',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': props.url,
      },
    };
  } else if (props.type === 'breadcrumb') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: props.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  } else if (props.type === 'howto') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: props.name,
      description: props.description,
      totalTime: props.totalTime,
      step: props.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        url: step.url,
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
