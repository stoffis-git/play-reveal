import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  // Hardcode for production (GitHub Pages doesn't support .env files)
  // Fallback to env vars for local development
  const url = import.meta.env.VITE_SUPABASE_URL || 
    'https://iurtsyxazaumqfwkhikt.supabase.co';
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
    'sb_publishable_FzD0QQcdLeS-CB9Mk-Dgdg_DIoLSitl';

  cachedClient = createClient(url, publishableKey);
  return cachedClient;
}


