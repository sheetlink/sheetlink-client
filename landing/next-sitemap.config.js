/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sheetlink.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Not needed for <500 pages
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // Custom transform for priority routing
  transform: async (config, path) => {
    // Homepage = highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Core entity pages = high priority
    if (path === '/about' || path === '/security' || path === '/how-it-works') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // SEO landing pages = high priority
    if (
      path.includes('sync-bank-to-google-sheets') ||
      path.includes('google-sheets-bookkeeping') ||
      path.includes('google-sheets-budgeting')
    ) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Seasonal/niche pages (Phase 4.4 - future)
    if (path.startsWith('/use-cases/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // Legal pages = lower priority
    if (path === '/privacy' || path === '/terms') {
      return {
        loc: path,
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date().toISOString(),
      }
    }

    // Default for any other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },

  // Exclude admin/internal pages
  exclude: [
    '/404',
    '/500',
    '/api/*',
    '/admin/*',
  ],

  // robots.txt config
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
}
