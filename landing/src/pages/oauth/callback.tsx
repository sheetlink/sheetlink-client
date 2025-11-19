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
      alert('OAuth error: ' + error);
      return;
    }

    if (accessToken) {
      // Get extension ID from the state parameter (passed through by Google OAuth)
      const state = params.get('state');
      let extensionId = null;

      if (state) {
        try {
          const stateData = JSON.parse(state);
          extensionId = stateData.extension_id;
        } catch (e) {
          // Failed to parse state
        }
      }

      // Check if we're in a browser extension context
      if (typeof window !== 'undefined' &&
          'chrome' in window &&
          // @ts-ignore - chrome is available in extension context
          window.chrome?.runtime &&
          extensionId) {
        // @ts-ignore - chrome is available in extension context
        window.chrome.runtime.sendMessage(
          extensionId,
          {
            type: 'OAUTH_SUCCESS',
            accessToken: accessToken,
            expiresIn: expiresIn
          },
          (response: any) => {
            // @ts-ignore
            if (window.chrome.runtime.lastError) {
              // Communication error - show message to user
              alert('Could not communicate with extension. Please try again.');
            } else {
              // Success - show success message
              document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui"><div style="text-align:center"><h1 style="color:#10b981;font-size:24px">✓ Authentication Successful</h1><p style="color:#6b7280">You can close this window now</p></div></div>';
            }
          }
        );
      } else {
        alert('OAuth completed, but could not communicate with extension. Please close this window and try again.');
      }
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
