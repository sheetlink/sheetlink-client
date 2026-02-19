import { useEffect } from 'react';
import Head from 'next/head';

export default function OAuthCallback() {
  useEffect(() => {
    // Extract the OAuth tokens from the URL fragment
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');  // Phase 3.16.0: Extract ID token for JWT auth
    const expiresIn = params.get('expires_in');
    const error = params.get('error');

    // Debug logging - check what Google OAuth returned
    console.log('[OAuth Callback] Full URL:', window.location.href);
    console.log('[OAuth Callback] Full URL hash:', hash);
    console.log('[OAuth Callback] Query string:', window.location.search);
    console.log('[OAuth Callback] All params from hash:', Object.fromEntries(params));
    console.log('[OAuth Callback] Access Token:', accessToken ? 'Present (length: ' + accessToken.length + ')' : 'MISSING');
    console.log('[OAuth Callback] ID Token:', idToken ? 'Present (length: ' + idToken.length + ')' : 'MISSING ⚠️');
    console.log('[OAuth Callback] Expires In:', expiresIn);

    if (error) {
      alert('OAuth error: ' + error);
      return;
    }

    if (accessToken) {
      // Get extension ID and recipe scope flag from the state parameter
      // State might be in hash OR query string depending on OAuth flow
      let state = params.get('state');

      // If not in hash, check query string
      if (!state) {
        const queryParams = new URLSearchParams(window.location.search);
        state = queryParams.get('state');
        console.log('[OAuth Callback] State not in hash, checking query string:', state);
      }

      let extensionId = null;
      let recipeScope = false;

      if (state) {
        console.log('[OAuth Callback] Raw state parameter:', state);
        try {
          const stateData = JSON.parse(state);
          console.log('[OAuth Callback] Parsed state data:', stateData);
          extensionId = stateData.extension_id;
          recipeScope = stateData.recipe_scope || false;
          console.log('[OAuth Callback] Extracted extensionId:', extensionId);
          console.log('[OAuth Callback] Extracted recipeScope:', recipeScope);
        } catch (e) {
          console.error('[OAuth Callback] Failed to parse state:', e);
        }
      } else {
        console.error('[OAuth Callback] No state parameter found in hash or query string!');
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
            idToken: idToken,  // Phase 3.16.0: Send ID token for JWT auth
            expiresIn: expiresIn,
            recipeScope: recipeScope  // Phase 3.25.0: Pass recipe scope flag
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
