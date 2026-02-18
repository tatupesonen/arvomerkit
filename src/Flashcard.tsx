import { useState } from 'react';
import type { Rank } from './arvomerkit';
import { ui, getRankName, getCategoryName, type Language } from './i18n';

type InsigniaType = 'collar' | 'chest' | 'shoulder' | 'sleeve';

interface FlashcardProps {
  rank: Rank;
  onCorrect: () => void;
  onWrong: () => void;
  current: number;
  total: number | undefined;
  insigniaType: InsigniaType;
  showRating: boolean;
  language: Language;
}

function Flashcard({ rank, onCorrect, onWrong, current, total, insigniaType, showRating, language }: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const t = ui[language];

  const handleCardClick = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else if (!showRating) {
      // Practice mode: second click advances
      setShowAnswer(false);
      onCorrect();
    }
  };

  const handleCorrect = () => {
    setShowAnswer(false);
    onCorrect();
  };

  const handleWrong = () => {
    setShowAnswer(false);
    onWrong();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  const getInsigniaImage = () => {
    switch (insigniaType) {
      case 'collar': return rank.collarInsignia;
      case 'chest': return rank.chestInsignia;
      case 'shoulder': return rank.shoulderInsignia;
      case 'sleeve': return rank.sleeveInsignia;
      default: return rank.collarInsignia;
    }
  };

  const insigniaImage = getInsigniaImage();

  // Card is interactive (clickable) when answer is hidden or in practice mode after reveal
  const isInteractive = !showAnswer || (!showRating && showAnswer);

  const progressLabel = total !== undefined
    ? `${current} / ${total}`
    : `#${current}`;

  return (
    <div className="flashcard-container">
      <div
        className={`flashcard${showAnswer ? ' flashcard--answered' : ''}`}
        onClick={handleCardClick}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        aria-label={isInteractive ? (showAnswer ? t.nextInstruction : t.guessInstruction) : undefined}
      >
        <div className="flashcard-header">
          <span className="category" aria-hidden="true">{getCategoryName(rank.category, language)}</span>
          <span className="progress" aria-label={progressLabel} aria-live="polite">
            {total !== undefined ? `${current} / ${total}` : `#${current}`}
          </span>
        </div>

        <div className="flashcard-content">
          {!showAnswer ? (
            <>
              <div className="insignia-container">
                <img
                  src={insigniaImage}
                  alt={`${getCategoryName(rank.category, language)} – ${t.guessInstruction}`}
                  className="insignia-image"
                />
              </div>
              <p className="instruction" aria-hidden="true">{t.guessInstruction}</p>
            </>
          ) : (
            <>
              <h2 className="rank-name">{getRankName(rank.name, rank.branch, language)}</h2>
              {showRating ? (
                <div className="answer-buttons" onClick={e => e.stopPropagation()}>
                  <button className="wrong-button" onClick={handleWrong}>{t.wrong}</button>
                  <button className="correct-button" onClick={handleCorrect}>{t.correct}</button>
                </div>
              ) : (
                <p className="instruction" aria-hidden="true">{t.nextInstruction}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
