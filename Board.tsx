import  { useState } from 'react';
import './Board.css';

const Board = () => {
  const initialBoard = Array.from({ length: 9 }, () => Array(9).fill(''));
  const [board, setBoard] = useState(initialBoard);

  const handleChange = (row: number, col: number, value: string) => {
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            className="cell"
            type="text"
            maxLength={1}
            value={cellValue}
            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
          />
        ))
      )}
    </div>
  );
};

export default Board;
