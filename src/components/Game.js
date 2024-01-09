import React, { useState } from 'react';
import './styles/Game.css';
import rock from './image/icon-rock.svg';
import lizard from './image/icon-lizard.svg';
import paper from './image/icon-paper.svg';
import scissors from './image/icon-scissors.svg';
import spock from './image/icon-spock.svg'; 

const images = [
  { src: rock, alt: 'Rock' },
  { src: paper, alt: 'Paper' },
  { src: scissors, alt: 'Scissors' },
  { src: lizard, alt: 'Lizard' },
  { src: spock, alt: 'Spock' },
];

const Game = () => {
  const [score, setScore] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [resultMessage, setResultMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [disable, setDisable] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResultMessage("It's a tie!");
    } else if (
      (user === 'Rock' && (computer === 'Scissors' || computer === 'Lizard')) ||
      (user === 'Paper' && (computer === 'Rock' || computer === 'Spock')) ||
      (user === 'Scissors' && (computer === 'Paper' || computer === 'Lizard')) ||
      (user === 'Lizard' && (computer === 'Spock' || computer === 'Paper')) ||
      (user === 'Spock' && (computer === 'Scissors' || computer === 'Rock'))
    ) {
      setScore(score + 1);
      setResultMessage('You win!');
    } else {
      setScore(score - 1);
      setResultMessage('You lose!');
    }
    setGameOver(true);
  };

  const handleButtonClick = (userChoiceIndex) => {
    setDisable(true);
    setDisplayResults(true);
    const userSelected = images[userChoiceIndex].alt;
    setUserChoice(images[userChoiceIndex].src);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setComputerChoice(images[randomIndex].src);
      setTimeout(() => {
        determineWinner(userSelected, images[randomIndex].alt);
      }, 500)
    }, 1000);
  };

  const getChoice = (userChoiceSrc) => {
    const selectedImage = images.find((image) => image.src === userChoiceSrc)
    return selectedImage ? selectedImage.alt : null;
  }

  const playAgain = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResultMessage('');
    setDisplayResults(false);
    setDisable(false);
    setGameOver(false);
  };

  return (
    <div className="game-board">
      <div className="score-board">
        <div className="top-board">
          <span>Rock</span>
          <span>Paper</span>
          <span>Scissors</span>
          <span>Lizard</span>
          <span>Spock</span>
        </div>
        <div className="score">
          <span>Score</span>
          <p>{score}</p>
        </div>
      </div>
      <div>
        <ul className={`choice-board-list ${disable ? 'disable' : ''}`}>
          {images.map((image, index) => (
            <li key={index} className="choice" data-choice={image.alt}>
              <button type="button" className={image.alt} onClick={() => handleButtonClick(index)}>
                <div>
                  <img src={image.src} alt={image.alt} />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={`result ${displayResults ? 'display-results' : ''}`}>
        <div>
          <h2>You picked</h2>
          <div className={`results-img ${getChoice(userChoice)} ${resultMessage === 'You win!' ? 'winner' : '' }`}>{userChoice && <img src={userChoice} alt="User choice" />}</div>
        </div>
        <div className="result-btn"> 
          {resultMessage && (
            <div>
              <p>{resultMessage}</p>
              <button onClick={playAgain}>Play Again</button>
            </div>
          )}
        </div>
        <div>
          <h2>The house picked</h2>
          <div className={`results-img ${getChoice(computerChoice)} ${resultMessage === 'You lose!' ? 'winner' : '' }`}>{computerChoice && <img src={computerChoice} alt="Computer choice" />}</div>
        </div>
      </div>
      <button type="button" className="rules-button">Rules</button>
    </div>
  );
};

export default Game;
