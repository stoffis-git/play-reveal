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
  const [hasShared, setHasShared] = useState(false); // Track if link was copied or sent

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
      setHasShared(true); // Mark as shared
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setError('Could not copy link. Please copy it manually.');
    }
  };

  const handleSendInvite = async () => {
    if (!shareUrl) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join me for Reveal',
          text: `Join me for a game of Reveal! Use this link: ${shareUrl}`,
          url: shareUrl
        });
        setHasShared(true); // Mark as shared
        return;
      }
    } catch (err) {
      // User cancelled or error - fall through to clipboard
      if ((err as Error).name !== 'AbortError') {
        // Only show error if it wasn't a cancellation
        console.error('Share failed:', err);
      } else {
        // User cancelled, don't mark as shared
        return;
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setHasShared(true); // Mark as shared
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Could not share link. Please copy it manually.');
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
    <div className="container animate-slide-up" style={{ paddingBottom: state.remoteSessionId && !isJoiner ? '180px' : '10px' }}>
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
                SESSION LINK
              </div>
              {shareUrl && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.9rem',
                      color: 'var(--text-primary)',
                      background: 'var(--bg-secondary)'
                    }}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                  <button
                    onClick={handleCopyLink}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      transition: 'color 0.2s, transform 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--partner1)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title={copied ? 'Copied!' : 'Copy link'}
                  >
                    {copied ? (
                      <span style={{ fontSize: '1.2rem' }}>✓</span>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </button>
                </div>
              )}

              {shareUrl && (
                <button 
                  className="btn btn--accent btn--full" 
                  onClick={handleSendInvite}
                  style={{ marginTop: '8px' }}
                >
                  Send Invite Link
                </button>
              )}
            </div>

            {/* Only show waiting message after link is copied or sent */}
            {hasShared && (
              <div style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '1.1rem', 
                marginTop: '16px',
                minHeight: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span 
                  style={{ 
                    animation: 'pulse 2s ease-in-out infinite',
                    fontWeight: 500
                  }}
                >
                  Waiting for {state.partner2Name || 'your partner'}
                </span>
              </div>
            )}

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
                {/* Cancel Session button - moved below waiting message */}
                <div style={{ marginTop: '32px' }}>
                  <button 
                    className="btn btn--full" 
                    onClick={handleCancelSession}
                    disabled={!state.remoteSessionId}
                    style={{ 
                      maxWidth: '420px',
                      margin: '0 auto',
                      background: 'white',
                      color: state.remoteSessionId ? '#DC2626' : 'var(--text-muted)',
                      border: '2px solid',
                      borderColor: state.remoteSessionId ? '#DC2626' : 'var(--border-color)',
                      fontWeight: '600',
                      cursor: state.remoteSessionId ? 'pointer' : 'not-allowed',
                      opacity: state.remoteSessionId ? 1 : 0.5
                    }}
                    onMouseEnter={(e) => {
                      if (state.remoteSessionId) {
                        e.currentTarget.style.background = '#FEE2E2';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    Cancel Session
                  </button>
                </div>
                
                {/* Back button - positioned at bottom */}
                <div style={{ 
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px',
                  paddingBottom: '80px',
                  background: 'linear-gradient(to top, var(--bg-primary) 80%, transparent)',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <button 
                    className="btn btn--full" 
                    onClick={handleLookAround}
                    style={{ 
                      maxWidth: '420px',
                      background: 'white',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--card-shadow)'
                    }}
                  >
                    Back
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


