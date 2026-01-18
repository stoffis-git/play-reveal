import { useState } from 'react';
import { useGame, getMismatchedCards, getThemeSummaries, getMatchCount, getQuestionForCard } from '../store';
import { themeColors } from '../types';
import type { Theme } from '../types';
import { getInsightForQuestion } from '../insights';

export function Paywall() {
  const { state, dispatch } = useGame();
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

      {/* Relationship Map */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>
          📊 Your Round 1 Map
        </h3>
        {themeSummaries.map(summary => (
          <div key={summary.theme} className="theme-bar" style={{ marginBottom: '8px' }}>
            <div className="theme-bar__header">
              <span className="theme-bar__name" style={{ color: themeColors[summary.theme] }}>
                {summary.displayName}
              </span>
              <span className="theme-bar__score">{summary.matchPercentage}%</span>
            </div>
            <div className="theme-bar__track">
              <div 
                className={`theme-bar__fill ${
                  summary.matchPercentage >= 80 
                    ? 'theme-bar__fill--high' 
                    : summary.matchPercentage >= 50 
                      ? 'theme-bar__fill--medium' 
                      : 'theme-bar__fill--low'
                }`}
                style={{ width: `${summary.matchPercentage}%` }}
              />
            </div>
          </div>
        ))}
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
          <div style={{
            background: 'var(--match-green-light)',
            borderRadius: '12px',
            padding: '12px 16px'
          }}>
            {strengthThemes.map(theme => (
              <div 
                key={theme.theme}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: '1px solid rgba(52, 199, 89, 0.2)'
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{theme.displayName}</span>
                <span style={{ 
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--match-green)' 
                }}>
                  {theme.matchPercentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Growth Areas with Preview */}
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
            🌱 Growth Opportunities
          </h4>
          
          {growthThemes.slice(0, 2).map(theme => {
            const themeMismatches = mismatchedCards.filter(c => c.answer.theme === theme.theme);
            const exampleMismatch = themeMismatches[0];
            const question = exampleMismatch ? getQuestionForCard(exampleMismatch) : null;
            const insight = question 
              ? getInsightForQuestion(question.id, theme.theme)
              : getInsightForQuestion('', theme.theme);
            const conversationStarter = insight.mismatchConversation || insight.matchConversation;
            
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
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
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
                
                {question && (
                  <div style={{
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                    color: 'var(--text-secondary)',
                    marginBottom: '12px',
                    padding: '8px 12px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px'
                  }}>
                    "{question.text}"
                  </div>
                )}
                
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4',
                  margin: 0
                }}>
                  {insight.whyItMatters}
                </p>
                
                {/* Blurred conversation starter as teaser */}
                <div style={{
                  marginTop: '12px',
                  padding: '10px 12px',
                  background: 'linear-gradient(135deg, var(--partner1-light) 0%, var(--partner2-light) 100%)',
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)',
                    filter: 'blur(4px)',
                    userSelect: 'none'
                  }}>
                    💬 "{conversationStarter}"
                  </div>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.6)'
                  }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      color: 'var(--partner1)'
                    }}>
                      🔒 Unlock in Round 2
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Unlock Banner */}
      <div className="unlock-banner" style={{ marginBottom: '24px' }}>
        <div className="unlock-banner__icon">✨</div>
        <h3 className="unlock-banner__title">Ready for Round 2?</h3>
        <p className="unlock-banner__text">
          Get 15 personalized deep-dive questions tailored to YOUR differences
        </p>
      </div>

      {/* What's included */}
      <div style={{ 
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: 'var(--card-shadow)'
      }}>
        <h4 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '0.95rem' }}>
          Round 2 includes:
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { icon: '🎴', text: '15 personalized questions' },
            { icon: '💬', text: 'Conversation starters for each mismatch' },
            { icon: '📊', text: 'Complete relationship insights' },
            { icon: '🎯', text: 'Action items for growth' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price box */}
      <div className="paywall__price-box">
        <div className="paywall__price-title">ROUND 2: DEEP DIVE</div>
        <div className="paywall__price">$7.99</div>
        <div className="paywall__price-subtitle">One-time payment • No subscription</div>
      </div>

      {/* CTAs */}
      <button
        className="btn btn--accent btn--full"
        onClick={handleUnlock}
        style={{ marginBottom: '12px' }}
      >
        ✨ Unlock Round 2 — $7.99
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
