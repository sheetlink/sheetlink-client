# SheetLink Landing Page

Marketing landing page for SheetLink — built with Next.js 16, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 16 (Pages Router)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Analytics**: Plausible (privacy-focused)
- **Deployment**: Vercel

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Update `.env.local` with your values:
   - `NEXT_PUBLIC_CHROME_STORE_URL`: Your Chrome Web Store extension URL
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: Your Plausible analytics domain (if using)
   - `NEXT_PUBLIC_API_BASE_URL`: Backend API base URL (defaults to `http://localhost:8000` if not set)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Beta Signup Endpoint

The `/beta` page connects to the backend API to store beta signups. To enable this functionality:

**For local development:**
```bash
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
```

**For production:**
```bash
NEXT_PUBLIC_API_BASE_URL="https://api.sheetlink.app"
```

Set this in `.env.local` for local development or in your Vercel environment variables for production.

The backend exposes `POST /api/beta-signup` to receive signups with the following schema:
```json
{
  "email": "user@example.com",
  "name": "John Doe (optional)",
  "source": "web"
}
```

If `NEXT_PUBLIC_API_BASE_URL` is not set, it defaults to `http://localhost:8000`.

## Build

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Vercel CLI (Recommended for Monorepo)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from the landing directory:
   ```bash
   cd landing
   vercel
   ```

3. Configure root directory:
   - When prompted, set root directory to `landing`
   - Vercel will auto-detect Next.js framework

4. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
   - `NEXT_PUBLIC_CHROME_STORE_URL`
   - `NEXT_PUBLIC_GITHUB_URL`
   - `NEXT_PUBLIC_API_BASE_URL` - Backend API URL for beta signups

### Option 2: Vercel Dashboard

1. Import your GitHub repository
2. Set **Root Directory** to `landing`
3. Framework preset will auto-detect as Next.js
4. Add environment variables in project settings
5. Deploy

## Project Structure

```
landing/
├── public/              # Static assets
│   ├── sheetlink-logo.svg
│   ├── sheetlink-favicon.svg
│   └── og-image.svg
├── src/
│   ├── components/      # React components
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhySheetLink.tsx
│   │   ├── Pricing.tsx
│   │   ├── Security.tsx
│   │   └── Footer.tsx
│   ├── lib/            # Utilities
│   │   ├── constants.ts # Brand tokens, pricing, content
│   │   └── analytics.ts # Plausible event tracking
│   ├── pages/          # Next.js pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   └── styles/         # Global styles
│       └── globals.css
├── .env.local          # Local environment variables (gitignored)
├── .env.example        # Environment template
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind + brand tokens
└── vercel.json         # Vercel deployment config
```

## Brand Tokens

All brand constants are centralized in `src/lib/constants.ts`:

- **Colors**: SheetLink greens (#023820, #0B703A, #00C474)
- **Typography**: Space Grotesk (headings), Inter (body)
- **Messaging**: Tagline, pricing, features
- **URLs**: Chrome Store, GitHub, docs

## Analytics

Plausible analytics is configured in `_document.tsx`. Events are tracked via `src/lib/analytics.ts`:

- `cta_install_click` - Install button clicks
- `github_click` - GitHub link clicks
- `pricing_pro_click` - Pro tier clicks
- `footer_link_click` - Footer navigation

## Assets

### Current Placeholders

The following assets are **placeholder SVGs** and should be replaced with production-ready designs:

- `public/sheetlink-logo.svg` - Main logo (200x60)
- `public/sheetlink-favicon.svg` - Favicon (32x32)
- `public/og-image.svg` - OpenGraph image (1200x630)

### Recommended Production Assets

1. **Logo**: Professional vector logo (SVG + PNG exports)
2. **Favicon**: Multi-size favicon (16x16, 32x32, 180x180)
3. **OG Image**: High-quality PNG (1200x630) for social sharing
4. **Screenshots**: Extension UI screenshots for "How It Works" section

## Performance

Target Lighthouse scores (as per PRD):

- **Performance**: ≥90
- **Accessibility**: ≥90
- **Best Practices**: ≥90
- **SEO**: ≥90

Current optimizations:

- WebP image format support
- Responsive image sizes
- CSS minification via Tailwind
- Font preloading
- Static generation (SSG)

## SEO

Meta tags configured in `pages/index.tsx`:

- Title, description, keywords
- OpenGraph (Facebook, LinkedIn)
- Twitter Cards
- Canonical URL

## Security Headers

Security headers configured in `vercel.json`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## License

Part of the SheetLink monorepo. See root LICENSE file.
