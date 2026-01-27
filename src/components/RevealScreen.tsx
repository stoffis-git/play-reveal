import { useState, useEffect } from 'react';
import type { Card } from '../types';
import { getQuestionById } from '../questions';
import { getInsightForQuestion } from '../insights';

interface RevealScreenProps {
  card: Card;
  partner1Name: string;
  partner2Name: string;
  onContinue: () => void;
  isRemote?: boolean;
  isMyTurn?: boolean;
  nextPlayerName?: string;
  revealConfirmedBy?: { partner1: boolean; partner2: boolean } | null;
  onConfirm?: () => void;
  remotePlayerId?: 1 | 2 | null;
}

export function RevealScreen({ card, partner1Name, partner2Name, onContinue, isRemote = false, isMyTurn = true, nextPlayerName = '', revealConfirmedBy = null, onConfirm, remotePlayerId = null }: RevealScreenProps) {
  const [showDeepDive, setShowDeepDive] = useState(false);
  const question = getQuestionById(card.questionId);
  if (!question) return null;

  const isMatch = card.answer.matched;
  const insight = getInsightForQuestion(card.questionId, card.answer.theme);

  // Auto-continue when both players have confirmed (remote mode only)
  useEffect(() => {
    if (isRemote && revealConfirmedBy && revealConfirmedBy.partner1 && revealConfirmedBy.partner2) {
      // Small delay to ensure both players see the confirmation state
      const timer = setTimeout(() => {
        onContinue();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [revealConfirmedBy, isRemote, onContinue]);

  // Determine button state for remote mode
  const hasCurrentPlayerConfirmed = remotePlayerId === 1 
    ? (revealConfirmedBy?.partner1 ?? false)
    : (revealConfirmedBy?.partner2 ?? false);
  
  const otherPlayerName = remotePlayerId === 1 ? partner2Name : partner1Name;

  const partner1Answer = card.answer.partner1Answer === 'A' ? question.optionA : question.optionB;
  const partner2Answer = card.answer.partner2Answer === 'A' ? question.optionA : question.optionB;

  return (
    <div className={`reveal-screen ${isMatch ? 'reveal-screen--sync' : 'reveal-screen--different'}`}>
      {/* Celebration particles for sync */}
      {isMatch && (
        <div className="reveal-particles">
          <span className="reveal-particle">✨</span>
          <span className="reveal-particle">💫</span>
          <span className="reveal-particle">🌟</span>
          <span className="reveal-particle">✨</span>
          <span className="reveal-particle">💖</span>
          <span className="reveal-particle">✨</span>
        </div>
      )}

      <div className="reveal-screen__content">
        {/* Result Icon */}
        <div className={`reveal-screen__icon ${isMatch ? 'reveal-screen__icon--sync' : 'reveal-screen__icon--different'}`}>
          {isMatch ? '💚' : '💬'}
        </div>

        {/* Result Label */}
        <div className={`reveal-screen__label ${isMatch ? 'reveal-screen__label--sync' : 'reveal-screen__label--different'}`}>
          {isMatch ? 'IN SYNC!' : 'DIFFERENT VIEWS'}
        </div>

        {/* Question */}
        <h2 className="reveal-screen__question">{question.text}</h2>

        {isMatch ? (
          /* IN SYNC - Single combined answer */
          <>
            <div className="reveal-screen__combined-answer">
              <div className="reveal-screen__combined-label">You both said:</div>
              <div className="reveal-screen__combined-text">{partner1Answer}</div>
            </div>

            <div className="reveal-screen__insight-box">
              <div className="reveal-screen__insight-header">
                <span>💡</span> Why This Matters
              </div>
              <p className="reveal-screen__insight-text">{insight.whyItMatters}</p>
            </div>

            <div className="reveal-screen__celebration-box">
              <span className="reveal-screen__celebration-icon">🎉</span>
              <span>You're on the same page!</span>
            </div>

            {/* Deep Dive Dropdown for matched cards */}
            <div className={`reveal-screen__deepdive ${showDeepDive ? 'reveal-screen__deepdive--open' : ''}`}>
              <button 
                className="reveal-screen__deepdive-toggle"
                onClick={() => setShowDeepDive(!showDeepDive)}
              >
                <span>🔍 Go Deeper</span>
                <span className={`reveal-screen__deepdive-arrow ${showDeepDive ? 'open' : ''}`}>▼</span>
              </button>
              {showDeepDive && (
                <div className="reveal-screen__deepdive-content">
                  <p className="reveal-screen__deepdive-question">
                    "{insight.matchConversation}"
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* DIFFERENT - Two separate answers + conversation */
          <>
            <div className="reveal-screen__answers">
              <div className="reveal-screen__answer reveal-screen__answer--partner1">
                <div className="reveal-screen__answer-name">{partner1Name}</div>
                <div className="reveal-screen__answer-text">{partner1Answer}</div>
              </div>
              <div className="reveal-screen__answer reveal-screen__answer--partner2">
                <div className="reveal-screen__answer-name">{partner2Name}</div>
                <div className="reveal-screen__answer-text">{partner2Answer}</div>
              </div>
            </div>

            <div className="reveal-screen__insight-box">
              <div className="reveal-screen__insight-header">
                <span>💡</span> Why This Matters
              </div>
              <p className="reveal-screen__insight-text">{insight.whyItMatters}</p>
            </div>

            <div className="reveal-screen__talk-box">
              <div className="reveal-screen__talk-header">
                <span>💬</span> Talk About It
              </div>
              <p className="reveal-screen__talk-text">"{insight.mismatchConversation}"</p>
            </div>
          </>
        )}

        {isRemote && revealConfirmedBy ? (
          // Remote mode with confirmation tracking
          hasCurrentPlayerConfirmed ? (
            // Current player has confirmed, waiting for other player
            <button className="btn btn--primary btn--full reveal-screen__btn" disabled>
              Waiting for {otherPlayerName} to continue...
            </button>
          ) : (
            // Current player hasn't confirmed yet
            <button className="btn btn--primary btn--full reveal-screen__btn" onClick={onConfirm}>
              Continue
            </button>
          )
        ) : isRemote && !isMyTurn ? (
          // Legacy waiting state (shouldn't happen with new confirmation logic, but keeping for safety)
          <div className="reveal-screen__waiting reveal-screen--waiting">
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Waiting for {nextPlayerName} to continue...
            </p>
          </div>
        ) : (
          // Local mode or no confirmation needed
          <button className="btn btn--primary btn--full reveal-screen__btn" onClick={onContinue}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
