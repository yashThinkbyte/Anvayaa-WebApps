// components/GameBoard.tsx
"use client";
import React from 'react';
import { useGameStore } from '@/hooks/useGameStore';
import Card from './Card';

interface CardType {  // Define the CardType interface based on your card data structure
  id: number;
  image: string;
  flipped: boolean;
  matched: boolean;
}

const GameBoard = () => {
  const { cards } = useGameStore();  // Zustand store should return CardType[]

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card: CardType) => (  // Add type to the card parameter
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default GameBoard;
