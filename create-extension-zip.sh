#!/bin/bash

# === CONFIG ===
EXTENSION_DIR="./extension"
OUTPUT_DIR="./dist"
VERSION=$(node -p "require('./extension/package.json').version")
ZIP_NAME="sheetlink-extension-v${VERSION}.zip"

# === CLEAN OUTPUT DIR ===
mkdir -p "$OUTPUT_DIR"
rm -f "$OUTPUT_DIR/$ZIP_NAME"

echo "📦 Creating Chrome extension ZIP: $ZIP_NAME"

# === CREATE TEMP BUILD DIR ===
TMP_DIR=$(mktemp -d)
cp -R "$EXTENSION_DIR/" "$TMP_DIR"

# === REMOVE UNNEEDED FILES ===
echo "🧹 Cleaning build folder..."
rm -rf "$TMP_DIR/node_modules"
rm -f "$TMP_DIR/package.json"
rm -f "$TMP_DIR/package-lock.json"
rm -f "$TMP_DIR/.DS_Store"
find "$TMP_DIR" -name "*.DS_Store" -delete

# OPTIONAL: remove src/ if you're shipping compiled files  
# rm -rf "$TMP_DIR/src"

# === ZIP THE CLEANED FOLDER ===
cd "$TMP_DIR"
zip -r "$ZIP_NAME" . \
  -x "*.DS_Store" \
  -x "node_modules/*" \
  -x "package.json" \
  -x "package-lock.json"

# === MOVE ZIP TO OUTPUT DIR ===
mv "$ZIP_NAME" "$OLDPWD/$OUTPUT_DIR"

echo "✅ Done!"
echo "ZIP created at: $OUTPUT_DIR/$ZIP_NAME"

# === CLEAN TEMP DIR ===
rm -rf "$TMP_DIR"