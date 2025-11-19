import { useEffect } from 'react';
import Head from 'next/head';

export default function OAuthCallback() {
  useEffect(() => {
    console.log('[Callback] Page loaded with hash:', window.location.hash);

    // Close the window after a short delay
    // This triggers launchWebAuthFlow callback with the current URL
    setTimeout(() => {
      console.log('[Callback] Closing window...');
      window.close();
    }, 500);
  }, []);

  return (
    <>
      <Head>
        <title>Authenticating... - SheetLink</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e5e7eb',
            borderTopColor: '#10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <h1 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>
            Authenticating...
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            This window will close automatically
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </>
  );
}
