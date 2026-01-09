/**
 * Simple OAuth callback server for local extension testing
 * Run with: node oauth-server.js
 */

const http = require('http');
const url = require('url');

const PORT = 3002;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Handle OAuth callback
  if (parsedUrl.pathname === '/oauth/callback') {
    const { code, state, error } = parsedUrl.query;

    if (error) {
      console.error('OAuth error:', error);
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body>
            <h1>OAuth Error</h1>
            <p>Error: ${error}</p>
            <script>window.close();</script>
          </body>
        </html>
      `);
      return;
    }

    // For authorization code flow (has code in query params)
    if (code) {
      console.log('✓ OAuth code received:', code.substring(0, 20) + '...');
      console.log('✓ State:', state);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <head>
            <title>OAuth Success</title>
          </head>
          <body>
            <h1>Authentication Successful!</h1>
            <p>Authorization code received. You can close this window.</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth-callback',
                  code: '${code}',
                  state: '${state || ''}'
                }, '*');
              }
              setTimeout(() => window.close(), 2000);
            </script>
          </body>
        </html>
      `);
      return;
    }

    // For implicit flow (tokens come in URL fragment, need client-side JS to extract)
    console.log('✓ OAuth callback received (implicit flow - tokens in fragment)');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head>
          <title>OAuth Success</title>
        </head>
        <body>
          <h1>Authentication Successful!</h1>
          <p>Processing tokens... You can close this window.</p>
          <script>
            // Extract tokens from URL fragment (after #)
            const fragment = window.location.hash.substring(1);
            const params = new URLSearchParams(fragment);

            const accessToken = params.get('access_token');
            const idToken = params.get('id_token');
            const state = params.get('state');

            console.log('✓ Access token received:', accessToken ? accessToken.substring(0, 20) + '...' : 'none');
            console.log('✓ ID token received:', idToken ? idToken.substring(0, 20) + '...' : 'none');
            console.log('✓ State:', state);

            // Send tokens to extension via Chrome extension messaging
            if (accessToken) {
              // Parse state to get extension_id
              let extensionId;
              try {
                const stateObj = JSON.parse(decodeURIComponent(state));
                extensionId = stateObj.extension_id;
              } catch (e) {
                console.error('Failed to parse state:', e);
              }

              if (extensionId) {
                // Calculate token expiry (Google implicit flow tokens expire in 3600 seconds)
                const expiresIn = params.get('expires_in') || '3600';

                // Send message to extension
                chrome.runtime.sendMessage(extensionId, {
                  type: 'OAUTH_SUCCESS',
                  accessToken: accessToken,
                  idToken: idToken,
                  expiresIn: expiresIn
                }, (response) => {
                  console.log('✓ Message sent to extension');
                  // Auto-close after sending message
                  setTimeout(() => window.close(), 1000);
                });
              } else {
                document.body.innerHTML = '<h1>OAuth Error</h1><p>Extension ID not found in state parameter</p>';
              }
            } else {
              document.body.innerHTML = '<h1>OAuth Error</h1><p>No access token found in URL fragment</p>';
            }
          </script>
        </body>
      </html>
    `);
    return;
  }

  // Handle root
  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body>
          <h1>OAuth Callback Server Running</h1>
          <p>Listening for OAuth callbacks on port ${PORT}</p>
          <p>Callback URL: http://localhost:${PORT}/oauth/callback</p>
        </body>
      </html>
    `);
    return;
  }

  // 404 for everything else
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  OAuth Callback Server Running                             ║
║  Port: ${PORT}                                                  ║
║  Callback URL: http://localhost:${PORT}/oauth/callback         ║
║                                                            ║
║  Press Ctrl+C to stop                                      ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nShutting down OAuth callback server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n\nShutting down OAuth callback server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
