# Google Analytics Setup

## Overview

SheetLink uses Google Analytics 4 (GA4) to track user engagement and beta signups.

## Setup Instructions

### 1. Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variable

Add the Measurement ID to your Vercel environment:

```bash
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
# Paste your G-XXXXXXXXXX when prompted
```

Or add to `.env.local` for local development:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Deploy

```bash
npm run build
vercel --prod
```

## Tracked Events

### Beta Signup Flow
- `beta_signup_start` - User focuses on email input
- `beta_signup_success` - Successful email submission
- `beta_signup_error` - Signup error (with error message)

### Navigation
- `header_nav_click` - Header navigation clicks (About, Docs)
- `footer_link_click` - Footer link clicks
- `github_click` - GitHub repository clicks

### CTA Interactions
- `cta_install_click` - "Add to Chrome" button clicks (with location)

### Page Views
- Automatic page view tracking on route changes
- Manual `page_view` events for custom tracking

## Viewing Data

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Navigate to **Reports** > **Engagement** > **Events**
4. View real-time data in **Reports** > **Realtime**

## Custom Reports

### Beta Signup Funnel
1. Reports > Engagement > Events
2. Filter by `beta_signup_*` events
3. Create conversion funnel:
   - Step 1: `beta_signup_start`
   - Step 2: `beta_signup_success`

### Navigation Heatmap
1. Reports > Engagement > Events
2. Filter by `*_click` events
3. Group by `event_label` to see most clicked links

## Privacy Compliance

- No personally identifiable information (PII) is sent to GA
- Email addresses are NOT included in analytics events
- IP anonymization is enabled by default in GA4
- Users can opt out via browser settings or extensions

## Troubleshooting

### Events not showing up?
1. Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
2. Verify deployment includes the env var: `vercel env ls`
3. Check browser console for GA errors
4. Wait 24-48 hours for data to appear in reports (real-time should show immediately)

### Testing locally?
1. Add measurement ID to `.env.local`
2. Run `npm run dev`
3. Open browser DevTools > Network tab
4. Filter by "google-analytics" or "gtag"
5. Verify requests are being sent
