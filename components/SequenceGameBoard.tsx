"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import DropZone from './DropZone';

// Define the type for a card
interface Card {
    id: string;
    name: string;
}

// Helper function to shuffle an array
const shuffleArray = (array: Card[]): Card[] => {
    return array.sort(() => Math.random() - 0.5);
};

const GameBoard: React.FC = () => {
    const correctOrder: Card[] = [
        { id: '1', name: 'Brush your Teeth' },
        { id: '2', name: 'Take a bath' },
        { id: '3', name: 'Eat your breakfast' },
        { id: '4', name: 'Eat Lunch' },
        { id: '5', name: 'Eat dinner' },
        { id: '6', name: 'Sleep' },
    ];

    const [cards, setCards] = useState<Card[]>(() => shuffleArray([...correctOrder]));
    const [isGameOver, setIsGameOver] = useState(false);
    const [hasShuffled, setHasShuffled] = useState(false);

    useEffect(() => {
        if (!hasShuffled) {
            setCards(shuffleArray([...correctOrder]));
            setHasShuffled(true); // Ensure shuffling only happens once
        }
    }, [hasShuffled]);

    useEffect(() => {
        const isCorrect = cards.every((card, index) => card.id === correctOrder[index].id);
        console.log('Checking order:', cards, isCorrect);

        if (isCorrect) {
            setIsGameOver(true);
            alert('Congratulations! You have arranged the steps in the correct order!');
        }
    }, [cards]); // Re-run when cards state changes

    const handleOnDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination || source.index === destination.index) return;

        const updatedCards = Array.from(cards);
        const [movedCard] = updatedCards.splice(source.index, 1);
        updatedCards.splice(destination.index, 0, movedCard);
        setCards(updatedCards);
    };

    const moveUp = (index: number) => {
        if (index <= 0 || isGameOver) return;
        const updatedCards = Array.from(cards);
        [updatedCards[index - 1], updatedCards[index]] = [updatedCards[index], updatedCards[index - 1]];
        setCards(updatedCards);
    };

    const moveDown = (index: number) => {
        if (index >= cards.length - 1 || isGameOver) return;
        const updatedCards = Array.from(cards);
        [updatedCards[index], updatedCards[index + 1]] = [updatedCards[index + 1], updatedCards[index]];
        setCards(updatedCards);
    };

    if (isGameOver) {
        return <h1 className="text-center mt-10 text-green-500">🎉 Congratulations! Game Over! 🎉</h1>;
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="flex h-screen justify-center items-center">
                <DropZone id="vertical-droppable" items={cards}>
                    {cards.map((card, index) => (
                        <DraggableCard
                            key={card.id}
                            id={card.id}
                            name={card.name}
                            index={index}
                            onMoveUp={() => moveUp(index)}
                            onMoveDown={() => moveDown(index)}
                            showButtons={true}
                        />
                    ))}
                </DropZone>
            </div>
        </DragDropContext>
    );
};

export default GameBoard;
