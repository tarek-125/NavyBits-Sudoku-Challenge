import React, { useState, useEffect } from 'react';
import './Board.css';
import Cell from './Cell';
import { isValidSudoku } from './utils';

const generateRandomBoard = () => {
    const newBoard = Array.from({ length: 9 }, () => Array(9).fill(''));
    const filledCells = 20; // عدد الخلايا التي سيتم ملؤها عشوائيًا
  
    const isSafeToPlace = (board: string[][], row: number, col: number, num: string): boolean => {
      // تحقق من الصف
      if (board[row].includes(num)) return false;
  
      // تحقق من العمود
      for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
      }
  
      // تحقق من المربع الفرعي 3×3
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[startRow + i][startCol + j] === num) return false;
        }
      }
  
      return true;
    };
  
    let count = 0;
    while (count < filledCells) {
      const randomRow = Math.floor(Math.random() * 9);
      const randomCol = Math.floor(Math.random() * 9);
      const randomNumber = String(Math.floor(Math.random() * 9) + 1);
  
      // إذا كانت الخلية فارغة والرقم صالح، قم بتعبئتها
      if (newBoard[randomRow][randomCol] === '' && isSafeToPlace(newBoard, randomRow, randomCol, randomNumber)) {
        newBoard[randomRow][randomCol] = randomNumber;
        count++;
      }
    }
  
    return newBoard;
  };

const Board: React.FC = () => {
  const [board, setBoard] = useState<string[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  useEffect(() => {
    setBoard(generateRandomBoard());
  }, []);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  const handleNumberClick = (number: string) => {
    if (selectedCell) {
      const [row, col] = selectedCell;

      // لا تقم بتغيير القيم العشوائية المحددة مسبقًا
      if (board[row][col] !== '') return;

      const updatedBoard = [...board];
      updatedBoard[row][col] = number;
      setBoard(updatedBoard);
      setSelectedCell(null); // قم بإلغاء التحديد بعد إدخال الرقم
    }
  };

  const handleSubmit = () => {
    if (isValidSudoku(board)) {
      alert('Congratulations! You solved the Sudoku!');
    } else {
      alert('Invalid solution. Please try again.');
    }
  };

  const handleRestart = () => {
    setBoard(generateRandomBoard());
    setSelectedCell(null);
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

      {/* الأزرار */}
      <div className="actions">
        <button className="submit-button" onClick={handleSubmit}>
          Check Solution
        </button>
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Board;
