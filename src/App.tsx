import { useState, useMemo } from 'react'
import './App.css'
import Flashcard from './Flashcard'
import { ranks, type Branch, type Rank } from './arvomerkit'
import {
  loadSRData, saveSRData, updateCardState, isDue, getCardKey,
  type SRData,
} from './spaced-repetition'
import { ui, loadLanguage, saveLanguage, type Language } from './i18n'

type InsigniaType = 'collar' | 'chest' | 'shoulder' | 'sleeve';
type Screen = 'start' | 'study' | 'finish';
type SessionMode = 'review' | 'practice';

interface SessionCard {
  rank: Rank;
  insigniaType: InsigniaType;
  key: string;
}

function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [selectedBranch, setSelectedBranch] = useState<Branch>('army-airforce')
  const [selectedTypes, setSelectedTypes] = useState<InsigniaType[]>(['collar'])
  const [srData, setSRData] = useState<SRData>(() => loadSRData())
  const [sessionQueue, setSessionQueue] = useState<SessionCard[]>([])
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 })
  const [sessionMode, setSessionMode] = useState<SessionMode>('review')
  const [language, setLanguage] = useState<Language>(() => loadLanguage())

  const t = ui[language]

  const branchRanks = useMemo(
    () => ranks.filter(r => r.branch === selectedBranch),
    [selectedBranch],
  )

  const dueCount = useMemo(
    () => branchRanks.filter(r => isDue(srData[getCardKey(r.name, r.branch)])).length,
    [branchRanks, srData],
  )

  const getInsigniaType = (rank: Rank, types: InsigniaType[]): InsigniaType => {
    const available = types.filter(type => {
      switch (type) {
        case 'collar': return !!rank.collarInsignia;
        case 'chest': return !!rank.chestInsignia;
        case 'shoulder': return !!rank.shoulderInsignia;
        case 'sleeve': return !!rank.sleeveInsignia;
        default: return false;
      }
    });
    if (available.length === 0) {
      if (rank.collarInsignia) return 'collar';
      if (rank.chestInsignia) return 'chest';
      if (rank.shoulderInsignia) return 'shoulder';
      return 'sleeve';
    }
    return available[Math.floor(Math.random() * available.length)];
  };

  const buildQueue = (mode: SessionMode, currentSRData: SRData): SessionCard[] => {
    const source =
      mode === 'review'
        ? branchRanks.filter(r => isDue(currentSRData[getCardKey(r.name, r.branch)]))
        : branchRanks;
    return [...source]
      .sort(() => Math.random() - 0.5)
      .map(rank => ({
        rank,
        insigniaType: getInsigniaType(rank, selectedTypes),
        key: getCardKey(rank.name, rank.branch),
      }));
  };

  const start = (mode: SessionMode) => {
    if (selectedTypes.length === 0) return;
    const queue = buildQueue(mode, srData);
    if (queue.length === 0) return;
    setSessionMode(mode);
    setSessionQueue(queue);
    setSessionStats({ correct: 0, wrong: 0 });
    setScreen('study');
  };

  const handleCorrect = () => {
    const [current, ...rest] = sessionQueue;

    let newSRData = srData;
    if (sessionMode === 'review') {
      const newState = updateCardState(srData[current.key], true);
      newSRData = { ...srData, [current.key]: newState };
      setSRData(newSRData);
      saveSRData(newSRData);
    }

    setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));

    if (rest.length === 0) {
      if (sessionMode === 'practice') {
        setSessionQueue(buildQueue('practice', newSRData));
      } else {
        setSessionQueue([]);
        setScreen('finish');
      }
    } else {
      setSessionQueue(rest);
    }
  };

  const handleWrong = () => {
    const [current, ...rest] = sessionQueue;

    if (sessionMode === 'review') {
      const newState = updateCardState(srData[current.key], false);
      const newSRData = { ...srData, [current.key]: newState };
      setSRData(newSRData);
      saveSRData(newSRData);
    }

    setSessionStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    // Re-queue the wrong card at the end
    setSessionQueue([...rest, current]);
  };

  const toggleType = (type: InsigniaType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    saveLanguage(lang);
  };

  const languageSwitcher = (
    <div className="language-switcher">
      {(['fi', 'sv', 'en'] as Language[]).map(lang => (
        <button
          key={lang}
          className={`lang-button${language === lang ? ' lang-button--active' : ''}`}
          onClick={() => handleLanguageChange(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );

  if (screen === 'finish') {
    return (
      <div className="app">
        <div className="finish-screen">
          <h1>{t.great}</h1>
          <p>{t.reviewed(sessionStats.correct)}</p>
          {sessionStats.wrong > 0 && (
            <p className="info">{t.failures(sessionStats.wrong)}</p>
          )}
          <div className="buttons">
            <button
              className="primary-button"
              onClick={() => start('review')}
              disabled={selectedTypes.length === 0 || dueCount === 0}
            >
              {dueCount > 0 ? t.reviewCount(dueCount) : t.noReviewable}
            </button>
            <button className="secondary-button" onClick={() => setScreen('start')}>
              {t.backToStart}
            </button>
          </div>
        </div>
        {languageSwitcher}
      </div>
    )
  }

  if (screen === 'study') {
    const currentCard = sessionQueue[0];
    const total = sessionStats.correct + sessionQueue.length;
    return (
      <div className="app">
        <button className="exit-button" onClick={() => setScreen('start')}>
          {t.quit}
        </button>
        <Flashcard
          rank={currentCard.rank}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          current={sessionStats.correct + 1}
          total={sessionMode === 'review' ? total : undefined}
          insigniaType={currentCard.insigniaType}
          showRating={sessionMode === 'review'}
          language={language}
        />
        {languageSwitcher}
      </div>
    )
  }

  return (
    <div className="app">
      <div className="start-screen">
        <h1>{t.title}</h1>
        <p className="description">{t.description}</p>
        <p className="hint">{t.hint}</p>

        <div className="insignia-type-selection">
          <h2 className="selection-title">{t.selectBranch}</h2>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="radio"
                checked={selectedBranch === 'army-airforce'}
                onChange={() => {
                  setSelectedBranch('army-airforce')
                  setSelectedTypes(['collar'])
                }}
              />
              <span className="checkbox-text">
                <span className="checkbox-name">{t.armyAirforce}</span>
              </span>
            </label>
            <label className="checkbox-label">
              <input
                type="radio"
                checked={selectedBranch === 'navy'}
                onChange={() => {
                  setSelectedBranch('navy')
                  setSelectedTypes(['shoulder'])
                }}
              />
              <span className="checkbox-text">
                <span className="checkbox-name">{t.navy}</span>
              </span>
            </label>
          </div>

          <h2 className="selection-title">{t.selectTypes}</h2>
          {selectedBranch === 'army-airforce' ? (
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes('collar')}
                  onChange={() => toggleType('collar')}
                />
                <span className="checkbox-text">
                  <span className="checkbox-name">{t.collar}</span>
                </span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes('chest')}
                  onChange={() => toggleType('chest')}
                />
                <span className="checkbox-text">
                  <span className="checkbox-name">{t.chest}</span>
                </span>
              </label>
            </div>
          ) : (
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes('shoulder')}
                  onChange={() => toggleType('shoulder')}
                />
                <span className="checkbox-text">
                  <span className="checkbox-name">{t.shoulder}</span>
                </span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes('sleeve')}
                  onChange={() => toggleType('sleeve')}
                />
                <span className="checkbox-text">
                  <span className="checkbox-name">{t.sleeve}</span>
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="buttons">
          <button
            className="primary-button"
            onClick={() => start('review')}
            disabled={selectedTypes.length === 0 || dueCount === 0}
          >
            {t.reviewCount(dueCount)}
          </button>
          <button
            className="secondary-button"
            onClick={() => start('practice')}
            disabled={selectedTypes.length === 0}
          >
            {t.practice}
          </button>
        </div>

        {dueCount === 0 && (
          <p className="info">{t.noDueCards}</p>
        )}
      </div>
      {languageSwitcher}
    </div>
  )
}

export default App
