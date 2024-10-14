import React from 'react';
import SpotGame from '@/components/SpotGameBoard';

const SpotDifference: React.FC = () => {
  return (
    <div className="app-container">
      <h1 className="text-center">Spot the Difference Game</h1>
      <SpotGame />
    </div>
  );
};

export default SpotDifference;
