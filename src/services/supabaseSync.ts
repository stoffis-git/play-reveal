import type { RealtimeChannel, RealtimeChannelSendResponse } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabaseClient';

export type RemoteMessage =
  | { type: 'action'; payload: unknown }
  | { type: 'session_paid'; payload: { paid: true } }
  | { type: 'session_cancelled'; payload: { cancelled: true } }
  | { type: 'presence'; payload: { player: 1 | 2 } };

export type RemoteConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export class SupabaseSync {
  private channel: RealtimeChannel | null = null;

  async connect(params: {
    sessionId: string;
    onMessage: (msg: RemoteMessage) => void;
    onStatus?: (status: RemoteConnectionStatus) => void;
  }): Promise<void> {
    let supabase;
    try {
      supabase = getSupabaseClient();
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'supabaseSync.ts:23',message:'Supabase client creation failed',data:{error:error instanceof Error?error.message:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H1'})}).catch(()=>{});
      // #endregion
      params.onStatus?.('error');
      return;
    }

    // Clean up any previous channel
    if (this.channel) {
      await this.disconnect();
    }

    params.onStatus?.('connecting');

    const channel = supabase.channel(`reveal:${params.sessionId}`, {
      config: { broadcast: { self: false } }
    });

    channel.on('broadcast', { event: 'action' }, ({ payload }) => {
      params.onMessage({ type: 'action', payload });
    });

    channel.on('broadcast', { event: 'session_paid' }, ({ payload }) => {
      params.onMessage({ type: 'session_paid', payload: payload as { paid: true } });
    });

    channel.on('broadcast', { event: 'presence' }, ({ payload }) => {
      params.onMessage({ type: 'presence', payload: payload as { player: 1 | 2 } });
    });

    channel.on('broadcast', { event: 'session_cancelled' }, ({ payload }) => {
      params.onMessage({ type: 'session_cancelled', payload: payload as { cancelled: true } });
    });

    this.channel = channel;

    await new Promise<void>((resolve) => {
      channel.subscribe((status) => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'supabaseSync.ts:75',message:'Channel subscription status',data:{status:status,sessionId:params.sessionId},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H1'})}).catch(()=>{});
        // #endregion
        if (status === 'SUBSCRIBED') {
          params.onStatus?.('connected');
          resolve();
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          params.onStatus?.('error');
          resolve();
        } else if (status === 'CLOSED') {
          params.onStatus?.('disconnected');
        }
      });
    });
  }

  async disconnect(): Promise<void> {
    if (!this.channel) return;
    const channel = this.channel;
    this.channel = null;
    await channel.unsubscribe();
  }

  async sendAction(payload: unknown): Promise<RealtimeChannelSendResponse | null> {
    if (!this.channel) return null;
    return await this.channel.send({ type: 'broadcast', event: 'action', payload });
  }

  async sendSessionPaid(): Promise<RealtimeChannelSendResponse | null> {
    if (!this.channel) return null;
    return await this.channel.send({ type: 'broadcast', event: 'session_paid', payload: { paid: true } });
  }

  async sendPresence(player: 1 | 2): Promise<RealtimeChannelSendResponse | null> {
    if (!this.channel) return null;
    return await this.channel.send({ type: 'broadcast', event: 'presence', payload: { player } });
  }

  async sendSessionCancelled(): Promise<RealtimeChannelSendResponse | null> {
    if (!this.channel) return null;
    return await this.channel.send({ type: 'broadcast', event: 'session_cancelled', payload: { cancelled: true } });
  }
}


