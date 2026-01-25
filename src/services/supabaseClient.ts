import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  // Use environment variables if available (for local dev), otherwise use hardcoded production values
  // These are publishable keys, safe to expose in client-side code
  const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || 
    'https://iurtsyxazaumqfwkhikt.supabase.co';
  const publishableKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) || 
    'sb_publishable_FzD0QQcdLeS-CB9Mk-Dgdg_DIoLSitl';

  if (!url || !publishableKey) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY');
  }

  cachedClient = createClient(url, publishableKey);
  return cachedClient;
}


