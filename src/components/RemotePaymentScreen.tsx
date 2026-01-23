import { useEffect } from 'react';
import { useGame } from '../store';
import { Menu } from './Menu';

export function RemotePaymentScreen() {
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (state.hasPaid) {
      dispatch({ type: 'NAVIGATE_TO', screen: 'remoteSetup' });
    }
  }, [dispatch, state.hasPaid]);

  const handleUnlock = () => {
    try {
      localStorage.setItem('reveal-payment-initiated', 'true');
      localStorage.setItem('reveal-payment-initiated-time', Date.now().toString());
      localStorage.setItem('reveal-payment-purpose', 'remote');
    } catch {
      // ignore
    }

    const polarCheckoutUrl = `https://buy.polar.sh/polar_cl_nJ2vx1fXaiRId4N9pKEu6Gg92x9SCbZhcJy6n0hhaJu`;
    window.location.href = polarCheckoutUrl;
  };

  const handleBack = () => {
    dispatch({ type: 'NAVIGATE_TO', screen: 'landing' });
  };

  return (
    <div className="container animate-slide-up" style={{ paddingBottom: '10px' }}>
      <div className="game-header" style={{ marginBottom: '0px' }}>
        <Menu buttonPosition="inline" />
        <div style={{ flex: 1 }}></div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📱✨</div>
        <h2 style={{ marginBottom: '8px' }}>Play Remotely</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto 24px' }}>
          Unlock premium to play live with your partner on separate devices, and continue straight to Round 2 after Round 1.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, var(--partner1-light) 0%, var(--partner2-light) 100%)',
          borderRadius: '16px',
          padding: '20px',
          maxWidth: '420px',
          margin: '0 auto 20px',
          boxShadow: 'var(--card-shadow)',
          border: '2px solid var(--partner1)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            PREMIUM UNLOCK
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--partner1) 0%, var(--partner2) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            $4.99
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            One-time payment • No subscription
          </div>
        </div>

        <button className="btn btn--accent btn--full" onClick={handleUnlock} style={{ maxWidth: '420px', margin: '0 auto 12px' }}>
          ✨ Unlock Premium — $4.99
        </button>
        <button className="btn btn--ghost" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}


