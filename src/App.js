import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sharks, setSharks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Function to add a new shark at regular intervals
    const interval = setInterval(() => {
      const newShark = {
        id: Date.now(),
        text: generateRandomWord(),
        position: 0,
        topPosition: generateRandomTopPosition(),
      };
      setSharks(prevSharks => [...prevSharks, newShark]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Function to move sharks across the screen
    const moveInterval = setInterval(() => {
      setSharks(prevSharks => {
        return prevSharks.map(shark => ({
          ...shark,
          position: shark.position + 5,
        })).filter(shark => shark.position < 200);
      });
    }, 200);

    return () => clearInterval(moveInterval);
  }, []);

  const generateRandomWord = () => {
    const words = ['shark', 'fish', 'ocean', 'dive', 'reef'];
    return words[Math.floor(Math.random() * words.length)];
  };

  const generateRandomTopPosition = () => {
    // Generate a random number between 10% and 80% (keeping some margin)
    return Math.floor(Math.random() * 71) + 10;
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    if (sharks.some(shark => shark.text === value)) {
      setScore(prevScore => prevScore + 10);
      setSharks(prevSharks => prevSharks.filter(shark => shark.text !== value));
      setInputValue('');
    }
  };

  return (
    <div className="App">
      <h1>Typer Shark</h1>
      <div className="game-board">
      <p>Score: {score}</p>
        {sharks.map(shark => (
          <div
            key={shark.id}
            className="shark-container"
            style={{ 
              left: `${shark.position}%`,
              top: `${shark.topPosition}%`,
            }}
          >
            <img
              src="" // Replace with your shark image path
              alt="Shark"
              className="shark"
            />
            <div className="word-overlay">
              {shark.text}
            </div>
          </div>
        ))}
      </div>
      <input
        className='inputs'
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type here..."
      />
    </div>
  );
}

export default App;
