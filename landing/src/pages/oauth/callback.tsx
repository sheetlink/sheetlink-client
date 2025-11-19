import { useEffect } from 'react';
import Head from 'next/head';

export default function OAuthCallback() {
  useEffect(() => {
    // Extract the OAuth token from the URL fragment
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');
    const error = params.get('error');

    if (error) {
      // Send error back to extension
      window.close();
      return;
    }

    if (accessToken) {
      // Extension will capture this via launchWebAuthFlow
      // The window will close automatically
      console.log('OAuth successful, token received');
    }
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
