import { useEffect, useState } from 'react';
import { useGame } from '../store';
import { Menu } from './Menu';

export function PaymentSuccess() {
  const { state, dispatch } = useGame();
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Read checkout_id from localStorage (if available)
    let id: string | null = null;
    try {
      id = localStorage.getItem('reveal-checkout-id');
    } catch {
      // Ignore storage errors
    }
    
    if (id) {
      setCheckoutId(id);
    }

    let startRound2Timer: number | null = null;
    let paymentTimer: number | null = null;

    // If payment already marked as complete (from App.tsx auto-detection), skip processing
    if (state.hasPaid) {
      setIsProcessing(false);
      // Auto-start Round 2 immediately if cards aren't initialized
      if (state.round2Cards.length === 0) {
        startRound2Timer = setTimeout(() => {
          dispatch({ type: 'START_ROUND_2' });
        }, 1000);
      } else {
        // Round 2 already initialized, just navigate
        startRound2Timer = setTimeout(() => {
          dispatch({ type: 'NAVIGATE_TO', screen: 'round2' });
        }, 1000);
      }
    } else {
      // Complete the payment after a brief moment
      paymentTimer = setTimeout(() => {
        dispatch({ type: 'COMPLETE_PAYMENT' });
        setIsProcessing(false);
        
        // Automatically start Round 2 after showing success briefly (2 seconds total)
        startRound2Timer = setTimeout(() => {
          dispatch({ type: 'START_ROUND_2' });
        }, 2000);
      }, 1500);
    }

    return () => {
      if (paymentTimer) {
        clearTimeout(paymentTimer);
      }
      if (startRound2Timer) {
        clearTimeout(startRound2Timer);
      }
    };
  }, [dispatch, state.hasPaid, state.round2Cards.length]);

  const handleStartRound2 = () => {
    dispatch({ type: 'START_ROUND_2' });
  };

  return (
    <div className="container animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      {/* Header with menu */}
      <div className="game-header" style={{ marginBottom: '24px' }}>
        <Menu buttonPosition="inline" />
        <div style={{ flex: 1 }}></div>
      </div>
      {isProcessing ? (
        <>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>
            ✨
          </div>
          <h2 style={{ marginBottom: '16px' }}>Processing your payment...</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Just a moment while we unlock Round 2 for you.
          </p>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid var(--bg-secondary)',
            borderTopColor: 'var(--partner1)',
            borderRadius: '50%',
            margin: '24px auto',
            animation: 'spin 1s linear infinite'
          }} />
        </>
      ) : (
        <>
          <div style={{ 
            fontSize: '5rem', 
            marginBottom: '24px',
            animation: 'bounce 0.6s ease'
          }}>
            🎉
          </div>
          <h2 style={{ marginBottom: '8px', color: 'var(--match-green)' }}>
            Payment Successful!
          </h2>
          <p style={{ 
            color: 'var(--text-secondary)', 
            marginBottom: '32px',
            maxWidth: '300px',
            margin: '0 auto 32px'
          }}>
            Thank you, {state.partner1Name} & {state.partner2Name}!<br />
            Round 2 is now unlocked.
          </p>

          <div style={{
            background: 'linear-gradient(135deg, var(--partner1-light) 0%, var(--partner2-light) 100%)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px',
            maxWidth: '400px',
            margin: '0 auto 32px'
          }}>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, var(--partner1) 0%, var(--partner2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Round 2: Deep Dive
            </div>
            <p style={{ 
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              margin: 0
            }}>
              15 personalized questions based on your Round 1 answers
            </p>
          </div>

          <button
            className="btn btn--accent btn--full"
            onClick={handleStartRound2}
            style={{ maxWidth: '400px', margin: '0 auto' }}
          >
            🚀 Start Round 2
          </button>

          {checkoutId && (
            <p style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              marginTop: '24px'
            }}>
              Order ID: {checkoutId.slice(0, 20)}...
            </p>
          )}
        </>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

