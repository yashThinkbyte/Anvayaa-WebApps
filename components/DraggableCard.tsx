import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface DraggableCardProps {
  id: string;
  name: string;
  index: number;
  onMoveUp?: () => void; // Optional, only used in sequence game
  onMoveDown?: () => void; // Optional, only used in sequence game
  showButtons?: boolean; // Toggle buttons for moving up/down
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  name,
  index,
  onMoveUp,
  onMoveDown,
  showButtons = false,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`card p-4 mb-2 bg-blue-300 rounded flex items-center justify-between ${
            snapshot.isDragging ? 'dragging' : ''
          }`}
        >
          <span>{name}</span>
          {showButtons && (
            <div className="flex gap-2">
              <button onClick={onMoveUp} className="bg-green-500 px-2 py-1 rounded text-white">
                ↑
              </button>
              <button onClick={onMoveDown} className="bg-red-500 px-2 py-1 rounded text-white">
                ↓
              </button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableCard;
