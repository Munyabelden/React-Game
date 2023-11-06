import React, { useState } from 'react';
import data from './Data';

export default function Game() {
  const [ score, setScore] = useState(0);

  const displayImages = () => {
    // eslint-disable-next-line array-callback-return
    return data.map((image, index) => {
      <li key={index}>
        <img src={image} alt={image}/>
      </li>
    })
  };

  return (
    <div>
      <div className="score-board">
        <ul>
          <li>Rock</li>
          <li>Paper</li>
          <li>Scissors</li>
          <li>Lizard</li>
          <li>Spock</li>
        </ul>
        <div>
          Score
          {score} 
        </div>
      </div>
      <ul>
        {displayImages()}
      </ul>
    </div>
  )
}
