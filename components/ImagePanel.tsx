import React from 'react';
import DifferenceMarker from './DifferenceMarker';

interface ImagePanelProps {
  image: string;
  onImageClick?: (x: number, y: number) => void;
  foundDifferences?: number[];
  differences?: { id: number; x: number; y: number; radius: number }[];
}

const ImagePanel: React.FC<ImagePanelProps> = ({
  image,
  onImageClick,
  foundDifferences = [],
  differences = [],
}) => {
  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLImageElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (onImageClick) {
      onImageClick(x, y);
    }
  };

  return (
    <div className="image-panel" onClick={handleClick}>
      <img src={image} alt="Spot the Difference" className="game-image" />
      {foundDifferences.map((id) => {
        const diff = differences.find((d) => d.id === id);
        return diff ? (
          <DifferenceMarker key={id} x={diff.x} y={diff.y} radius={diff.radius} />
        ) : null;
      })}
    </div>
  );
};

export default ImagePanel;
