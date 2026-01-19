import { useState, useEffect } from 'react';
import { useGame } from '../store';

const STORAGE_KEY = 'relationship-game-names';

export function LandingPage() {
  const { dispatch } = useGame();
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const [error, setError] = useState('');

  // Load names from localStorage on mount
  useEffect(() => {
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
  }, []);

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
    if (!isValid) {
      if (partner1Name.trim().toLowerCase() === partner2Name.trim().toLowerCase()) {
        setError('Names must be different');
      }
      return;
    }
    dispatch({
      type: 'START_GAME',
      partner1Name: partner1Name.trim(),
      partner2Name: partner2Name.trim()
    });
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="animate-slide-up">
        {/* Hero */}
        <div className="text-center mb-8">
          <div style={{ 
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
              color: '#8B5CF6',
              fontSize: '3rem'
            }}>
              Reveal
            </h1>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', fontWeight: '500' }}>
            Discover how in-sync you really are
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '8px auto 0' }}>
            The game for couples & relationships
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
            <label className="input-label">Partner 1</label>
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
          <button
            className="btn btn--primary btn--full"
            onClick={handleStart}
            disabled={!isValid}
          >
            Start Game
          </button>
          <p style={{ 
            fontSize: '0.75rem', 
            color: 'var(--text-muted)', 
            marginTop: '8px',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            Free to play
          </p>
        </div>

        {/* Test Payment Button */}
        <div style={{ 
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <button
            className="btn btn--accent btn--full"
            onClick={() => dispatch({ type: 'NAVIGATE_TO', screen: 'paywall' })}
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

        {/* How it works */}
        <div style={{ marginBottom: '32px' }}>
          <h3 className="text-center mb-4" style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
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

