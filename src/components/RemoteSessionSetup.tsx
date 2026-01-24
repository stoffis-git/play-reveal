import { useMemo, useState } from 'react';
import { useGame } from '../store';
import { hasRemotePayment, recordPayment } from '../services/paymentTracking';
import { Menu } from './Menu';

function generateSessionCode(length = 6): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

export function RemoteSessionSetup() {
  const { state, dispatch } = useGame();
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isJoiner = state.remotePlayerId === 2;

  const shareUrl = useMemo(() => {
    if (!state.remoteSessionId) return null;
    return `${window.location.origin}/play/${state.remoteSessionId}`;
  }, [state.remoteSessionId]);

  const handleCreateSession = async () => {
    setError(null);

    // If user is premium (local) but we haven't recorded to Supabase yet, record best-effort.
    if (state.hasPaid) {
      try {
        await recordPayment({ checkoutId: localStorage.getItem('reveal-checkout-id') });
      } catch {
        // ignore
      }
    }

    const ok = state.hasPaid ? true : await hasRemotePayment();
    if (!ok) {
      dispatch({ type: 'NAVIGATE_TO', screen: 'remotePayment' });
      return;
    }

    const code = generateSessionCode(6);
    dispatch({ type: 'SELECT_MODE', mode: 'remote' });
    dispatch({ type: 'SET_REMOTE_SESSION', sessionId: code, playerId: 1 });
    dispatch({ type: 'SET_REMOTE_SESSION_PAID', paid: true });
  };

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setError('Could not copy link. Please copy it manually.');
    }
  };

  const handleCancelSession = () => {
    dispatch({ type: 'CANCEL_REMOTE_SESSION' });
  };

  const handleLookAround = () => {
    // Navigate to landing but keep session active
    dispatch({ type: 'NAVIGATE_TO', screen: 'landing' });
  };

  const handleBack = () => {
    // For Player 2 (joiner), this cancels and goes back
    dispatch({ type: 'SET_REMOTE_SESSION', sessionId: null, playerId: null });
    dispatch({ type: 'SELECT_MODE', mode: 'local' });
    dispatch({ type: 'NAVIGATE_TO', screen: 'landing' });
  };

  return (
    <div className="container animate-slide-up" style={{ paddingBottom: '10px' }}>
      <div className="game-header" style={{ marginBottom: '0px' }}>
        <Menu buttonPosition="inline" />
        <div style={{ flex: 1 }}></div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔗</div>
        <h2 style={{ marginBottom: '8px' }}>Remote Session</h2>

        {!state.remoteSessionId && (
          <>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto 18px' }}>
              Create a link and invite your partner to join from their phone.
            </p>
            <button className="btn btn--accent btn--full" style={{ maxWidth: '420px', margin: '0 auto 12px' }} onClick={handleCreateSession}>
              Create invite link
            </button>
            <button className="btn btn--ghost" onClick={handleBack}>
              Back
            </button>
          </>
        )}

        {state.remoteSessionId && (
          <>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '18px',
              maxWidth: '420px',
              margin: '0 auto 16px',
              boxShadow: 'var(--card-shadow)'
            }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                SESSION CODE
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--partner1)', letterSpacing: '2px' }}>
                {state.remoteSessionId}
              </div>

              {shareUrl && (
                <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Share this link with your partner:
                  <div style={{
                    marginTop: '6px',
                    padding: '10px 12px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '10px',
                    wordBreak: 'break-all'
                  }}>
                    {shareUrl}
                  </div>
                </div>
              )}
            </div>

            {shareUrl && (
              <button className="btn btn--secondary btn--full" style={{ maxWidth: '420px', margin: '0 auto 10px' }} onClick={handleCopyLink}>
                {copied ? 'Copied!' : 'Copy invite link'}
              </button>
            )}

            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px' }}>
              {state.isRemoteConnected ? (
                <span style={{ color: 'var(--match-green)', fontWeight: 700 }}>Connected</span>
              ) : (
                <span>Waiting for partner to join…</span>
              )}
            </div>

            {/* Joiners are taken here via /play/{code}. Hosts just wait; game will start automatically when partner joins. */}
            {isJoiner && (
              <>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>
                  You're connected as Partner 2. Your partner will start the game.
                </p>
                <button className="btn btn--ghost" style={{ marginTop: '16px' }} onClick={handleBack}>
                  Leave session
                </button>
              </>
            )}

            {!isJoiner && (
              <>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '12px', maxWidth: '380px', margin: '12px auto 0' }}>
                  You can explore the app while waiting. You'll be automatically pulled into Round 1 when {state.partner2Name || 'your partner'} joins.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px', maxWidth: '420px', margin: '20px auto 0' }}>
                  <button 
                    className="btn btn--secondary btn--full" 
                    onClick={handleLookAround}
                    style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                  >
                    Look around, while waiting for {state.partner2Name || 'your partner'}
                  </button>
                  <button 
                    className="btn btn--ghost" 
                    onClick={handleCancelSession}
                  >
                    Cancel Session
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {error && (
          <p style={{ color: 'var(--partner2)', fontSize: '0.875rem', marginTop: '12px' }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}


