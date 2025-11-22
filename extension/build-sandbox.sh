#!/bin/bash
# Build sandbox version of the extension

echo "Building SheetLink Extension (Sandbox Mode)..."

# Ensure config.js has sandbox environment
sed -i.bak 's/ENV: "production"/ENV: "sandbox"/g' config.js && rm config.js.bak

# Create ZIP file
cd ..
zip -r sheetlink-extension-sandbox.zip extension/ \
  -x '*/node_modules/*' \
  -x '*/.git/*' \
  -x '*/package-lock.json' \
  -x '*.bak' \
  -x '*.sh'

echo "✓ Sandbox build created: sheetlink-extension-sandbox.zip"
echo "  Environment: Sandbox"
echo "  Ready to load in Chrome Developer Mode"
