import { v4 as uuidv4 } from 'uuid';
import { getSupabaseClient } from './supabaseClient';

const DEVICE_ID_KEY = 'reveal-device-id';

export function getDeviceId(): string {
  try {
    const existing = localStorage.getItem(DEVICE_ID_KEY);
    if (existing) return existing;
    const next = uuidv4();
    localStorage.setItem(DEVICE_ID_KEY, next);
    return next;
  } catch {
    // Fallback: best-effort (won't persist if storage is blocked)
    return uuidv4();
  }
}

export async function recordPayment(params: { checkoutId?: string | null } = {}): Promise<void> {
  const deviceId = getDeviceId();
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch {
    return;
  }

  // Upsert so repeat returns / manual unlock doesn't error.
  await supabase
    .from('payments')
    .upsert(
      {
        device_id: deviceId,
        payment_timestamp: new Date().toISOString(),
        checkout_id: params.checkoutId ?? null,
        game_mode: 'remote'
      },
      { onConflict: 'device_id' }
    );
}

export async function hasRemotePayment(): Promise<boolean> {
  const deviceId = getDeviceId();
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch {
    return false;
  }

  const { data, error } = await supabase
    .from('payments')
    .select('device_id')
    .eq('device_id', deviceId)
    .maybeSingle();

  if (error) return false;
  return Boolean(data?.device_id);
}


