import { useState, useEffect } from 'react';
import { useGame } from '../store';

export function RemoteSessionOverlay() {
  const { state, dispatch } = useGame();
  const [isCompact, setIsCompact] = useState(false);

  // Only show for host with active session not yet connected
  const shouldShow = 
    state.remoteSessionId && 
    state.remotePlayerId === 1 && 
    !state.isRemoteConnected;

  // Compress after 1.5 seconds
  useEffect(() => {
    if (shouldShow) {
      const timer = setTimeout(() => setIsCompact(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsCompact(false);
    }
  }, [shouldShow]);

  if (!shouldShow) return null;

  const handleClick = () => {
    dispatch({ type: 'NAVIGATE_TO', screen: 'remoteSetup' });
  };

  // Full-width banner design
  if (!isCompact) {
    return (
      <div 
        onClick={handleClick}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 1000,
          background: 'linear-gradient(135deg, var(--partner1-light) 0%, var(--partner2-light) 100%)',
          borderRadius: '16px',
          padding: '16px 20px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '2px solid var(--partner1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'all 0.3s ease',
          animation: 'slideDown 0.3s ease-out'
        }}
      >
        <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>⏳</div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '2px' }}>
            Waiting for {state.partner2Name || 'your partner'} to join...
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Tap to view session
          </div>
        </div>
        <div style={{ fontSize: '1.2rem', flexShrink: 0 }}>→</div>
      </div>
    );
  }

  // Compact pill design with pulsating indicator
  return (
    <div 
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 1000,
        background: 'linear-gradient(135deg, var(--partner1-light) 0%, var(--partner2-light) 100%)',
        borderRadius: '24px',
        padding: '10px 16px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: '2px solid var(--partner1)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.5s ease',
        animation: 'compressFromLeft 0.5s ease-out'
      }}
    >
      <div style={{ 
        fontSize: '0.85rem', 
        fontWeight: '600',
        whiteSpace: 'nowrap'
      }}>
        ⏳ Waiting
      </div>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'var(--partner1)',
        animation: 'pulse 2s ease-in-out infinite'
      }} />
    </div>
  );
}


