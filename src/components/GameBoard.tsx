import { useState, useEffect, useRef, useMemo } from 'react';
import { useGame, getMatchCount, getThemeSummaries } from '../store';
import { getQuestionWithExample, getRound2Intro, round1Questions } from '../questions';
import { RevealScreen } from './RevealScreen';
import { Menu } from './Menu';
import type { Card, Theme } from '../types';
import { themeTinyLabels, themeColors, themeDisplayNames } from '../types';
import { hasRemotePayment, recordPayment } from '../services/paymentTracking';

function generateSessionCode(length = 6): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

interface GameBoardProps {
  round: 1 | 2;
}

interface CardPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function GameBoard({ round }: GameBoardProps) {
  const { state, dispatch } = useGame();
  const [showIntro, setShowIntro] = useState(true); // Show "whose turn" intro
  const [showPassDevice, setShowPassDevice] = useState(false);
  const [hasShownPartner2Share, setHasShownPartner2Share] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardPosition, setCardPosition] = useState<CardPosition | null>(null);
  const [revealedCard, setRevealedCard] = useState<Card | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = round === 1 ? state.round1Cards : state.round2Cards;
  const currentPlayerName = state.currentPlayer === 1 ? state.partner1Name : state.partner2Name;
  const isRemote = state.gameMode === 'remote' && Boolean(state.remoteSessionId);
  const matchCount = getMatchCount(cards);
  const revealedCount = cards.filter(c => c.state === 'revealed').length;

  // When card is selected, start animation
  useEffect(() => {
    if (state.selectedCardIndex !== null) {
      // Get card position if this is the active player who clicked
      if (cardPosition) {
        setIsAnimating(true);
        // After animation completes, show the question
        const timer = setTimeout(() => {
          setShowQuestion(true);
          setIsAnimating(false);
        }, 400);
        return () => clearTimeout(timer);
      }
    } else {
      // Card deselected, hide question
      setShowQuestion(false);
      setIsAnimating(false);
    }
  }, [state.selectedCardIndex, cardPosition]);

  // Handle answer selection
  const handleAnswer = (answer: 'A' | 'B') => {

    // Delay before closing question modal and processing answer
    setTimeout(() => {
      setShowQuestion(false);
      setCardPosition(null);

      // Check if this will reveal the card (both partners will have answered)
      const selectedCard = state.selectedCardIndex !== null ? cards[state.selectedCardIndex] : null;
      const willReveal = selectedCard && (
        (state.currentPlayer === 1 && selectedCard.state === 'partner2Only') ||
        (state.currentPlayer === 2 && selectedCard.state === 'partner1Only')
      );

      // Delay to show card flip animation
      setTimeout(() => {
        if (willReveal && selectedCard) {
          // Create a copy of the card with the answer for the reveal screen
          const cardWithAnswer: Card = {
            ...selectedCard,
            state: 'revealed',
            answer: {
              ...selectedCard.answer,
              ...(state.currentPlayer === 1 
                ? { partner1Answer: answer, matched: selectedCard.answer.partner2Answer === answer }
                : { partner2Answer: answer, matched: selectedCard.answer.partner1Answer === answer }
              )
            }
          };
          setRevealedCard(cardWithAnswer);
        }
        dispatch({ type: 'ANSWER_QUESTION', answer });
        // Only show pass device if not showing reveal screen and not remote
        if (!willReveal && !isRemote) {
          setShowPassDevice(true);
        }
      }, 300);
    }, 500); // 0.5 second delay
  };

  // Handle continue from reveal screen
  const handleRevealContinue = () => {
    setRevealedCard(null);
    
    // Check if all cards are now revealed (round complete)
    const allRevealed = cards.every(c => c.state === 'revealed');
    if (allRevealed) {
      dispatch({ type: 'COMPLETE_ROUND', round });
    } else {
      setShowPassDevice(true);
    }
  };

  const handleCardClick = (index: number) => {
    if (isRemote && !state.isRemoteConnected) return;
    
    const card = cards[index];
    const cardEl = cardRefs.current[index];
    
    // Check if the current player can select this card
    const canSelect = 
      (state.currentPlayer === 1 && (card.state === 'faceDown' || card.state === 'partner2Only')) ||
      (state.currentPlayer === 2 && (card.state === 'faceDown' || card.state === 'partner1Only'));
    
    if (!canSelect) return;
    
    // Get card position for animation
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect();
      setCardPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height
      });
    }
    
    dispatch({ type: 'SELECT_CARD', index });
  };

  const getCardClassName = (card: Card, index: number): string => {
    let className = 'game-card';
    
    if (card.state === 'faceDown') {
      className += ' game-card--facedown';
    } else if (card.state === 'partner1Only') {
      className += ' game-card--partner1-answered';
      if (state.currentPlayer === 1) {
        className += ' game-card--disabled';
      }
    } else if (card.state === 'partner2Only') {
      className += ' game-card--partner2-answered';
      if (state.currentPlayer === 2) {
        className += ' game-card--disabled';
      }
    } else if (card.state === 'revealed') {
      className += card.answer.matched ? ' game-card--matched' : ' game-card--different';
      className += ' game-card--disabled';
    }
    
    
    if (isAnimating && state.selectedCardIndex === index) {
      className += ' game-card--animating-out';
    }
    
    return className;
  };

  // Get theme info for a card
  const getCardThemeInfo = (card: Card) => {
    return {
      label: themeTinyLabels[card.answer.theme] || '',
      color: themeColors[card.answer.theme] || '#666'
    };
  };

  const selectedCard = state.selectedCardIndex !== null ? cards[state.selectedCardIndex] : null;
  const selectedQuestion = selectedCard ? getQuestionWithExample(selectedCard.questionId) : null;

  // Count cards available for current player
  const availableForMe = cards.filter(c => {
    if (state.currentPlayer === 1) {
      return c.state === 'faceDown' || c.state === 'partner2Only';
    } else {
      return c.state === 'faceDown' || c.state === 'partner1Only';
    }
  }).length;

  // Calculate diff count
  const diffCount = revealedCount - matchCount;

  // For Round 2, get theme summaries to calculate mismatch counts and percentages
  const themeSummaries = useMemo(() => {
    if (round !== 2 || state.round1Cards.length === 0) return [];
    return getThemeSummaries(state.round1Cards);
  }, [round, state.round1Cards]);

  const isFirstPartner2Handoff = showPassDevice && state.currentPlayer === 2 && !hasShownPartner2Share;

  const handleCreateRemoteSession = async () => {
    // Preserve partner names and payment status before reset
    const partner1Name = state.partner1Name;
    const partner2Name = state.partner2Name;
    const hasPaid = state.hasPaid;
    
    // Reset game progress (clears everything - no confirmation)
    dispatch({ type: 'RESET_GAME' });
    
    // Set partner names again immediately after reset
    dispatch({ type: 'SET_PARTNER_NAMES', partner1Name, partner2Name });
    
    // Check payment status
    if (hasPaid) {
    try {
        await recordPayment({ checkoutId: localStorage.getItem('reveal-checkout-id') });
    } catch {
        // ignore
    }
    }

    const ok = hasPaid ? true : await hasRemotePayment();
    if (!ok) {
      dispatch({ type: 'NAVIGATE_TO', screen: 'remotePayment' });
      return;
    }

    // Create remote session
    const code = generateSessionCode(6);
    dispatch({ type: 'SELECT_MODE', mode: 'remote' });
    dispatch({ type: 'SET_REMOTE_SESSION', sessionId: code, playerId: 1 });
    dispatch({ type: 'SET_REMOTE_SESSION_PAID', paid: true });
    dispatch({ type: 'NAVIGATE_TO', screen: 'remoteSetup' });
  };

  // Get total card count for a theme in Round 1
  const getThemeCardCount = (theme: Theme): number => {
    return round1Questions.filter(q => q.theme === theme).length;
  };

  // Calculate mismatch count per theme for Round 2
  const getThemeMismatchCount = (theme: Theme): number => {
    if (round !== 2 || state.round1Cards.length === 0) return 0;
    
    const themeCards = state.round1Cards.filter(c => c.answer.theme === theme);
    // Only count cards that have been fully answered (matched !== null)
    const answeredCards = themeCards.filter(c => c.answer.matched !== null);
    const mismatches = answeredCards.filter(c => c.answer.matched === false).length;
    
    return mismatches;
  };

  // Calculate bubble count for Round 2 mismatch indicators
  // Logic: If all cards in theme mismatch → show 3 bubbles (max visual indicator)
  // Otherwise → show actual mismatch count (1 or 2 bubbles)
  const getBubbleCount = (theme: Theme): number => {
    if (round !== 2) return 0;
    
    const totalCardCount = getThemeCardCount(theme);
    const mismatchCount = getThemeMismatchCount(theme);
    
    // If all cards in theme mismatch, show 3 bubbles (maximum visual indicator)
    if (mismatchCount > 0 && mismatchCount === totalCardCount) {
      return 3;
    }
    
    // Otherwise, show actual mismatch count
    return mismatchCount;
  };

  // Get theme summary for a specific theme (for consistency between bubble count and percentage)
  const getThemeSummary = (theme: Theme) => {
    return themeSummaries.find(ts => ts.theme === theme);
  };

  return (
    <div className="game-container">
      {/* Intro screen - whose turn is it */}
      {showIntro && !isRemote && (
        <div className={`intro-screen intro-screen--partner${state.currentPlayer}`}>
          <div className="intro-screen__content">
            <div className="intro-screen__round">
              Round {round}
            </div>
            <div className="intro-screen__icon">
              {state.currentPlayer === 1 ? '💙' : '💗'}
            </div>
            <h2 className="intro-screen__title">
              {currentPlayerName}
            </h2>
            <p className="intro-screen__subtitle">
              You're up first!
            </p>
            <p className="intro-screen__hint">
              Pick any card to reveal a question.<br />
              Answer honestly—your partner will answer the same questions separately.
            </p>
            <button 
              className="btn btn--primary btn--full"
              onClick={() => setShowIntro(false)}
            >
              Let's Play!
            </button>
          </div>
        </div>
      )}

      {/* Header with menu, turn indicator, progress counter, and Round 2 pill */}
      <div className="game-header">
        <Menu buttonPosition="inline" />
        <div className="turn-indicator-wrapper">
          <div className={`turn-indicator turn-indicator--partner${state.currentPlayer}`}>
            <span className="turn-indicator__dot"></span>
            {currentPlayerName.toUpperCase()}'S TURN
          </div>
        </div>
        {isRemote && (
          <span style={{
            background: 'rgba(0,0,0,0.06)',
            color: 'var(--text-secondary)',
            padding: '4px 10px',
            borderRadius: '100px',
            fontSize: '0.625rem',
            fontWeight: '700',
            letterSpacing: '1px'
          }}>
            🌐 REMOTE
          </span>
        )}
        <div className="progress-counter-header">
          {revealedCount}/15
        </div>
        {round === 2 && (
          <span style={{
            background: 'linear-gradient(135deg, var(--partner2) 0%, #FF7A8F 100%)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '100px',
            fontSize: '0.625rem',
            fontWeight: '700',
            letterSpacing: '1px'
          }}>
            ⭐ ROUND 2
          </span>
        )}
      </div>

      {/* Dynamic Progress Lever Bar */}
      <div className="progress-lever">
        <div className="progress-lever__bar">
          <div 
            className="progress-lever__diff" 
            style={{ width: revealedCount > 0 ? `${(diffCount / revealedCount) * 100}%` : '50%' }}
          />
          <div 
            className="progress-lever__sync" 
            style={{ width: revealedCount > 0 ? `${(matchCount / revealedCount) * 100}%` : '50%' }}
          />
        </div>
        <div className="progress-lever__labels">
          <span className="progress-lever__label progress-lever__label--diff">
            {diffCount} Different
          </span>
          <span className="progress-lever__label progress-lever__label--sync">
            {matchCount} In Sync
          </span>
        </div>
      </div>

      {/* Hint text */}
      <div className="text-center" style={{ 
        fontSize: '0.7rem', 
        color: 'var(--text-secondary)',
        marginBottom: '2px'
      }}>
        👇 Pick any card ({availableForMe} available)
      </div>

      {/* Card grid */}
      <div className="card-grid">
        {cards.map((card, index) => {
          const themeInfo = getCardThemeInfo(card);
          // For Round 2, calculate bubble count for themes with mismatches
          // Logic: If all cards mismatch → 3 bubbles, otherwise → actual mismatch count
          const bubbleCount = round === 2 ? getBubbleCount(card.answer.theme) : 0;
          const mismatchCount = round === 2 ? getThemeMismatchCount(card.answer.theme) : 0;
          
          return (
            <div
              key={card.id}
              ref={el => { cardRefs.current[index] = el; }}
              className={`${getCardClassName(card, index)} game-card--player${state.currentPlayer}`}
              onClick={() => handleCardClick(index)}
              style={{ '--theme-color': themeInfo.color } as React.CSSProperties}
            >
              {/* Theme label for face-down cards */}
              {(card.state === 'faceDown' || card.state === 'partner1Only' || card.state === 'partner2Only') && (
                <>
                  <span className="game-card__theme" style={{ color: themeInfo.color }}>
                    {themeInfo.label}
                  </span>
                  {/* Indicator for Round 2 themes with mismatches
                      Shows 1-3 bubbles: complete mismatch (all cards) = 3 bubbles, partial mismatch = actual count */}
                  {round === 2 && bubbleCount > 0 && (
                    <div 
                      className="game-card__mismatch-indicator"
                      title={`This topic had ${mismatchCount} difference${mismatchCount > 1 ? 's' : ''} in Round 1`}
                      style={{
                        display: 'flex',
                        position: 'relative',
                        width: bubbleCount === 1 ? '20px' : bubbleCount === 2 ? '26px' : '38px',
                        height: '20px',
                        overflow: 'visible'
                      }}
                    >
                      {Array.from({ length: bubbleCount }).map((_, i) => (
                        <span
                          key={i}
                          style={{
                            position: 'absolute',
                            left: `${i * 6}px`,
                            fontSize: '0.75rem',
                            zIndex: bubbleCount - i
                          }}
                        >
                          💬
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Remote connection overlay */}
      {isRemote && !state.isRemoteConnected && (
        <div className="question-overlay">
          <div className="question-modal animate-modal-in" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
            <h3 style={{ margin: 0, marginBottom: '6px' }}>Connecting…</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Please wait a moment.
            </p>
          </div>
        </div>
      )}

      {/* Animated card transition */}
      {isAnimating && cardPosition && selectedCard && (
        <div 
          className="card-animation"
          style={{
            '--start-x': `${cardPosition.x}px`,
            '--start-y': `${cardPosition.y}px`,
            '--start-width': `${cardPosition.width}px`,
            '--start-height': `${cardPosition.height}px`,
          } as React.CSSProperties}
        >
          <div className="card-animation__card">
            <div className="card-animation__front">🔍</div>
            <div className="card-animation__back"></div>
          </div>
        </div>
      )}

      {/* Question modal - no closing by clicking outside, must answer */}
      {showQuestion && selectedQuestion && selectedCard && (
        <div className="question-overlay">
          <div className={`question-modal question-modal--player${state.currentPlayer} animate-modal-in`}>
            {/* Round 2 intro explaining why this question */}
            {round === 2 && (
              <div className="question-modal__intro" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                {selectedCard && (() => {
                  const themeSummary = getThemeSummary(selectedCard.answer.theme);
                  const mismatchCount = getThemeMismatchCount(selectedCard.answer.theme);
                  
                  // Show mismatch info if there are any mismatches (not just <50%)
                  if (themeSummary && mismatchCount > 0) {
                    const matchPercentage = themeSummary.matchPercentage;
                    const themeName = themeDisplayNames[selectedCard.answer.theme];
                    
                    return (
                      <>
                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>💬</span>
                        <span>
                          In <strong>{themeName}</strong>, you had <strong style={{ color: 'var(--mismatch-amber)' }}>{matchPercentage}% alignment</strong> in Round 1. Let's explore this deeper...
                        </span>
                      </>
                    );
                  }
                  
                  // Fallback to standard intro for themes with no mismatches
                  return getRound2Intro(selectedQuestion.id, selectedQuestion.theme, state.round1Cards);
                })()}
              </div>
            )}
            
            <p className="question-modal__text">
              {selectedQuestion.text}
            </p>
            {selectedQuestion.example && (
              <p className="question-modal__example">
                {selectedQuestion.example}
              </p>
            )}
            <div className="question-modal__options">
              <button
                className={`question-modal__option question-modal__option--player${state.currentPlayer}`}
                onClick={() => handleAnswer('A')}
              >
                <span className="question-modal__option-letter">A</span>
                <span className="question-modal__option-text">{selectedQuestion.optionA}</span>
              </button>
              <button
                className={`question-modal__option question-modal__option--player${state.currentPlayer}`}
                onClick={() => handleAnswer('B')}
              >
                <span className="question-modal__option-letter">B</span>
                <span className="question-modal__option-text">{selectedQuestion.optionB}</span>
              </button>
            </div>
            <p className="question-modal__hint">
              {currentPlayerName}, tap your answer
            </p>
          </div>
        </div>
      )}

      {/* Reveal screen - shown when a card is fully revealed */}
      {revealedCard && (
        <RevealScreen
          card={revealedCard}
          partner1Name={state.partner1Name}
          partner2Name={state.partner2Name}
          onContinue={handleRevealContinue}
          isRemote={isRemote}
          isMyTurn={isRemote ? (state.currentPlayer === state.remotePlayerId) : true}
          nextPlayerName={state.currentPlayer === 1 ? state.partner2Name : state.partner1Name}
        />
      )}

      {/* Pass device screen */}
      {showPassDevice && !isRemote && (
        <div className={`pass-device pass-device--partner${state.currentPlayer}`}>
          <div className="pass-device__icon">📱</div>
          <h2 className="pass-device__text">Pass to</h2>
          <p className="pass-device__name">{state.currentPlayer === 1 ? state.partner1Name : state.partner2Name}</p>
          <button
            className="btn btn--primary btn--full"
            onClick={() => {
              if (isFirstPartner2Handoff) setHasShownPartner2Share(true);
              setShowPassDevice(false);
            }}
          >
            I'm {state.currentPlayer === 1 ? state.partner1Name : state.partner2Name}
          </button>
          {isFirstPartner2Handoff && (
            <div style={{ marginTop: '32px', width: '100%', maxWidth: '420px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: 'white', textAlign: 'center' }}>
                Not together right now?<br />
                Create a remote session to play together.
              </p>
              <button
                className="btn btn--accent btn--full"
                onClick={handleCreateRemoteSession}
                style={{ marginTop: '12px' }}
              >
                Create Remote Session
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
