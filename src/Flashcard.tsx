import { useState } from 'react';
import type { Rank } from './arvomerkit';

type InsigniaType = 'collar' | 'chest' | 'shoulder' | 'sleeve';

interface FlashcardProps {
  rank: Rank;
  onNext: () => void;
  current: number;
  total: number | undefined;
  insigniaType: InsigniaType;
}

function Flashcard({ rank, onNext, current, total, insigniaType }: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleClick = () => {
    if (!showAnswer) {
      // First click: show answer
      setShowAnswer(true);
    } else {
      // Second click: go to next card
      setShowAnswer(false);
      onNext();
    }
  };

  const getInsigniaImage = () => {
    switch (insigniaType) {
      case 'collar':
        return rank.collarInsignia;
      case 'chest':
        return rank.chestInsignia;
      case 'shoulder':
        return rank.shoulderInsignia;
      case 'sleeve':
        return rank.sleeveInsignia;
      default:
        return rank.collarInsignia;
    }
  };

  const insigniaImage = getInsigniaImage();

  return (
    <div className="flashcard-container">
      <div className="flashcard" onClick={handleClick}>
        <div className="flashcard-header">
          <span className="category">{rank.category}</span>
          <span className="progress">
            {total !== undefined ? `${current} / ${total}` : `#${current}`}
          </span>
        </div>

        <div className="flashcard-content">
          {!showAnswer ? (
            <>
              {/* Show image */}
              <div className="insignia-container">
                <img src={insigniaImage} alt={rank.name} className="insignia-image" />
              </div>
              <p className="instruction">Arvaa arvomerkki ja klikkaa tarkistaaksesi</p>
            </>
          ) : (
            <>
              {/* Show answer */}
              <h2 className="rank-name">{rank.name}</h2>
              <p className="instruction">Klikkaa siirtyäksesi seuraavaan</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
