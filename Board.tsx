import React, { useState } from 'react';
import './Board.css';
import Cell from './Cell';
import { isValidSudoku } from './utils';

const Board: React.FC = () => {
  const initialBoard = Array.from({ length: 9 }, () => Array(9).fill(''));
  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  const handleNumberClick = (number: string) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      const updatedBoard = [...board];
      updatedBoard[row][col] = number;
      setBoard(updatedBoard);
      setSelectedCell(null); // إلغاء تحديد الخلية بعد الكتابة
    }
  };

  const handleSubmit = () => {
    if (isValidSudoku(board)) {
      alert('Congratulations! You solved it!');
    } else {
      alert('Incorrect solution. Try again!');
    }
  };

  return (
    <div className="board-container">
      {/* أرقام الإدخال */}
      <div className="number-row">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => (
          <div
            key={number}
            className="number"
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </div>
        ))}
      </div>

      {/* اللوحة */}
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cellValue}
              isSelected={
                selectedCell
                  ? selectedCell[0] === rowIndex && selectedCell[1] === colIndex
                  : false
              }
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>

      {/* زر التحقق */}
      <button className="submit-button" onClick={handleSubmit}>
        Check Solution
      </button>
    </div>
  );
};

export default Board;
