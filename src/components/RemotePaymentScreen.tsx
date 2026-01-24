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
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✨</div>
        <h2 style={{ marginBottom: '8px' }}>Unlock Premium</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto 24px' }}>
          Get the complete Reveal experience with remote play, deeper insights, and full conversation starters.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, var(--partner1-light) 0%, var(--partner2-light) 100%)',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '420px',
          margin: '0 auto 20px',
          boxShadow: 'var(--card-shadow)',
          border: '2px solid var(--partner1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '4px',
              background: 'linear-gradient(135deg, var(--partner1) 0%, var(--partner2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Premium Includes
            </h3>
          </div>

          <div style={{ 
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              {[
                { icon: '📱', text: 'Remote play mode — connect live on separate devices' },
                { icon: '🎴', text: 'Round 2 with 15 tailored questions' },
                { icon: '📊', text: 'Complete relationship insights & analysis' }, 
                { icon: '💬', text: 'Full conversation starters with deep dives' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span style={{ textAlign: 'left' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            background: 'white',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '8px', textAlign: 'center' }}>
              PREMIUM UNLOCK
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 700,
              textAlign: 'center',
              background: 'linear-gradient(135deg, var(--partner1) 0%, var(--partner2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '4px'
            }}>
              $4.99
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              One-time payment • No subscription
            </div>
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


