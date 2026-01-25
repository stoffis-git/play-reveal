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

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'supabaseClient.ts:11',message:'Supabase client initialization',data:{hasUrl:!!url,hasKey:!!publishableKey,urlLength:url?.length,keyLength:publishableKey?.length,urlPrefix:url?.substring(0,20),keyPrefix:publishableKey?.substring(0,20)},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H1'})}).catch(()=>{});
  // #endregion

  if (!url || !publishableKey) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'supabaseClient.ts:15',message:'Missing env vars error',data:{url:url,key:publishableKey},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY');
  }

  cachedClient = createClient(url, publishableKey);
  return cachedClient;
}


