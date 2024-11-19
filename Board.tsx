import { useState } from 'react';
import './Board.css';

const Board = () => {
  const initialBoard = Array.from({ length: 9 }, () => Array(9).fill(''));
  const [board, setBoard] = useState(initialBoard);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null); 


  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col }); 
  };


  const handleNumberClick = (number: string) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newBoard = [...board];
      newBoard[row][col] = number; 
      setBoard(newBoard);
    }
  };

  return (
    <div className="board-container">

      <div className="number-row">
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className="number"
            onClick={() => handleNumberClick((i + 1).toString())} 
          >
            {i + 1}
          </div>
        ))}
      </div>


    <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'selected' : ''}`} 
              type="text"
              maxLength={1}
              value={cellValue}
              onClick={() => handleCellClick(rowIndex, colIndex)} 
              readOnly 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
