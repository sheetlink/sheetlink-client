import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function PlaidOAuthCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing Plaid authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract parameters from URL
        const urlParams = new URLSearchParams(window.location.search);
        const publicToken = urlParams.get('public_token');
        const metadata = urlParams.get('metadata');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        // Handle error from Plaid
        if (error) {
          setStatus('error');
          setMessage(errorDescription || error || 'Authentication failed');
          return;
        }

        // Validate we got the public token
        if (!publicToken) {
          setStatus('error');
          setMessage('Missing public token from Plaid. Please try again.');
          return;
        }

        // Parse metadata if available
        let metadataObj = null;
        if (metadata) {
          try {
            metadataObj = JSON.parse(metadata);
          } catch (e) {
            console.warn('Failed to parse metadata:', e);
          }
        }

        // Check if we're in a browser extension context
        // @ts-ignore - chrome is available when loaded from extension
        if (typeof window !== 'undefined' && 'chrome' in window && typeof chrome !== 'undefined' && chrome.runtime) {
          try {
            // Send the public token to the extension
            // @ts-ignore - chrome.runtime is available
            await new Promise<void>((resolve, reject) => {
              chrome.runtime.sendMessage(
                {
                  type: 'PLAID_OAUTH_SUCCESS',
                  publicToken: publicToken,
                  metadata: metadataObj
                },
                (response: any) => {
                  if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                  } else if (response && response.error) {
                    reject(new Error(response.error));
                  } else {
                    resolve();
                  }
                }
              );
            });

            // Success!
            setStatus('success');
            setMessage('Bank connected successfully! You can close this window.');

            // Auto-close after 2 seconds
            setTimeout(() => {
              window.close();
            }, 2000);
          } catch (error) {
            console.error('Extension communication error:', error);
            setStatus('error');
            setMessage('Could not communicate with extension. Please try again.');
          }
        } else {
          setStatus('error');
          setMessage('This page must be opened from the SheetLink extension.');
        }
      } catch (error) {
        console.error('Callback error:', error);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    handleCallback();
  }, []);

  return (
    <>
      <Head>
        <title>Plaid Authentication - SheetLink</title>
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
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '24px' }}>
          {status === 'loading' && (
            <>
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
                {message}
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px',
                color: 'white'
              }}>
                ✓
              </div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#10b981' }}>
                Success!
              </h1>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                {message}
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px',
                color: 'white'
              }}>
                ✕
              </div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#ef4444' }}>
                Error
              </h1>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                {message}
              </p>
              <button
                onClick={() => window.close()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Close Window
              </button>
            </>
          )}
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
