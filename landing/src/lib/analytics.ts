declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Track page view
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom event
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('📊 GA Event:', eventName, params);
    window.gtag('event', eventName, params);
  } else {
    console.warn('⚠️ GA not available. Event not tracked:', eventName, params);
  }
};

// Event helpers for common actions
export const analytics = {
  // Beta signup events
  betaSignupStart: () => trackEvent('beta_signup_start'),
  betaSignupSuccess: (email: string) =>
    trackEvent('beta_signup_success', {
      event_category: 'engagement',
      event_label: 'beta_signup',
    }),
  betaSignupError: (error: string) =>
    trackEvent('beta_signup_error', {
      event_category: 'error',
      event_label: error,
    }),

  // CTA clicks
  ctaInstallClick: (location: string) =>
    trackEvent('cta_install_click', {
      event_category: 'cta',
      event_label: location,
    }),

  // Navigation
  githubClick: () =>
    trackEvent('github_click', {
      event_category: 'navigation',
      event_label: 'github',
    }),
  footerLinkClick: (link: string) =>
    trackEvent('footer_link_click', {
      event_category: 'navigation',
      event_label: link,
    }),
  headerNavClick: (page: string) =>
    trackEvent('header_nav_click', {
      event_category: 'navigation',
      event_label: page,
    }),

  // Page views
  pageView: (pageName: string) =>
    trackEvent('page_view', {
      event_category: 'engagement',
      page_name: pageName,
    }),

  // Pricing (legacy, keeping for compatibility)
  pricingProClick: () =>
    trackEvent('pricing_pro_click', {
      event_category: 'pricing',
    }),
  stepView: (step: number) =>
    trackEvent('step_view', {
      event_category: 'engagement',
      step_number: step,
    }),
};
