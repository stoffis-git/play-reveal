import type { RealtimeChannel, RealtimeChannelSendResponse } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabaseClient';

export type RemoteMessage =
  | { type: 'action'; payload: unknown }
  | { type: 'session_paid'; payload: { paid: true } }
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
    } catch {
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

    this.channel = channel;

    await new Promise<void>((resolve) => {
      channel.subscribe((status) => {
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
}


