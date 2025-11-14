#!/usr/bin/env node
/**
 * SheetLink Icon Builder
 * Generates Chrome extension icons in required sizes from source PNG
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Source and output paths
const SOURCE_PNG = join(__dirname, '../brand/sheetlink-icon-512.png');
const OUTPUT_DIR = join(__dirname, 'icons');

// Required sizes for Chrome extension
const SIZES = [16, 32, 48, 128];

async function buildIcons() {
  console.log('🎨 SheetLink Icon Builder\n');

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created directory: ${OUTPUT_DIR}`);
  }

  // Check source exists
  if (!existsSync(SOURCE_PNG)) {
    console.error(`❌ Source not found: ${SOURCE_PNG}`);
    process.exit(1);
  }

  console.log(`📦 Source: ${SOURCE_PNG}\n`);

  // Generate each size
  for (const size of SIZES) {
    const outputPath = join(OUTPUT_DIR, `sheetlink-${size}.png`);

    try {
      await sharp(SOURCE_PNG)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ compressionLevel: 9 })
        .toFile(outputPath);

      const stats = await sharp(outputPath).metadata();
      console.log(`✓ ${size}×${size}px → icons/sheetlink-${size}.png (${stats.size} bytes)`);
    } catch (error) {
      console.error(`❌ Failed to generate ${size}px: ${error.message}`);
      process.exit(1);
    }
  }

  console.log('\n✅ All icons generated successfully!\n');
}

buildIcons().catch(error => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
