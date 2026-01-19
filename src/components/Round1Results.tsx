import { useState } from 'react';
import { useGame, getMismatchedCards, getThemeSummaries, getMatchCount, getQuestionForCard } from '../store';
import { Menu } from './Menu';
import { themeColors } from '../types';

export function Round1Results() {
  const { state, dispatch } = useGame();
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(new Set());
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  const mismatchedCards = getMismatchedCards(state.round1Cards);
  const themeSummaries = getThemeSummaries(state.round1Cards);
  const matchCount = getMatchCount(state.round1Cards);
  
  // Get strength and growth themes
  const strengthThemes = themeSummaries
    .filter(s => s.matchPercentage >= 50)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const growthThemes = themeSummaries
    .filter(s => s.matchPercentage < 50)
    .sort((a, b) => a.matchPercentage - b.matchPercentage);

  const toggleTheme = (theme: string) => {
    const newExpanded = new Set(expandedThemes);
    if (newExpanded.has(theme)) {
      newExpanded.delete(theme);
    } else {
      newExpanded.add(theme);
    }
    setExpandedThemes(newExpanded);
  };

  const handleUnlock = () => {
    // Polar checkout link with success URL containing {CHECKOUT_ID}
    const successUrl = `${window.location.origin}?screen=paymentSuccess&checkout_id={CHECKOUT_ID}`;
    const polarCheckoutUrl = `https://buy.polar.sh/polar_cl_nJ2vx1fXaiRId4N9pKEu6Gg92x9SCbZhcJy6n0hhaJu?success_url=${encodeURIComponent(successUrl)}`;
    
    // Redirect to Polar checkout
    window.location.href = polarCheckoutUrl;
  };

  const handleMaybeLater = () => {
    setShowConfirmExit(true);
  };

  const handleConfirmExit = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  if (showConfirmExit) {
    return (
      <div className="container animate-fade-in" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '24px' }}>🤔</div>
        <h2 style={{ marginBottom: '16px' }}>Are you sure?</h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '32px',
          maxWidth: '300px',
          margin: '0 auto 32px'
        }}>
          You can't return to these results without replaying Round 1.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            className="btn btn--accent btn--full"
            onClick={() => setShowConfirmExit(false)}
          >
            No, unlock Round 2
          </button>
          <button
            className="btn btn--ghost"
            onClick={handleConfirmExit}
          >
            Yes, exit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container paywall animate-slide-up" style={{ paddingBottom: '40px' }}>
      {/* Header with menu */}
      <div className="game-header" style={{ marginBottom: '24px' }}>
        <Menu buttonPosition="inline" />
        <div style={{ flex: 1 }}></div>
      </div>

      {/* Score Summary Header */}
      <div className="results-header" style={{ marginBottom: '32px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--partner1) 0%, var(--partner2) 100%)',
          color: 'white',
          padding: '4px 16px',
          borderRadius: '100px',
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '1px',
          display: 'inline-block',
          marginBottom: '16px'
        }}>
          ROUND 1 ANALYSIS
        </div>
        
        <div className="results-score" style={{ marginBottom: '16px' }}>
          <div className="results-score__number">{matchCount}/15</div>
          <div className="results-score__label">in sync</div>
        </div>
      </div>

      {/* Strengths Preview */}
      {strengthThemes.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ 
            fontSize: '0.9rem', 
            fontWeight: '700',
            color: 'var(--match-green)',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            💪 Where You Sync
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {strengthThemes.map(theme => (
              <div 
                key={theme.theme}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: 'var(--card-shadow)',
                  borderLeft: `4px solid ${themeColors[theme.theme]}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    fontWeight: '600',
                    color: themeColors[theme.theme],
                    fontSize: '0.9rem'
                  }}>
                    {theme.displayName}
                  </span>
                  <span style={{ 
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: 'var(--match-green)' 
                  }}>
                    {theme.matchPercentage}% aligned
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Growth Areas with Expandable Tiles */}
      {growthThemes.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ 
            fontSize: '0.9rem', 
            fontWeight: '700',
            color: 'var(--mismatch-amber)',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🌱 You Differed On
          </h4>
          
          {growthThemes.map(theme => {
            const themeMismatches = mismatchedCards.filter(c => c.answer.theme === theme.theme);
            const isExpanded = expandedThemes.has(theme.theme);
            
            return (
              <div 
                key={theme.theme}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '12px',
                  boxShadow: 'var(--card-shadow)',
                  borderLeft: `4px solid ${themeColors[theme.theme]}`
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: isExpanded ? '12px' : 0,
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleTheme(theme.theme)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      fontWeight: '600',
                      color: themeColors[theme.theme]
                    }}>
                      {theme.displayName}
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      color: 'var(--mismatch-amber)',
                      fontWeight: '600'
                    }}>
                      {theme.matchPercentage}% aligned
                    </span>
                  </div>
                  <span style={{ 
                    fontSize: '1.2rem',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}>
                    ▼
                  </span>
                </div>
                
                {isExpanded && (
                  <div style={{ marginTop: '12px' }}>
                    {themeMismatches.map(card => {
                      const question = getQuestionForCard(card);
                      if (!question) return null;
                      
                      return (
                        <div 
                          key={card.id}
                          style={{
                            background: 'var(--bg-secondary)',
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '12px'
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
                          <p style={{ fontWeight: '500', marginBottom: '12px', fontSize: '0.9rem' }}>
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
              </div>
            );
          })}
        </div>
      )}

      {/* Combined Unlock Banner with Price and Features */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--partner1-light) 0%, var(--partner2-light) 100%)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        border: '2px solid var(--partner1)',
        boxShadow: 'var(--card-shadow)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✨</div>
          <h3 style={{ 
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '8px',
            background: 'linear-gradient(135deg, var(--partner1) 0%, var(--partner2) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Ready for Round 2?
          </h3>
          <p style={{ 
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '16px'
          }}>
            Get 15 personalized deep-dive questions tailored to YOUR differences, complete relationship insights, and action items for growth
          </p>
        </div>
        
        <div style={{ 
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ 
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '1px',
            color: 'var(--text-secondary)',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            ROUND 2: DEEP DIVE
          </div>
          <div style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--partner1) 0%, var(--partner2) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '4px'
          }}>
            $4.99
          </div>
          <div style={{ 
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textAlign: 'center'
          }}>
            One-time payment • No subscription
          </div>
        </div>

        <div style={{ 
          background: 'white',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            {[
              { icon: '🎴', text: '15 personalized questions' },
              { icon: '💬', text: 'Conversation starters for each mismatch' },
              { icon: '📊', text: 'Complete relationship insights' },
              { icon: '🎯', text: 'Action items for growth' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTAs */}
      <button
        className="btn btn--accent btn--full"
        onClick={handleUnlock}
        style={{ marginBottom: '12px' }}
      >
        ✨ Unlock Round 2 — $4.99
      </button>
      
      <button
        className="btn btn--ghost"
        onClick={handleMaybeLater}
      >
        Maybe Later
      </button>

      {/* Trust indicators */}
      <div className="text-center mt-6" style={{ 
        fontSize: '0.75rem', 
        color: 'var(--text-muted)',
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        marginTop: '16px'
      }}>
        <span>🔒 Secure payment</span>
        <span>💳 Powered by Polar</span>
      </div>
    </div>
  );
}
