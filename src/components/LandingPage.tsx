import { useState, useEffect } from 'react';
import { useGame } from '../store';

const STORAGE_KEY = 'relationship-game-names';

export function LandingPage() {
  const { state, dispatch } = useGame();
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const [error, setError] = useState('');

  const showTestPayment = false;

  // Check if there's existing progress
  const hasProgress = state.sessionId && (
    state.round1Cards.some(card => card.state !== 'faceDown') ||
    state.round2Cards.some(card => card.state !== 'faceDown')
  );

  // Scroll to top on mount/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load names from localStorage on mount, or from game state if available
  useEffect(() => {
    if (state.partner1Name && state.partner2Name) {
      setPartner1Name(state.partner1Name);
      setPartner2Name(state.partner2Name);
    } else {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const { partner1, partner2 } = JSON.parse(stored);
          if (partner1) setPartner1Name(partner1);
          if (partner2) setPartner2Name(partner2);
        }
      } catch {
        // Ignore parse errors
      }
    }
  }, [state.partner1Name, state.partner2Name]);

  // Save names to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        partner1: partner1Name,
        partner2: partner2Name
      }));
    } catch {
      // Ignore storage errors
    }
  }, [partner1Name, partner2Name]);

  const isValid =
    partner1Name.trim().length >= 1 &&
    partner1Name.trim().length <= 20 &&
    partner2Name.trim().length >= 1 &&
    partner2Name.trim().length <= 20 &&
    partner1Name.trim().toLowerCase() !== partner2Name.trim().toLowerCase();

  const handleStart = () => {
    if (hasProgress) {
      // Continue existing game
      dispatch({ type: 'CONTINUE_GAME' });
      return;
    }

    // Start new game
    if (!isValid) {
      if (partner1Name.trim().toLowerCase() === partner2Name.trim().toLowerCase()) {
        setError('Names must be different');
      }
      return;
    }
    dispatch({
      type: 'SELECT_MODE',
      mode: 'local'
    });
    dispatch({
      type: 'START_GAME',
      partner1Name: partner1Name.trim(),
      partner2Name: partner2Name.trim()
    });
  };

  const handleRemote = () => {
    if (!isValid) {
      if (partner1Name.trim().toLowerCase() === partner2Name.trim().toLowerCase()) {
        setError('Names must be different');
      }
      return;
    }

    dispatch({
      type: 'SET_PARTNER_NAMES',
      partner1Name: partner1Name.trim(),
      partner2Name: partner2Name.trim()
    });
    dispatch({ type: 'SELECT_MODE', mode: 'remote' });

    // If user came via /play/{code}, they're joining as player 2 and should not pay.
    if (state.remoteSessionId && state.remotePlayerId === 2) {
      dispatch({ type: 'NAVIGATE_TO', screen: 'remoteSetup' });
      return;
    }

    // Host must be premium before creating a session.
    dispatch({ type: 'NAVIGATE_TO', screen: state.hasPaid ? 'remoteSetup' : 'remotePayment' });
  };

  const handleSendReminder = async () => {
    const url = window.location.origin;
    const text = `Let\u2019s play this together later: Reveal \u2013 the game for couples.\n\nWhen we\u2019re both free, open this on one phone and we\u2019ll play together.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Reveal \u2013 Game for Couples',
          text,
          url
        });
        return;
      }
    } catch {
      // Ignore share errors and fall through to clipboard fallback
    }

    try {
      await navigator.clipboard.writeText(text);
      alert('Reminder text copied. Paste it into your favorite chat.');
    } catch {
      alert('Could not copy. Please copy this link manually: ' + url);
    }
  };

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        maxHeight: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '24px 16px 140px',
        boxSizing: 'border-box'
      }}
    >
      <div className="animate-slide-up">
        {/* Remote Session Waiting Indicator */}
        {state.gameMode === 'remote' && state.remoteSessionId && state.remotePlayerId === 1 && !state.isRemoteConnected && (
          <div 
            onClick={() => dispatch({ type: 'NAVIGATE_TO', screen: 'remoteSetup' })}
            style={{
              background: 'linear-gradient(135deg, var(--partner1-light) 0%, var(--partner2-light) 100%)',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '20px',
              cursor: 'pointer',
              boxShadow: 'var(--card-shadow)',
              border: '2px solid var(--partner1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'var(--card-shadow)';
            }}
          >
            <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>⏳</div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '2px' }}>
                Waiting for {state.partner2Name || 'your partner'} to join...
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Tap to view session
              </div>
            </div>
            <div style={{ fontSize: '1.2rem', flexShrink: 0 }}>→</div>
          </div>
        )}

        {/* Hero */}
        <div className="text-center mb-8">
          <div style={{ 
            marginTop: '15px',
            marginBottom: '16px', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px'
          }}>
            <img 
              src="/reveal_icon.png" 
              alt="Reveal Logo" 
              style={{ 
                width: '80px', 
                height: '80px',
                objectFit: 'contain'
              }} 
            />
            <h1 style={{ 
              marginBottom: 0,
              color: '#E01D94',
              fontSize: '3rem'
            }}>
              Reveal
            </h1>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', fontWeight: '500' }}>
            Discover how in-sync you really are
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '8px auto 0' }}>
            A fun and insightful memory card-style game for couples & relationships..
          </p>
        </div>

        {/* Form */}
        <div style={{ 
          background: 'white', 
          borderRadius: '24px', 
          padding: '32px', 
          boxShadow: 'var(--card-shadow)',
          marginBottom: '32px'
        }}>
          <div className="input-group">
            <label className="input-label">Partner 1 (You)</label>
            <input
              type="text"
              className="input"
              placeholder="Enter first name"
              value={partner1Name}
              onChange={(e) => {
                setPartner1Name(e.target.value);
                setError('');
              }}
              maxLength={20}
            />
          </div>
          <div className="input-group" style={{ marginBottom: error ? '8px' : '24px' }}>
            <label className="input-label">Partner 2</label>
            <input
              type="text"
              className="input"
              placeholder="Enter first name"
              value={partner2Name}
              onChange={(e) => {
                setPartner2Name(e.target.value);
                setError('');
              }}
              maxLength={20}
            />
          </div>
          {error && (
            <p style={{ color: 'var(--partner2)', fontSize: '0.875rem', marginBottom: '16px' }}>
              {error}
            </p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn--primary btn--full"
                onClick={handleStart}
                disabled={!hasProgress && !isValid}
              >
                {hasProgress ? '→ Continue Playing' : 'Play in Person'}
              </button>
            </div>
            {!hasProgress && (
              <div style={{ position: 'relative' }}>
                <button
                  className="btn btn--accent btn--full"
                  onClick={handleRemote}
                  disabled={!isValid}
                >
                  Play Remotely
                </button>
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'linear-gradient(135deg, var(--partner1) 0%, var(--partner2) 100%)',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                }}>
                  PREMIUM
                </span>
              </div>
            )}
          </div>
        </div>

        <div style={{ 
          marginTop: '24px', 
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontSize: '0.9rem', 
            color: 'var(--text-secondary)',
            fontWeight: '500',
            margin: 0
          }}>
            Your parnter is not around?
          </p>
        </div>
        <button
          className="btn btn--secondary btn--full"
          onClick={handleSendReminder}
          style={{ maxWidth: '300px', margin: '0 auto 24px', display: 'block' }}
        >
          Send to partner to play later
        </button>

        {/* Test Payment Button */}
        {showTestPayment && (
          <div style={{ 
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            <button
              className="btn btn--accent btn--full"
              onClick={() => dispatch({ type: 'NAVIGATE_TO', screen: 'round1Results' })}
              style={{
                maxWidth: '400px',
                margin: '0 auto',
                fontSize: '0.9rem',
                opacity: 0.8
              }}
            >
              ✨ Upgrade to Premium (Test Payment)
            </button>
            <p style={{ 
              fontSize: '0.75rem', 
              color: 'var(--text-muted)', 
              marginTop: '8px',
              fontStyle: 'italic'
            }}>
              Skip to payment for testing
            </p>
          </div>
        )}

        {/* How it works */}
        <div style={{ marginBottom: '32px' }}>
          <h3 className="text-center mb-4" style={{ fontSize: '1.35rem', color: 'var(--text-secondary)' }}>
            How it works
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { num: '1', text: 'Take turns answering 15 questions', icon: '🎴' },
              { num: '2', text: 'See where you sync (and differ!)', icon: '✨' },
              { num: '3', text: 'Get insights to spark conversation', icon: '💬' }
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'white',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
                <span style={{ color: 'var(--text-primary)' }}>{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            🔒 Private
          </span>
          <span style={{ margin: '0 12px' }}>•</span>
          <span>No signup required</span>
          <span style={{ margin: '0 12px' }}>•</span>
          <span>Takes 10 minutes</span>
        </div>
      </div>
    </div>
  );
}

