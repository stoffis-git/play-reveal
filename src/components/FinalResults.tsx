import { useState } from 'react';
import { useGame, getMatchCount, getThemeSummaries, getQuestionForCard } from '../store';
import { themeColors } from '../types';
import type { Card, Theme, ThemeSummary } from '../types';

// Insight content for each theme
const themeInsights: Record<Theme, { whyItMatters: string; conversationStarter: string; nextStep: string }> = {
  conflict: {
    whyItMatters: "How you handle disagreements shapes the long-term health of your relationship. Different conflict styles aren't bad—they just need understanding and adaptation.",
    conversationStarter: "When we have a disagreement, what's one thing I could do differently that would help you feel more heard?",
    nextStep: "Try the 'time-out' technique: when tensions rise, agree to take 20 minutes apart before continuing."
  },
  support: {
    whyItMatters: "Emotional support is the foundation of feeling truly known by your partner. Understanding each other's support needs prevents feeling alone.",
    conversationStarter: "When you've had a tough day, what does ideal support from me look like?",
    nextStep: "Create a 'support menu'—each of you write down 3 things that help you feel supported."
  },
  dailyLife: {
    whyItMatters: "The daily rhythms of life add up. Small misalignments in routines and household dynamics can become sources of ongoing friction.",
    conversationStarter: "What's one daily habit or routine that you wish we did differently as a couple?",
    nextStep: "Pick one household task that causes tension and redesign how you approach it together."
  },
  intimacy: {
    whyItMatters: "Physical and emotional closeness keeps your bond strong. Different intimacy needs are normal—what matters is finding a rhythm for both.",
    conversationStarter: "What makes you feel most connected to me? Is it different from what I might assume?",
    nextStep: "Schedule a weekly 'connection check-in'—not to solve problems, but to share how close you're feeling."
  },
  future: {
    whyItMatters: "Shared vision creates shared motivation. Understanding where your futures align (and diverge) helps you build toward common goals.",
    conversationStarter: "What's one thing about our future together that excites you most? What feels uncertain?",
    nextStep: "Create a 'dreams list' together—things you want to experience, achieve, or build as a couple."
  },
  growth: {
    whyItMatters: "A healthy relationship helps both partners become better versions of themselves. Feeling safe to grow—and be vulnerable—is essential.",
    conversationStarter: "Is there something you've been wanting to try or change about yourself? How can I support that?",
    nextStep: "Share one personal goal each and check in monthly on how you're supporting each other's growth."
  }
};

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
  const insight = themeInsights[summary.theme];
  
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
            <p className="expandable-theme__conversation">"{insight.conversationStarter}"</p>
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
  const insight = themeInsights[theme.theme];
  const themeColor = themeColors[theme.theme];

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
          <div className="growth-step__action">
            <span className="growth-step__emoji">🎯</span>
            <p>{insight.nextStep}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function FinalResults() {
  const { state, dispatch } = useGame();
  
  const round1Matches = getMatchCount(state.round1Cards);
  const round2Matches = getMatchCount(state.round2Cards);
  const totalMatches = round1Matches + round2Matches;
  
  const allCards = [...state.round1Cards, ...state.round2Cards];
  const themeSummaries = getThemeSummaries(allCards);
  const tier = getDetailedScoreTier(totalMatches, 30);
  
  // Get growth themes (lowest alignment)
  const growthThemes = themeSummaries
    .filter(s => s.matchPercentage < 70)
    .sort((a, b) => a.matchPercentage - b.matchPercentage)
    .slice(0, 3);

  return (
    <div className="container animate-slide-up" style={{ paddingBottom: '40px' }}>
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
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{tier.emoji}</div>
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
            onClick={() => dispatch({ type: 'NAVIGATE_TO', screen: 'share' })}
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
    </div>
  );
}
