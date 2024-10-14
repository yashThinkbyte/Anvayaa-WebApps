import React from 'react';
import Droppable from './Droppable';

interface DropZoneProps {
  id: string;
  items: { id: string; name: string }[];
  children: React.ReactNode;
}

const DropZone: React.FC<DropZoneProps> = ({ id, items, children }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-80 bg-gray-200 p-4 rounded"
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DropZone;
