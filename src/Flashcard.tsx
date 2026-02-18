import { useState } from 'react';
import type { Rank } from './arvomerkit';

type InsigniaType = 'collar' | 'chest' | 'shoulder' | 'sleeve';

interface FlashcardProps {
  rank: Rank;
  onCorrect: () => void;
  onWrong: () => void;
  current: number;
  total: number | undefined;
  insigniaType: InsigniaType;
  showRating: boolean;
}

function Flashcard({ rank, onCorrect, onWrong, current, total, insigniaType, showRating }: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

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
          <span className="category">{rank.category}</span>
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
              <p className="instruction">Arvaa arvomerkki ja klikkaa tarkistaaksesi</p>
            </>
          ) : (
            <>
              <h2 className="rank-name">{rank.name}</h2>
              {showRating ? (
                <div className="answer-buttons" onClick={e => e.stopPropagation()}>
                  <button className="wrong-button" onClick={handleWrong}>Väärin</button>
                  <button className="correct-button" onClick={handleCorrect}>Oikein</button>
                </div>
              ) : (
                <p className="instruction">Klikkaa siirtyäksesi seuraavaan</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
