import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

  if (!url || !publishableKey) {
    const error = 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY';
    console.error('[Supabase]', error, { hasUrl: !!url, hasKey: !!publishableKey });
    throw new Error(error);
  }

  console.log('[Supabase] Initializing client with URL:', url.substring(0, 30) + '...');
  cachedClient = createClient(url, publishableKey);
  return cachedClient;
}


