import React, { useState } from 'react';
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

  const determineWinner = (user, computer) => {
    // Game rules logic goes here, you can define your own rules
    // For simplicity, let's say Paper beats Rock, Rock beats Scissors, and Scissors beats Paper
    // Lizard poisons Spock, Spock smashes Scissors, Scissors decapitates Lizard, Lizard eats Paper, Paper disproves Spock, Spock vaporizes Rock, Rock crushes Scissors
    // In case of a draw, no score changes
    // Implement your own game rules here

    if (user === computer) {
      return 'It\'s a tie!';
    } else if (
      (user === 'Rock' && (computer === 'Scissors' || computer === 'Lizard')) ||
      (user === 'Paper' && (computer === 'Rock' || computer === 'Spock')) ||
      (user === 'Scissors' && (computer === 'Paper' || computer === 'Lizard')) ||
      (user === 'Lizard' && (computer === 'Spock' || computer === 'Paper')) ||
      (user === 'Spock' && (computer === 'Scissors' || computer === 'Rock'))
    ) {
      setScore(score + 1);
      return 'You win!';
    } else {
      setScore(score - 1);
      return 'You lose!';
    }
  };

  const handleButtonClick = (userChoiceIndex) => {
    const userSelected = images[userChoiceIndex].alt;
    setUserChoice(images[userChoiceIndex].src);

    const randomIndex = Math.floor(Math.random() * images.length);
    setComputerChoice(images[randomIndex].src);

    const result = determineWinner(userSelected, images[randomIndex].alt);
    alert(result);
  };

  return (
    <div>
      <div>
        Score: {score}
      </div>
      <div className="score-board">
        <ul>
          {images.map((image, index) => (
            <li key={index}>
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
      </div>
    </div>
  );
};

export default Game;
