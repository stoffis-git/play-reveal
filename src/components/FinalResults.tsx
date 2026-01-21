import { useState } from 'react';
import { useGame, getMatchCount, getThemeSummaries, getQuestionForCard } from '../store';
import { Menu } from './Menu';
import { themeColors } from '../types';
import type { Card, ThemeSummary } from '../types';
import { getInsightForQuestion } from '../insights';
import { ShareCard } from './ShareCard';

// More granular score tiers
function getDetailedScoreTier(matches: number, total: number): { 
  tier: string; 
  description: string; 
  emoji: string;
  color: string;
  subMessage: string;
} {
  const percentage = (matches / total) * 100;
  
  if (percentage >= 90) {
    return {
      tier: 'Exceptional Alignment',
      description: 'You two are remarkably in tune!',
      emoji: '🌟',
      color: '#34C759',
      subMessage: 'Your connection is rare—celebrate it and keep nurturing it.'
    };
  }
  if (percentage >= 80) {
    return {
      tier: 'Strong Connection',
      description: 'A deeply aligned partnership.',
      emoji: '💚',
      color: '#34C759',
      subMessage: 'You understand each other well. Focus on your few growth areas.'
    };
  }
  if (percentage >= 70) {
    return {
      tier: 'Solid Foundation',
      description: 'Great alignment with room to grow.',
      emoji: '💪',
      color: '#4A7CF8',
      subMessage: 'You have a strong base. The differences you have are opportunities.'
    };
  }
  if (percentage >= 60) {
    return {
      tier: 'Growing Together',
      description: 'Good sync with meaningful differences.',
      emoji: '🌱',
      color: '#FFB800',
      subMessage: 'Your differences aren\'t problems—they\'re invitations to understand each other better.'
    };
  }
  if (percentage >= 50) {
    return {
      tier: 'Work in Progress',
      description: 'Half in sync, half exploring.',
      emoji: '🔄',
      color: '#FFB800',
      subMessage: 'You have real differences to navigate. Use them as conversation starters.'
    };
  }
  if (percentage >= 40) {
    return {
      tier: 'Different Wavelengths',
      description: 'Many perspectives to bridge.',
      emoji: '💬',
      color: '#FF9500',
      subMessage: 'Your differences are significant. Prioritize the conversations that matter most.'
    };
  }
  return {
    tier: 'Time to Talk',
    description: 'Lots of ground to cover together.',
    emoji: '🗣️',
    color: '#E85D75',
    subMessage: 'Don\'t be discouraged—some of the best couples started here. Communication is key.'
  };
}

interface ExpandableThemeProps {
  summary: ThemeSummary;
  cards: Card[];
  partner1Name: string;
  partner2Name: string;
}

function ExpandableTheme({ summary, cards, partner1Name, partner2Name }: ExpandableThemeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const themeCards = cards.filter(c => c.answer.theme === summary.theme);
  const mismatches = themeCards.filter(c => c.answer.matched === false);
  const themeColor = themeColors[summary.theme];
  
  // Get question-specific insight from first mismatch, or first card in theme, or fallback to theme
  const firstCard = mismatches[0] || themeCards[0];
  const question = firstCard ? getQuestionForCard(firstCard) : null;
  const insight = question 
    ? getInsightForQuestion(question.id, summary.theme)
    : { whyItMatters: '', matchConversation: '', mismatchConversation: '', nextStep: '' };
  
  // Use mismatch conversation if there are mismatches, otherwise match conversation
  const conversationStarter = mismatches.length > 0 
    ? insight.mismatchConversation 
    : insight.matchConversation;
  
  const statusColor = summary.matchPercentage >= 70 
    ? 'var(--match-green)' 
    : summary.matchPercentage >= 50 
      ? 'var(--partner1)' 
      : 'var(--mismatch-amber)';

  return (
    <div className="expandable-theme">
      <button 
        className="expandable-theme__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="expandable-theme__info">
          <span 
            className="expandable-theme__dot"
            style={{ background: themeColor }}
          />
          <span className="expandable-theme__name">{summary.displayName}</span>
        </div>
        <div className="expandable-theme__meta">
          <span 
            className="expandable-theme__score"
            style={{ color: statusColor }}
          >
            {summary.matchPercentage}%
          </span>
          <span className={`expandable-theme__arrow ${isExpanded ? 'open' : ''}`}>▼</span>
        </div>
      </button>
      
      {isExpanded && (
        <div className="expandable-theme__content">
          {/* Why It Matters */}
          <div className="expandable-theme__section">
            <div className="expandable-theme__section-title">💡 Why This Matters</div>
            <p className="expandable-theme__section-text">{insight.whyItMatters}</p>
          </div>
          
          {/* Show mismatches */}
          {mismatches.length > 0 && (
            <div className="expandable-theme__mismatches">
              <div className="expandable-theme__section-title">🔍 Your Differences</div>
              {mismatches.slice(0, 2).map(card => {
                const question = getQuestionForCard(card);
                if (!question) return null;
                return (
                  <div key={card.id} className="expandable-theme__mismatch">
                    <p className="expandable-theme__question">{question.text}</p>
                    <div className="expandable-theme__answers">
                      <span style={{ color: 'var(--partner1)' }}>
                        {partner1Name}: {card.answer.partner1Answer === 'A' ? question.optionA : question.optionB}
                      </span>
                      <span style={{ color: 'var(--partner2)' }}>
                        {partner2Name}: {card.answer.partner2Answer === 'A' ? question.optionA : question.optionB}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Conversation Starter */}
          <div className="expandable-theme__section">
            <div className="expandable-theme__section-title">💬 Try Asking</div>
            <p className="expandable-theme__conversation">"{conversationStarter}"</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface GrowthStepProps {
  theme: ThemeSummary;
}

function GrowthStep({ theme }: GrowthStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // For growth steps, use a generic theme insight since we don't have a specific card
  const insight = getInsightForQuestion('', theme.theme);
  const themeColor = themeColors[theme.theme];
  const steps = insight.nextSteps && insight.nextSteps.length > 0 ? insight.nextSteps : [insight.nextStep];
  const stepCount =
    theme.matchPercentage < 40 ? 3 :
    theme.matchPercentage < 55 ? 2 :
    1;
  const displaySteps = steps.slice(0, stepCount);

  return (
    <div className="growth-step">
      <button 
        className="growth-step__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="growth-step__name" style={{ color: themeColor }}>
          {theme.displayName}
        </span>
        <span className={`growth-step__arrow ${isExpanded ? 'open' : ''}`}>▼</span>
      </button>
      
      {isExpanded && (
        <div className="growth-step__content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            {displaySteps.map((step, i) => (
              <div key={i} className="growth-step__action">
                <span className="growth-step__emoji">🎯</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function FinalResults() {
  const { state, dispatch } = useGame();
  const [showShareOverlay, setShowShareOverlay] = useState(false);
  
  const round1Matches = getMatchCount(state.round1Cards);
  const round2Matches = getMatchCount(state.round2Cards);
  const totalMatches = round1Matches + round2Matches;
  const totalMatchPercentage = Math.round((totalMatches / 30) * 100);
  
  const allCards = [...state.round1Cards, ...state.round2Cards];
  const themeSummaries = getThemeSummaries(allCards);
  const tier = getDetailedScoreTier(totalMatches, 30);
  
  // Get growth themes (lowest alignment)
  const growthThemes = themeSummaries
    .filter(s => s.matchPercentage < 70)
    .sort((a, b) => a.matchPercentage - b.matchPercentage)
    .slice(0, 5);

  return (
    <div className="container animate-slide-up" style={{ paddingBottom: '40px' }}>
      {/* Header with menu */}
      <div className="game-header" style={{ marginBottom: '24px' }}>
        <Menu buttonPosition="inline" />
        <div style={{ flex: 1 }}></div>
      </div>
      {/* Header */}
      <div className="results-header">
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
          COMPLETE RESULTS
        </div>
        
        {/* Score breakdown */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px',
          marginBottom: '20px',
          fontSize: '0.9rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>R1</div>
            <div style={{ fontWeight: '600' }}>{round1Matches}/15</div>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>+</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>R2</div>
            <div style={{ fontWeight: '600' }}>{round2Matches}/15</div>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>=</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Total</div>
            <div style={{ 
              fontWeight: '700',
              fontSize: '1.1rem',
              color: tier.color
            }}>
              {totalMatches}/30
            </div>
          </div>
        </div>

        {/* Tier display */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ 
            fontSize: '3rem',
            fontWeight: '800',
            letterSpacing: '-1px',
            color: tier.color,
            marginBottom: '8px'
          }}>
            {totalMatchPercentage}%
          </div>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            fontFamily: "'Playfair Display', serif",
            color: tier.color,
            marginBottom: '4px'
          }}>
            {tier.tier}
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
            {tier.description}
          </p>
          <p style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-muted)',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            {tier.subMessage}
          </p>
        </div>
      </div>

      {/* Relationship Map - Expandable */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ 
          marginBottom: '12px', 
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          📊 Your Relationship Map
        </h3>
        <div className="relationship-map">
          {themeSummaries.map(summary => (
            <ExpandableTheme
              key={summary.theme}
              summary={summary}
              cards={allCards}
              partner1Name={state.partner1Name}
              partner2Name={state.partner2Name}
            />
          ))}
        </div>
      </div>

      {/* Growth Next Steps - Expandable */}
      {growthThemes.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            marginBottom: '12px', 
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🎯 Your Next Steps
          </h3>
          <p style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-muted)', 
            marginBottom: '12px' 
          }}>
            Focus areas based on your biggest growth opportunities
          </p>
          <div className="growth-steps">
            {growthThemes.map(theme => (
              <GrowthStep key={theme.theme} theme={theme} />
            ))}
          </div>
        </div>
      )}

      {/* Final CTAs */}
      <div style={{ 
        background: 'white',
        borderRadius: '20px',
        padding: '24px',
        textAlign: 'center',
        boxShadow: 'var(--card-shadow)'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎉</div>
        <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>
          Great job, {state.partner1Name} & {state.partner2Name}!
        </h3>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '20px',
          fontSize: '0.9rem'
        }}>
          You've taken a big step toward understanding each other better.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            className="btn btn--primary btn--full"
            onClick={() => setShowShareOverlay(true)}
          >
            Share Your Score 📤
          </button>
          <button
            className="btn btn--secondary btn--full"
            onClick={() => dispatch({ type: 'RESET_GAME' })}
          >
            Start Over
          </button>
        </div>
      </div>
      {showShareOverlay && (
        <ShareCard onClose={() => setShowShareOverlay(false)} />
      )}
    </div>
  );
}
