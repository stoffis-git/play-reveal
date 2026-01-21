import { useGame, getMatchCount, getThemeSummaries } from '../store';

export function ShareCard({ onClose }: { onClose?: () => void }) {
  const { state, dispatch } = useGame();
  
  const round1Matches = getMatchCount(state.round1Cards);
  const round2Matches = getMatchCount(state.round2Cards);
  const totalMatches = round1Matches + round2Matches;
  const hasRound2 = state.round2Cards.length > 0;
  const displayScore = hasRound2 ? totalMatches : round1Matches;
  const displayTotal = hasRound2 ? 30 : 15;
  const displayPercentage = Math.round((displayScore / displayTotal) * 100);

  const allCards = hasRound2 ? [...state.round1Cards, ...state.round2Cards] : state.round1Cards;
  const themeSummaries = getThemeSummaries(allCards);
  const topThemes = [...themeSummaries].sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 3);

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    dispatch({ type: 'NAVIGATE_TO', screen: hasRound2 ? 'finalResults' : 'round1Results' });
  };

  return (
    <div className="question-overlay" onClick={handleClose}>
      <div className="question-modal animate-modal-in" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: '6px' }}>Share your score</h2>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Take a screenshot of the tile below and share it in your favorite apps.
            </p>
          </div>
          <button
            className="btn btn--ghost"
            onClick={handleClose}
            style={{ padding: '6px 10px', minHeight: 'auto', lineHeight: 1 }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="share-preview" style={{ marginTop: '16px', position: 'relative' }}>
          <img
            src="/reveal_icon.png"
            alt="Reveal"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '48px',
              height: '48px',
              objectFit: 'contain'
            }}
          />
          <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '6px', textAlign: 'center' }}>Total match</div>
          <div className="share-preview__score" style={{ fontSize: '3.5rem', lineHeight: 1, textAlign: 'center' }}>
            {displayPercentage}%
          </div>
          <div className="share-preview__text" style={{ marginTop: '8px', textAlign: 'center' }}>
            {displayScore}/{displayTotal} in sync on Reveal
          </div>

          <div style={{ marginTop: '16px', width: '100%', textAlign: 'left' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.95, marginBottom: '8px' }}>Top 3 themes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {topThemes.map(t => (
                <div
                  key={t.theme}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.9rem'
                  }}
                >
                  <span style={{ opacity: 0.95 }}>{t.displayName}</span>
                  <span style={{ fontWeight: 800 }}>{t.matchPercentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="share-preview__logo" style={{ marginTop: '18px' }}>
            play-reveal.com
          </div>
        </div>
      </div>
    </div>
  );
}

