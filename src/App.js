import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sharks, setSharks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);

  // Array of different shark images
  const sharkImages = [
    '/sharky.png',
    '/puffer.png',
    '/nemo.png',
    '/whale.png',

    // Add more image paths as needed
  ];

  useEffect(() => {
    // Function to add a new shark at regular intervals
    const interval = setInterval(() => {
      const newShark = {
        id: Date.now(),
        text: generateRandomWord(),
        position: 0,
        topPosition: generateRandomTopPosition(),
        image: getRandomSharkImage(), // Assign a random shark image
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
        })).filter(shark => shark.position < 100);
      });
    }, 200);

    return () => clearInterval(moveInterval);
  }, []);

  const generateRandomWord = () => {
    const words = ['shark', 'fish', 'ocean', 'dive', 'reef'];
    return words[Math.floor(Math.random() * words.length)];
  };

  const generateRandomTopPosition = () => {
    // Generate a random number between 10% and 70% (keeping some margin)
    return Math.floor(Math.random() * 61) + 10;
  };

  const getRandomSharkImage = () => {
    return sharkImages[Math.floor(Math.random() * sharkImages.length)];
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
      <h1>Typer Fish</h1>
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
              src={shark.image} // Use the randomly selected shark image
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
