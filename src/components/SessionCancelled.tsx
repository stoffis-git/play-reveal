import { useGame } from '../store';
import { Menu } from './Menu';

export function SessionCancelled() {
  const { dispatch } = useGame();

  const handleReturnHome = () => {
    dispatch({ type: 'NAVIGATE_TO', screen: 'landing' });
  };

  return (
    <div className="container animate-slide-up" style={{ paddingBottom: '10px' }}>
      <div className="game-header" style={{ marginBottom: '0px' }}>
        <Menu buttonPosition="inline" />
        <div style={{ flex: 1 }}></div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🚫</div>
        <h2 style={{ marginBottom: '12px' }}>Session Cancelled</h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          maxWidth: '380px', 
          margin: '0 auto 32px',
          fontSize: '1rem',
          lineHeight: '1.5'
        }}>
          The host has cancelled this invitation. You can explore the app or start your own game.
        </p>

        <button 
          className="btn btn--primary btn--full" 
          onClick={handleReturnHome}
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}


