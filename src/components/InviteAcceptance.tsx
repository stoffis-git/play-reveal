import { useGame } from '../store';
import { Menu } from './Menu';

export function InviteAcceptance() {
  const { state, dispatch } = useGame();

  const handleAccept = () => {
    dispatch({ type: 'ACCEPT_REMOTE_INVITE' });
  };

  const handleDecline = () => {
    dispatch({ type: 'DECLINE_REMOTE_INVITE' });
  };

  // If game has started, we're about to navigate to round1
  // This component will be unmounted soon
  const gameStarted = state.round1Cards && state.round1Cards.length > 0;

  return (
    <div className="container animate-slide-up" style={{ paddingBottom: '10px' }}>
      <div className="game-header" style={{ marginBottom: '0px' }}>
        <Menu buttonPosition="inline" />
        <div style={{ flex: 1 }}></div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💌</div>
        <h2 style={{ marginBottom: '8px' }}>You're Invited!</h2>
        
        {!gameStarted && (
          <>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '380px', margin: '16px auto 32px' }}>
              {state.partner1Name || 'Your partner'} invited you to play Reveal together.
            </p>

            <div style={{ maxWidth: '420px', margin: '0 auto' }}>
              <button 
                className="btn btn--accent btn--full" 
                onClick={handleAccept}
                style={{ marginBottom: '12px' }}
              >
                Accept & Start Game
              </button>
              <button 
                className="btn btn--ghost" 
                onClick={handleDecline}
              >
                Decline Invitation
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

