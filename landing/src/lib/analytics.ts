// Google Analytics 4 event tracking

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Predefined events
export const trackAddToChromeClick = (location: string) => {
  trackEvent('click_add_to_chrome', {
    location,
  });
};

export const trackUpgradeClick = (plan: string, billingCycle: string) => {
  trackEvent('click_upgrade', {
    plan,
    billing_cycle: billingCycle,
  });
};

export const trackComparisonPageClick = (competitor: string) => {
  trackEvent('click_comparison_page', {
    competitor,
  });
};

export const trackFooterLinkClick = (linkName: string) => {
  trackEvent('click_footer_link', {
    link_name: linkName,
  });
};

export const trackGithubClick = (location: string) => {
  trackEvent('click_github', {
    location,
  });
};

export const trackHeaderNavClick = (navItem: string) => {
  trackEvent('click_header_nav', {
    nav_item: navItem,
  });
};

export const trackCtaClick = (location: string) => {
  trackEvent('click_cta', {
    location,
  });
};

export const trackBetaSignupSuccess = (email: string) => {
  trackEvent('beta_signup_success', {
    email,
  });
};

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-B4RLTK3194', {
      page_path: url,
    });
  }
};
