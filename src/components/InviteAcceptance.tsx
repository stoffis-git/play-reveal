import { useGame } from '../store';
import { Menu } from './Menu';

export function InviteAcceptance() {
  const { state, dispatch } = useGame();

  const handleAccept = () => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InviteAcceptance.tsx:8',message:'Accept button clicked',data:{currentScreen:state.currentScreen,remotePlayerId:state.remotePlayerId,remoteSessionId:state.remoteSessionId,gameMode:state.gameMode},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H2,H5'})}).catch(()=>{});
    // #endregion
    dispatch({ type: 'ACCEPT_REMOTE_INVITE' });
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InviteAcceptance.tsx:11',message:'Accept action dispatched',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H2,H5'})}).catch(()=>{});
    // #endregion
  };

  const handleDecline = () => {
    dispatch({ type: 'DECLINE_REMOTE_INVITE' });
  };

  return (
    <div className="container animate-slide-up" style={{ paddingBottom: '10px' }}>
      <div className="game-header" style={{ marginBottom: '0px' }}>
        <Menu buttonPosition="inline" />
        <div style={{ flex: 1 }}></div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💌</div>
        <h2 style={{ marginBottom: '8px' }}>You're Invited!</h2>
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
      </div>
    </div>
  );
}

