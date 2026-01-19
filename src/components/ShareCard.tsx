import { useRef } from 'react';
import { useGame, getMatchCount } from '../store';
import { Menu } from './Menu';

export function ShareCard() {
  const { state, dispatch } = useGame();
  const shareRef = useRef<HTMLDivElement>(null);
  
  const round1Matches = getMatchCount(state.round1Cards);
  const round2Matches = getMatchCount(state.round2Cards);
  const totalMatches = round1Matches + round2Matches;
  const hasRound2 = state.round2Cards.length > 0;
  const displayScore = hasRound2 ? totalMatches : round1Matches;
  const displayTotal = hasRound2 ? 30 : 15;

  const handleDownload = async () => {
    // In a production app, you'd use html2canvas or a server-side renderer
    // For now, we'll create a simple text-based share
    const text = `We got ${displayScore}/${displayTotal} on Reveal! 💕\n\nTry it yourself: [URL]`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Reveal - The Game for Couples',
          text: text
        });
      } catch (err) {
        // User cancelled or error
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy');
      }
    }
  };

  const handleCopyLink = async () => {
    const text = `We got ${displayScore}/${displayTotal} on Reveal! 💕`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy');
    }
  };

  return (
    <div className="container animate-slide-up" style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      {/* Header with menu */}
      <div className="game-header" style={{ marginBottom: '24px' }}>
        <Menu buttonPosition="inline" />
        <div style={{ flex: 1 }}></div>
      </div>
      <div className="text-center mb-6">
        <h2>Share Your Score</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Let the world know how in-sync you are!
        </p>
      </div>

      {/* Preview card */}
      <div 
        ref={shareRef}
        className="share-preview"
      >
        <div style={{ 
          fontSize: '3rem', 
          marginBottom: '8px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }}>
          💕
        </div>
        <div className="share-preview__score">
          {displayScore}/{displayTotal}
        </div>
        <div className="share-preview__text">
          in sync on Reveal
        </div>
        <div className="share-preview__logo">
          playreveal.com
        </div>
      </div>

      {/* Share options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <button
          className="btn btn--primary btn--full"
          onClick={handleDownload}
        >
          Share 📤
        </button>
        <button
          className="btn btn--secondary btn--full"
          onClick={handleCopyLink}
        >
          Copy Text 📋
        </button>
      </div>

      {/* Back button */}
      <button
        className="btn btn--ghost"
        onClick={() => dispatch({ type: 'NAVIGATE_TO', screen: hasRound2 ? 'finalResults' : 'round1Results' })}
      >
        ← Back to Results
      </button>
    </div>
  );
}

