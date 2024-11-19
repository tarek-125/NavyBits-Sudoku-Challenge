import React from 'react';


interface CellProps {
  value: string;
  isSelected: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, isSelected, onClick }) => {
  return (
    <div
      className={`cell ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Cell;
