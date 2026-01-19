import { useState } from 'react';
import { useGame } from '../store';

export function Menu({ buttonPosition }: { buttonPosition?: 'inline' | 'fixed' }) {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useGame();

  const handleRestart = () => {
    if (confirm('Are you sure you want to restart? All progress will be lost.')) {
      dispatch({ type: 'RESET_GAME' });
      setIsOpen(false);
    }
  };

  const handleHome = () => {
    dispatch({ type: 'NAVIGATE_TO', screen: 'landing' });
    setIsOpen(false);
  };

  const handleReplayRound1 = () => {
    if (confirm('Start Round 1 again? This will reset both rounds.')) {
      dispatch({ type: 'REPLAY_ROUND', round: 1 });
      setIsOpen(false);
    }
  };

  const handleReplayRound2 = () => {
    if (state.round1Complete) {
      if (confirm('Start Round 2 again with new personalized questions?')) {
        dispatch({ type: 'REPLAY_ROUND', round: 2 });
        setIsOpen(false);
      }
    }
  };

  // Don't show menu on landing page
  if (state.currentScreen === 'landing') return null;

  const burgerButton = (
    <button 
      className={`menu-burger ${buttonPosition === 'inline' ? 'menu-burger--inline' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Menu"
    >
      <span className={`menu-burger__line ${isOpen ? 'menu-burger__line--open' : ''}`}></span>
      <span className={`menu-burger__line ${isOpen ? 'menu-burger__line--open' : ''}`}></span>
      <span className={`menu-burger__line ${isOpen ? 'menu-burger__line--open' : ''}`}></span>
    </button>
  );

  return (
    <>
      {/* Burger button - render inline or fixed based on prop */}
      {buttonPosition === 'inline' ? burgerButton : (
        <>
          {burgerButton}
        </>
      )}

      {/* Menu overlay */}
      {isOpen && (
        <div className="menu-overlay" onClick={() => setIsOpen(false)}>
          <div className="menu-panel" onClick={e => e.stopPropagation()}>
            <div className="menu-panel__header">
              <span>💕</span> Menu
            </div>
            <nav className="menu-panel__nav">
              <button className="menu-panel__item" onClick={handleHome}>
                🏠 Back to Start
              </button>
              
              {/* Show replay options for paid users */}
              {state.hasPaid && (
                <>
                  <div className="menu-panel__divider"></div>
                  <div className="menu-panel__section-label">Play Again</div>
                  <button className="menu-panel__item" onClick={handleReplayRound1}>
                    🔄 Replay Round 1
                  </button>
                  <button 
                    className="menu-panel__item" 
                    onClick={handleReplayRound2}
                    disabled={!state.round1Complete}
                    style={{ opacity: state.round1Complete ? 1 : 0.5 }}
                  >
                    🔄 Replay Round 2
                  </button>
                </>
              )}
              
              <div className="menu-panel__divider"></div>
              <button className="menu-panel__item menu-panel__item--danger" onClick={handleRestart}>
                🗑️ Reset Everything
              </button>
            </nav>
            <div className="menu-panel__footer">
              {state.hasPaid && <span className="menu-panel__badge">✨ Premium</span>}
              <span>Reveal</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
