// app/game/page.tsx
import React from 'react';
import GameBoard from '@/components/SequenceGameBoard';

const GamePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Arrange them in order</h1>
      <GameBoard />
    </div>
  );
};

export default GamePage;
