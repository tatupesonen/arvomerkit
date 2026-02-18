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

  return (
    <div className="flashcard-container">
      <div
        className={`flashcard${showAnswer ? ' flashcard--answered' : ''}`}
        onClick={handleCardClick}
      >
        <div className="flashcard-header">
          <span className="category">{getCategoryName(rank.category, language)}</span>
          <span className="progress">
            {total !== undefined ? `${current} / ${total}` : `#${current}`}
          </span>
        </div>

        <div className="flashcard-content">
          {!showAnswer ? (
            <>
              <div className="insignia-container">
                <img src={insigniaImage} alt={rank.name} className="insignia-image" />
              </div>
              <p className="instruction">{t.guessInstruction}</p>
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
                <p className="instruction">{t.nextInstruction}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
