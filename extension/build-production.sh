#!/bin/bash
# Build production version of the extension

echo "Building SheetLink Extension (Production Mode)..."

# Update config.js to production environment
sed -i.bak 's/ENV: "sandbox"/ENV: "production"/g' config.js && rm config.js.bak

# Create ZIP file
cd ..
zip -r sheetlink-extension-production.zip extension/ \
  -x '*/node_modules/*' \
  -x '*/.git/*' \
  -x '*/package-lock.json' \
  -x '*.bak' \
  -x '*.sh'

# Restore sandbox environment (safety measure)
cd extension
sed -i.bak 's/ENV: "production"/ENV: "sandbox"/g' config.js && rm config.js.bak

echo "✓ Production build created: sheetlink-extension-production.zip"
echo "  Environment: Production"
echo "  ⚠️  Config restored to sandbox mode for safety"
echo "  Ready to load in Chrome or submit to Web Store"
