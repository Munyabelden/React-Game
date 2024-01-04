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
  const [score, setScore] = useState(12);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [resultMessage, setResultMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

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

  const playAgain = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResultMessage('');
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
        <ul className="choice-board-list">
          {images.map((image, index) => (
            <li key={index} className="choice" data-choice={image.alt}>
              <button type="button" onClick={() => handleButtonClick(index)}>
                <img src={image.src} alt={image.alt} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {userChoice && <p>Your choice: <img src={userChoice} alt="User choice" /></p>}
        {computerChoice && <p>Computer's choice: <img src={computerChoice} alt="Computer choice" /></p>}
        {resultMessage && (
          <div>
            <p>{resultMessage}</p>
            <button onClick={playAgain}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
