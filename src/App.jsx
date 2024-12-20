import { useState, useEffect, useRef } from 'react'
import './App.css'
import { songs } from './data.js'
import Confetti from 'react-confetti'

function App() {
  const shuffledSongs = useRef([...songs].sort(() => Math.random() - 0.5))
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasGuessed, setHasGuessed] = useState(false)
  const [clickedIndex, setClickedIndex] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const audioRef = useRef(null)
  const confettiAudioRef = useRef(null)
  const gameOverAudioRef = useRef(null)

  const handlePlay = async () => {
    try {
      if (audioRef.current) {
        setError(null)
        await audioRef.current.load()
        await audioRef.current.play()
      }
    } catch (err) {
      setError('Failed to play audio. Please try again.')
      console.error('Playback failed:', err)
    }
  }

  const generateOptions = () => {
    const correctAnswer = shuffledSongs.current[currentSong].title
    const wrongOptions = shuffledSongs.current
      .filter((_, index) => index !== currentSong)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(song => song.title)
    
    return [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5)
  }

  useEffect(() => {
    if (isPlaying) {
      handlePlay()
    }
  }, [currentSong, isPlaying])

  useEffect(() => {
    setOptions(generateOptions())
  }, [currentSong])

  useEffect(() => {
    if (showConfetti && confettiAudioRef.current) {
      confettiAudioRef.current.play()
    }
  }, [showConfetti])

  useEffect(() => {
    if (showResults && gameOverAudioRef.current) {
      gameOverAudioRef.current.play()
    }
  }, [showResults])

  const handleNext = () => {
    setHasGuessed(false)
    setShowConfetti(false)
    setClickedIndex(null)
    if (currentSong + 1 < shuffledSongs.current.length) {
      setCurrentSong(currentSong + 1)
    }
  }

  const handleGuess = (title, index) => {
    setHasGuessed(true)
    setClickedIndex(index)
    const isCorrect = title === shuffledSongs.current[currentSong].title
    if (isCorrect) {
      setScore(score + 1)
      setShowConfetti(true)
    }
  }

  const handleStart = () => {
    setIsPlaying(true)
    setHasGuessed(false)
    setError(null)
    setShowResults(false)
    setCurrentSong(0)
    setScore(0)
    setShowConfetti(false)
  }

  const handleResults = () => {
    setIsPlaying(false)
    setShowResults(true)
    setShowConfetti(true)
  }

  return (
    <>
    <div className="app">
      {showConfetti && 
      showResults &&
        <>
          <Confetti numberOfPieces={100} recycle={false} />
        </>
      }

      {showConfetti && 
      !showResults &&
        <>
          <Confetti numberOfPieces={100} recycle={false} />
          <audio ref={confettiAudioRef}>
            <source src={'/dt-quiz/assets/audio/confetti.mp3'} type='audio/mp3'></source>
          </audio>
        </>
      }

      {!isPlaying &&
      !showResults &&
        <div className="start-screen">
          <img id="dt-logo" src={'/dt-quiz/assets/images/dt-logo.svg'} />
          <h1>Dream Theater Song Quiz</h1>
          <button className="start-button" onClick={handleStart}>Start</button>
        </div>}
      
      {!isPlaying &&
      showResults &&
        <div className='results-screen'>
          <audio ref={gameOverAudioRef}>
            <source src={'/dt-quiz/assets/audio/gameover.mp3'} type='audio/mp3'></source>
          </audio>
          <img id="dt-logo" src={'/dt-quiz/assets/images/dt-logo.svg'} />
          <p>You guessed {score} out of {songs.length} songs correctly!</p>
          <button className="start-button" onClick={handleStart}>Play Again</button>
        </div>}
      
      {isPlaying && 
      <div className="game-container">
        <h3 className={hasGuessed ? 'hidden' : ''}>Guess the Song</h3>

        <audio 
          ref={audioRef}
          onError={(e) => setError('Error loading audio file')}
        >
          <source src={shuffledSongs.current[currentSong].audio} type='audio/mp3' />
          Your browser does not support the audio element.
        </audio>
        
        {error && <p className="error">{error}</p>}
        
        {hasGuessed && 
          <div className="song-info">
            <img
              className='album-cover' 
              src={shuffledSongs.current[currentSong].image} 
            />
            <div>
              <p className="album-name">{shuffledSongs.current[currentSong].album}</p>
              <h3 className="song-title">{shuffledSongs.current[currentSong].title}</h3>
              <div className={showConfetti ? 'score-correct' : 'hidden'}>
                +1 Points
              </div>
            </div>
          </div>
        }

        <div className="options-grid">
          {options.map((title, index) => (
            <button
              key={index}
              onClick={() => handleGuess(title, index)}
              className={`option-button ${
                hasGuessed
                  ? title === shuffledSongs.current[currentSong].title
                    ? 'correct'
                    : index === clickedIndex
                      ? 'incorrect'
                      : ''
                  : ''
              }`}
              disabled={hasGuessed}
            >
              {title}
            </button>
          ))}
        </div>

        

        {currentSong + 1 < shuffledSongs.current.length || !hasGuessed 
          ?
          <>
            <div className="controls">
              <button 
                className="control-button play"
                onClick={handlePlay}
              >
                ↻
              </button>
              <button 
                className="control-button next"
                onClick={handleNext}
                disabled={!hasGuessed}
              >
                Next
              </button>
            </div>
            </>
            :
            <>
              <button className="control-button results" 
                onClick={handleResults}>Show Results
              </button>
            </>}
        </div>}
    </div>
    <footer>© Noam Guterman 2024</footer>
    </>
  )
}

export default App