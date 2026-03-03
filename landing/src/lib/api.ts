/**
 * API client for SheetLink backend
 */

import { URLS } from './constants';

const API_BASE_URL = URLS.api;

interface CheckoutSessionResponse {
  session_id: string;
  url: string;
}

interface ApiError {
  detail: string;
}

/**
 * Create a Stripe checkout session for subscription
 * @param plan - "monthly" or "annual"
 * @param token - JWT token for authentication
 * @returns Checkout session with URL to redirect user to
 */
export async function createCheckoutSession(
  plan: 'monthly' | 'annual',
  token: string
): Promise<CheckoutSessionResponse> {
  const response = await fetch(`${API_BASE_URL}/subscriptions/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ plan }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create a Stripe customer portal session for managing subscription
 * @param returnUrl - URL to return to after managing subscription
 * @param token - JWT token for authentication
 * @returns Portal session with URL to redirect user to
 */
export async function createPortalSession(
  returnUrl: string,
  token: string
): Promise<{ url: string }> {
  const response = await fetch(`${API_BASE_URL}/subscriptions/portal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ return_url: returnUrl }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
