import React from 'react';

interface DifferenceMarkerProps {
  x: number;
  y: number;
  radius: number;
}

const DifferenceMarker: React.FC<DifferenceMarkerProps> = ({ x, y, radius }) => {
  return (
    <div
      className="difference-marker"
      style={{
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
      }}
    ></div>
  );
};

export default DifferenceMarker;
