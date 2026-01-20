import { useGame, getMismatchedCards, getThemeSummaries, getMatchCount, getQuestionForCard, getScoreTier } from '../store';
import { Menu } from './Menu';
import { themeColors } from '../types';
import { getInsightForQuestion } from '../insights';

export function Round1Results() {
  const { state, dispatch } = useGame();

  // Handle case where user accesses this screen without playing Round 1
  // (e.g., from landing page test button)
  const hasRound1Data = state.round1Cards.length > 0;
  
  const mismatchedCards = hasRound1Data ? getMismatchedCards(state.round1Cards) : [];
  const themeSummaries = hasRound1Data ? getThemeSummaries(state.round1Cards) : [];
  const matchCount = hasRound1Data ? getMatchCount(state.round1Cards) : 0;
  const tier = hasRound1Data ? getScoreTier(matchCount, 15) : null;
  
  // Get strength and growth themes
  const strengthThemes = themeSummaries
    .filter(s => s.matchPercentage >= 50)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const growthThemes = themeSummaries
    .filter(s => s.matchPercentage < 50)
    .sort((a, b) => a.matchPercentage - b.matchPercentage);

  const handleUnlock = () => {
    // Store payment initiation flag (so we can show "I've paid" button when they return)
    try {
      localStorage.setItem('reveal-payment-initiated', 'true');
      localStorage.setItem('reveal-payment-initiated-time', Date.now().toString());
    } catch {
      // Ignore storage errors
    }
    
    // Polar checkout link
    // IMPORTANT: Configure success_url in Polar dashboard for this link:
    // Go to Polar dashboard → Products → Checkout Links → Edit this link
    // Set success_url to: https://play-reveal.com/?screen=paymentSuccess&checkout_id={CHECKOUT_ID}
    // The {CHECKOUT_ID} is optional but recommended (displays order ID to user)
    // Without success_url configured, users will be stuck on Polar's payment success page
    const polarCheckoutUrl = `https://buy.polar.sh/polar_cl_nJ2vx1fXaiRId4N9pKEu6Gg92x9SCbZhcJy6n0hhaJu`;
    
    // Redirect to Polar checkout
    window.location.href = polarCheckoutUrl;
  };

  const handleManualUnlock = () => {
    // User manually confirms they've paid (trust-based, no backend verification)
    dispatch({ type: 'COMPLETE_PAYMENT' });
    // Clear the flag
    try {
      localStorage.removeItem('reveal-payment-initiated');
      localStorage.removeItem('reveal-payment-initiated-time');
    } catch {
      // Ignore storage errors
    }
    // Navigate to payment success screen, which will auto-start Round 2
    dispatch({ type: 'NAVIGATE_TO', screen: 'paymentSuccess' });
  };

  // Check if user returned after initiating payment
  const hasPaymentInitiated = (() => {
    try {
      const flag = localStorage.getItem('reveal-payment-initiated');
      const time = localStorage.getItem('reveal-payment-initiated-time');
      if (flag === 'true' && time) {
        const timeSince = Date.now() - parseInt(time, 10);
        // Only show button if payment was initiated within last 30 minutes
        return timeSince < 30 * 60 * 1000;
      }
    } catch {
      // Ignore storage errors
    }
    return false;
  })();

  const handleMaybeLater = () => {
    // Just navigate to landing without resetting progress
    dispatch({ type: 'NAVIGATE_TO', screen: 'landing' });
  };

  const handleStartRound2 = () => {
    // User has already paid, navigate directly to Round 2
    dispatch({ type: 'START_ROUND_2' });
  };

  return (
    <div className="container paywall animate-slide-up" style={{ paddingBottom: '10px' }}>
      {/* Header with menu */}
      <div className="game-header" style={{ marginBottom: '0px' }}>
        <Menu buttonPosition="inline" />
        <div style={{ flex: 1 }}></div>
      </div>

      {/* Score Summary Header */}
      <div className="results-header" style={{ marginBottom: '12px' }}>
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
        
        {hasRound1Data && (
          <>
            <div className="results-score" style={{ marginBottom: '16px' }}>
              <div className="results-score__number">{matchCount}/15</div>
              <div className="results-score__label">in sync</div>
            </div>
            {tier && (
              <div className="results-tier" style={{ marginBottom: '0px' }}>
                <div className="results-tier__name">{tier.tier}</div>
                <p className="results-tier__desc">{tier.description}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Strengths Preview */}
      {strengthThemes.length > 0 && (
        <div style={{ marginBottom: '20px', marginTop: '8px' }}>
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

      {/* Growth Areas with Blurred Preview - only show if we have Round 1 data */}
      {hasRound1Data && growthThemes.length > 0 && (
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
                      {state.hasPaid ? '🔒 Unlock after Round 2' : '🔒 Unlock below'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Combined Unlock Banner with Price and Features - only show if not paid */}
      {!state.hasPaid && (
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
      
          </div>
          
          <div style={{ 
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              {[
                { icon: '🎴', text: '+ 15 questions based on your round 1.' },
                { icon: '📊', text: 'Complete relationship insights.' }, 
                { icon: '💬', text: 'Full conversation starters with deep dives.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            background: 'white',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{ 
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '1px',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              ROUND 2: DEEP DIVE & ANALYSIS
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
        </div>
      )}

      {/* CTAs */}
      {state.hasPaid ? (
        // User has already paid - show direct Round 2 button
        <>
          <button
            className="btn btn--accent btn--full"
            onClick={handleStartRound2}
            style={{ marginBottom: '12px' }}
          >
            🚀 Start Round 2
          </button>
          <button
            className="btn btn--ghost"
            onClick={handleMaybeLater}
          >
            Maybe Later
          </button>
        </>
      ) : (
        // User hasn't paid - show payment options
        <>
          {hasPaymentInitiated ? (
            // User returned after payment - show manual unlock button
            <button
              className="btn btn--accent btn--full"
              onClick={handleManualUnlock}
              style={{ marginBottom: '12px' }}
            >
              ✨ Unlock Round 2
            </button>
          ) : (
            // Normal unlock button
            <>
              <button
                className="btn btn--accent btn--full"
                onClick={handleUnlock}
                style={{ marginBottom: '12px' }}
              >
                ✨ Unlock Round 2 — $4.99
              </button>
            </>
          )}
          <button
            className="btn btn--ghost"
            onClick={handleMaybeLater}
          >
            Maybe Later
          </button>

          {/* Trust indicators - only show for unpaid users */}
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
        </>
      )}
    </div>
  );
}
