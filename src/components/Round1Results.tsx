import { useGame, getMatchCount, getThemeSummaries, getScoreTier, getMismatchedCards, getQuestionForCard } from '../store';
import { themeColors } from '../types';

export function Round1Results() {
  const { state, dispatch } = useGame();
  const matchCount = getMatchCount(state.round1Cards);
  const themeSummaries = getThemeSummaries(state.round1Cards);
  const tier = getScoreTier(matchCount, 15);
  const mismatchedCards = getMismatchedCards(state.round1Cards);

  const matchedThemes = themeSummaries.filter(s => s.matchPercentage >= 50);
  const diffThemes = themeSummaries.filter(s => s.matchPercentage < 50);

  // Get 1-2 example mismatches for insight preview
  const exampleMismatches = mismatchedCards.slice(0, 2);

  return (
    <div className="container animate-slide-up">
      {/* Score header */}
      <div className="results-header">
        <div className="results-score">
          <div className="results-score__number">{matchCount}/15</div>
          <div className="results-score__label">in sync</div>
        </div>
        <div className="results-tier">
          <div className="results-tier__name">{tier.tier}</div>
        </div>
        <p className="results-tier__desc">{tier.description}</p>
      </div>

      {/* Theme summary */}
      <div className="theme-summary">
        {matchedThemes.length > 0 && (
          <>
            <h4 className="theme-summary__title">You synced on</h4>
            <div className="theme-summary__list">
              {matchedThemes.map(theme => (
                <div key={theme.theme} className="theme-summary__item">
                  <div className="theme-summary__icon theme-summary__icon--match">✓</div>
                  <span className="theme-summary__name">{theme.displayName}</span>
                </div>
              ))}
            </div>
          </>
        )}
        
        {diffThemes.length > 0 && (
          <div style={{ marginTop: matchedThemes.length > 0 ? '24px' : 0 }}>
            <h4 className="theme-summary__title">You differed on</h4>
            <div className="theme-summary__list">
              {diffThemes.map(theme => (
                <div key={theme.theme} className="theme-summary__item">
                  <div className="theme-summary__icon theme-summary__icon--diff">⚠</div>
                  <span className="theme-summary__name">{theme.displayName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Example mismatches preview */}
      {exampleMismatches.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ 
            fontSize: '1rem', 
            fontWeight: '600', 
            color: 'var(--text-secondary)',
            marginBottom: '16px' 
          }}>
            A peek at your differences
          </h4>
          {exampleMismatches.map(card => {
            const question = getQuestionForCard(card);
            if (!question) return null;
            
            return (
              <div 
                key={card.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: `${themeColors[card.answer.theme]}20`,
                  color: themeColors[card.answer.theme],
                  marginBottom: '12px'
                }}>
                  {question.theme.charAt(0).toUpperCase() + question.theme.slice(1)}
                </div>
                <p style={{ fontWeight: '500', marginBottom: '12px' }}>
                  {question.text}
                </p>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                  <div style={{
                    flex: 1,
                    padding: '10px',
                    background: 'var(--partner1-light)',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--partner1)'
                  }}>
                    <strong style={{ fontSize: '0.75rem', color: 'var(--partner1)' }}>
                      {state.partner1Name}:
                    </strong>
                    <br />
                    {card.answer.partner1Answer === 'A' ? question.optionA : question.optionB}
                  </div>
                  <div style={{
                    flex: 1,
                    padding: '10px',
                    background: 'var(--partner2-light)',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--partner2)'
                  }}>
                    <strong style={{ fontSize: '0.75rem', color: 'var(--partner2)' }}>
                      {state.partner2Name}:
                    </strong>
                    <br />
                    {card.answer.partner2Answer === 'A' ? question.optionA : question.optionB}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Unlock Message */}
      <div className="unlock-banner">
        <div className="unlock-banner__icon">🔓</div>
        <h3 className="unlock-banner__title">Unlock Round 2</h3>
        <p className="unlock-banner__text">
          Get 15 personalized deep-dive questions based on your differences
        </p>
      </div>

      {/* CTA */}
      <button
        className="btn btn--accent btn--full"
        onClick={() => dispatch({ type: 'NAVIGATE_TO', screen: 'paywall' })}
        style={{ marginBottom: '16px' }}
      >
        ✨ See Full Insights & Unlock Round 2
      </button>
    </div>
  );
}

