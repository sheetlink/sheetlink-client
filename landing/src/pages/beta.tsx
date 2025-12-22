import { useEffect } from 'react';
import Head from 'next/head';
import { BRAND } from '@/lib/constants';

export default function Beta() {
  const seoTitle = `${BRAND.name} - Now Available`;
  const seoDescription = 'SheetLink is now live on the Chrome Web Store! Install directly from Chrome.';

  // Redirect to Chrome Web Store
  useEffect(() => {
    window.location.href = 'https://chromewebstore.google.com/detail/sheetlink-%E2%80%94-connect-your/niehncndbonfankgokhandgbaebdbpch';
  }, []);

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-sheetlink-text">
            Redirecting to Chrome Web Store...
          </h1>
          <p className="text-gray-600">
            SheetLink is now live! Installing directly from the Chrome Web Store.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            If you're not redirected automatically,{' '}
            <a
              href="https://chromewebstore.google.com/detail/sheetlink-%E2%80%94-connect-your/niehncndbonfankgokhandgbaebdbpch"
              className="text-sheetlink-green-700 underline"
            >
              click here
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
