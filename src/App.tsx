import { useState } from 'react'
import './App.css'
import Flashcard from './Flashcard'
import { ranks, type Branch } from './arvomerkit'

type InsigniaType = 'collar' | 'chest' | 'shoulder' | 'sleeve';

function App() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedBranch, setSelectedBranch] = useState<Branch>('army-airforce')
  const [shuffledRanks, setShuffledRanks] = useState(ranks.filter(r => r.branch === 'army-airforce'))
  const [selectedTypes, setSelectedTypes] = useState<InsigniaType[]>(['collar'])
  const [infiniteMode, setInfiniteMode] = useState(false)

  const shuffle = () => {
    const branchRanks = ranks.filter(r => r.branch === selectedBranch)
    const shuffled = [...branchRanks].sort(() => Math.random() - 0.5)
    setShuffledRanks(shuffled)
  }

  const start = () => {
    if (selectedTypes.length === 0) return; // Need at least one type selected
    shuffle()
    setCurrentIndex(0)
    setStarted(true)
  }

  const stop = () => {
    setStarted(false)
    setCurrentIndex(0)
  }

  const next = () => {
    if (currentIndex < shuffledRanks.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (infiniteMode) {
      // In infinite mode, reshuffle and continue
      shuffle()
      setCurrentIndex(0)
    }
  }

  const restart = () => {
    shuffle()
    setCurrentIndex(0)
  }

  const toggleType = (type: InsigniaType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const finished = !infiniteMode && currentIndex >= shuffledRanks.length - 1

  if (!started) {
    return (
      <div className="app">
        <div className="start-screen">
          <h1>Arvomerkit</h1>
          <p className="description">
            Opi Puolustusvoimien arvomerkit.
          </p>
          <div className="insignia-type-selection">
            <h2 className="selection-title">Valitse puolustushaara:</h2>
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
                  <span className="checkbox-name">Maavoimat & Ilmavoimat</span>
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
                  <span className="checkbox-name">Merivoimat</span>
                </span>
              </label>
            </div>

            <h2 className="selection-title">Valitse harjoiteltavat tyypit:</h2>
            {selectedBranch === 'army-airforce' ? (
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes('collar')}
                    onChange={() => toggleType('collar')}
                  />
                  <span className="checkbox-text">
                    <span className="checkbox-name">Kauluslaatat</span>
                  </span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes('chest')}
                    onChange={() => toggleType('chest')}
                  />
                  <span className="checkbox-text">
                    <span className="checkbox-name">Rintalaatat</span>
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
                    <span className="checkbox-name">Olkalaatat</span>
                  </span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes('sleeve')}
                    onChange={() => toggleType('sleeve')}
                  />
                  <span className="checkbox-text">
                    <span className="checkbox-name">Hihalaatat</span>
                  </span>
                </label>
              </div>
            )}
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={infiniteMode}
                  onChange={(e) => setInfiniteMode(e.target.checked)}
                />
                <span className="checkbox-text">
                  <span className="checkbox-name">Loputon tila</span>
                </span>
              </label>
            </div>
          </div>
          <button
            className="primary-button"
            onClick={start}
            disabled={selectedTypes.length === 0}
          >
            Aloita harjoittelu
          </button>
        </div>
      </div>
    )
  }

  if (finished && started) {
    return (
      <div className="app">
        <div className="finish-screen">
          <h1>Hienoa!</h1>
          <p>Olet käynyt läpi kaikki {ranks.length} arvomerkkiä.</p>
          <div className="buttons">
            <button className="primary-button" onClick={restart}>
              Harjoittele uudelleen
            </button>
            <button className="secondary-button" onClick={() => setStarted(false)}>
              Takaisin alkuun
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Pick a random insignia type from selected types for each card
  const getRandomInsigniaType = (rank: typeof shuffledRanks[0]): InsigniaType => {
    // Filter selected types to only those available for this rank
    const availableTypes = selectedTypes.filter(type => {
      switch (type) {
        case 'collar':
          return rank.collarInsignia !== undefined;
        case 'chest':
          return rank.chestInsignia !== undefined;
        case 'shoulder':
          return rank.shoulderInsignia !== undefined;
        case 'sleeve':
          return rank.sleeveInsignia !== undefined;
        default:
          return false;
      }
    });

    if (availableTypes.length === 0) {
      // Fallback to first available type
      if (rank.collarInsignia) return 'collar';
      if (rank.chestInsignia) return 'chest';
      if (rank.shoulderInsignia) return 'shoulder';
      if (rank.sleeveInsignia) return 'sleeve';
      return 'collar'; // final fallback
    }

    return availableTypes[Math.floor(Math.random() * availableTypes.length)];
  }

  const currentRank = shuffledRanks[currentIndex];

  return (
    <div className="app">
      <button className="exit-button" onClick={stop}>
        Lopeta
      </button>
      <Flashcard
        rank={currentRank}
        onNext={next}
        current={currentIndex + 1}
        total={infiniteMode ? undefined : shuffledRanks.length}
        insigniaType={getRandomInsigniaType(currentRank)}
      />
    </div>
  )
}

export default App
