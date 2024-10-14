'use client';

import React, { useState, useEffect } from 'react';
import ImagePanel from './ImagePanel';
import HintButton from './HintButton';
// import './styles.css'; // Optional CSS


// Sample differences data (coordinates)
const differences = [
  { id: 1, x: 50, y: 300, radius: 30 },
  { id: 2, x: 170, y: 290, radius: 30 },
  { id: 3, x: 305, y: 240, radius: 30 },
];

const SpotGame: React.FC = () => {
  const [foundDifferences, setFoundDifferences] = useState<number[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Check if the game is complete
  useEffect(() => {
    if (foundDifferences.length === differences.length) {
      alert('🎉 Congratulations! You found all the differences!');
    }
  }, [foundDifferences]);

  // Handle clicks on the altered image
  const handleClick = (x: number, y: number) => {
    console.log(x,y)
    const found = differences.find(
      (diff) =>
        Math.sqrt((diff.x - x) ** 2 + (diff.y - y) ** 2) <= diff.radius &&
        !foundDifferences.includes(diff.id)
    );

    if (found) {
      setFoundDifferences((prev) => [...prev, found.id]);
    }
  };

  return (
    <div className="game-board">
      <div className="images-container">
        <ImagePanel image="/images/original.png" />
        <ImagePanel
          image="/images/duplicate.png"
          onImageClick={handleClick}
          foundDifferences={foundDifferences}
          differences={differences}
        />
      </div>
      <div className="controls">
        <p>Found Differences: {foundDifferences.length} / {differences.length}</p>
        <HintButton onHintUsed={() => setHintsUsed(hintsUsed + 1)} />
      </div>
    </div>
  );
};

export default SpotGame;
