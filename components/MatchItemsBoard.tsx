"use client";

import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import Droppable from "./Droppable";

// Initial animals and food items data
const animals = [
  { id: "1", name: "Lion" },
  { id: "2", name: "Cow" },
  { id: "3", name: "Monkey" },
];

const foodItems = [
  { id: "2", name: "Grass" },
  { id: "1", name: "Meat" },
  { id: "3", name: "Banana" },
  { id: "4", name: "Empty" },
];

const GameBoard: React.FC = () => {
  const [food, setFood] = useState(foodItems);

  // Handle drag-and-drop logic
  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedFood = Array.from(food);
    const [movedItem] = updatedFood.splice(source.index, 1);
    updatedFood.splice(destination.index, 0, movedItem);

    setFood(updatedFood);
  };

  const isMatched = (index: number) =>
    animals[index] && food[index] && animals[index].id === food[index].id;

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex h-screen p-8 space-x-8">
        {/* Left Panel: Animals */}
        <div className="w-1/2">
          <h2 className="text-center mb-4">Animals</h2>
          {animals.map((animal, index) => (
            <div key={`animal-${animal.id}`} className="flex items-center mb-4">
              <span>{animal.name}</span>
              <div
                className={`ml-2 h-6 w-6 rounded-full ${
                  isMatched(index) ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Right Panel: Food Items */}
        <div className="w-1/2">
          <h2 className="text-center mb-4">Food Items</h2>
          {food.map((item, index) => (
            <Droppable key={`droppable-${index}`} droppableId={`droppable-${index}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-full h-16 mb-2 border rounded flex items-center justify-center transition-all ${
                    snapshot.isDraggingOver ? "shadow-lg" : ""
                  }`}
                >
                  {item.id !== "empty" ? (
                    <DraggableCard
                      key={`draggable-${item.id}`}
                      id={item.id}
                      name={item.name}
                      index={index}
                    />
                  ) : (
                    <span>Empty</span>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default GameBoard;
