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
  // Page view events (automatic via router, but can be called manually)
  pageView: (pageName: string, path?: string) =>
    trackEvent('page_view', {
      page_title: pageName,
      page_path: path || window.location.pathname,
    }),

  // Beta signup events
  betaSignupFormView: (page: string) =>
    trackEvent('view_beta_signup_form', {
      event_category: 'engagement',
      page_location: page,
    }),
  betaSignupStart: (page: string) =>
    trackEvent('beta_signup_start', {
      event_category: 'engagement',
      page_location: page,
    }),
  betaSignupSuccess: (page: string) =>
    trackEvent('beta_signup_success', {
      event_category: 'conversion',
      page_location: page,
      value: 1,
    }),
  betaSignupError: (error: string, page: string) =>
    trackEvent('beta_signup_error', {
      event_category: 'error',
      error_message: error,
      page_location: page,
    }),

  // Download & installation events
  downloadExtensionClick: (location: string) =>
    trackEvent('download_extension', {
      event_category: 'engagement',
      button_location: location,
    }),

  // CTA clicks
  ctaInstallClick: (location: string) =>
    trackEvent('cta_install_click', {
      event_category: 'cta',
      button_location: location,
    }),
  ctaGetStartedClick: (location: string) =>
    trackEvent('cta_get_started_click', {
      event_category: 'cta',
      button_location: location,
    }),
  ctaJoinBetaClick: (location: string) =>
    trackEvent('cta_join_beta_click', {
      event_category: 'cta',
      button_location: location,
    }),

  // Navigation
  githubClick: (location: string) =>
    trackEvent('github_click', {
      event_category: 'navigation',
      link_location: location,
    }),
  footerLinkClick: (link: string) =>
    trackEvent('footer_link_click', {
      event_category: 'navigation',
      link_text: link,
    }),
  headerNavClick: (page: string) =>
    trackEvent('header_nav_click', {
      event_category: 'navigation',
      destination: page,
    }),

  // External links
  externalLinkClick: (url: string, text: string) =>
    trackEvent('external_link_click', {
      event_category: 'navigation',
      link_url: url,
      link_text: text,
    }),

  // Feedback
  feedbackEmailClick: (location: string) =>
    trackEvent('feedback_email_click', {
      event_category: 'engagement',
      button_location: location,
    }),
};
