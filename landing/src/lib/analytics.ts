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
