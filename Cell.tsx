import React from 'react';

interface CellProps {
  value: string;
  isSelected: boolean;
  onClick: () => void;
  highlight?: string; // لون الخلفية (اختياري)
}

const Cell: React.FC<CellProps> = ({ value, isSelected, onClick, highlight }) => {
  return (
    <div
      className={`cell ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      style={{ backgroundColor: highlight }}
    >
      {value}
    </div>
  );
};

export default Cell;
