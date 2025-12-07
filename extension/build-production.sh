#!/bin/bash
# Build production version of the extension

echo "Building SheetLink Extension (Production Mode)..."

# Disable debug logging
sed -i.bak 's/DEBUG: true/DEBUG: false/g' config.js && rm config.js.bak
sed -i.bak 's/window\.SHEETLINK_DEBUG = true/window.SHEETLINK_DEBUG = false/g' src/debug.js && rm src/debug.js.bak

# Create ZIP file
cd ..
zip -r sheetlink-extension-production.zip extension/ \
  -x '*/node_modules/*' \
  -x '*/.git/*' \
  -x '*/package-lock.json' \
  -x '*.bak' \
  -x '*.sh'

# Restore debug mode (safety measure)
cd extension
sed -i.bak 's/DEBUG: false/DEBUG: true/g' config.js && rm config.js.bak
sed -i.bak 's/window\.SHEETLINK_DEBUG = false/window.SHEETLINK_DEBUG = true/g' src/debug.js && rm src/debug.js.bak

echo "✓ Production build created: sheetlink-extension-production.zip"
echo "  Debug logging: Disabled"
echo "  ⚠️  Config restored to debug mode for safety"
echo "  Ready to load in Chrome or submit to Web Store"
