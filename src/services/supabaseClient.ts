import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

// Hardcoded for production deployment (publishable keys are safe to expose)
const SUPABASE_URL = 'https://iurtsyxazaumqfwkhikt.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_FzD0QQcdLeS-CB9Mk-Dgdg_DIoLSitl';

export function getSupabaseClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  // Try environment variables first (for local development), fallback to hardcoded values
  const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || SUPABASE_URL;
  const publishableKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) || SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error('Missing Supabase configuration');
  }

  cachedClient = createClient(url, publishableKey);
  return cachedClient;
}


