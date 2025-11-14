# SheetLink Brand Assets

This directory contains official brand assets for the SheetLink Chrome extension and landing page.

## Files
- **sheetlink-mark-current.svg** — Primary mark (link symbol)
- **sheetlink-mark-green.svg** — Green variant of the mark
- **sheetlink-logo-horizontal.svg** — Full wordmark + icon (default web use)
- **sheetlink-logo-stacked.svg** — Centered stacked layout (social use)
- **sheetlink-favicon.svg** — Favicon base for web manifest (green rounded square, white link)
- **sheetlink-icon-512.png / 128.png** — App icon exports
- **sheetlink-tokens.json** — Brand color & typography tokens

## Usage Examples
- **Landing Page (Next.js)**
```tsx
import Image from "next/image";
export default function Logo() {
  return <Image src="/brand/sheetlink-logo-horizontal.svg" alt="SheetLink logo" width={320} height={80} />;
}
```

- **Chrome Extension Manifest**
```json
"icons": {
  "16": "public/brand/sheetlink-icon-128.png",
  "48": "public/brand/sheetlink-icon-128.png",
  "128": "public/brand/sheetlink-icon-512.png"
}
```

## License
All assets © SheetLink. May be used for press and developer integration with attribution.
