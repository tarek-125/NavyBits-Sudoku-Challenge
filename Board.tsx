import React, { useState, useEffect } from 'react';
import './Board.css';
import Cell from './Cell';
import { isValidSudoku, N, SudokuGrid, isSafe, checkConflicts } from './utils';

const Board: React.FC = () => {
  const [board, setBoard] = useState<string[][]>([]);
  const [conflicts, setConflicts] = useState<number[]>([]); // حالة لتتبع الخلايا المتضاربة
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  const initializeBoard = () => {
    const emptyBoard = Array.from({ length: N }, () => Array(N).fill(0));
    const numPrefilledCells = 10;

    let count = 0;
    while (count < numPrefilledCells) {
      const row = Math.floor(Math.random() * N);
      const col = Math.floor(Math.random() * N);
      const num = Math.floor(Math.random() * 9) + 1;

      if (emptyBoard[row][col] === 0 && isSafe(emptyBoard, row, col, num)) {
        emptyBoard[row][col] = num;
        count++;
      }
    }

    const textBoard = emptyBoard.map((row) =>
      row.map((cell) => (cell === 0 ? '' : cell.toString()))
    );

    setBoard(textBoard);
    setConflicts([]); // إعادة تعيين التعارضات
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const updateConflicts = (updatedBoard: string[][]) => {
    const numericBoard = updatedBoard.map((row) =>
      row.map((cell) => (cell === '' ? 0 : parseInt(cell)))
    );
    const conflictIndices = checkConflicts(numericBoard);
    setConflicts(conflictIndices);
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  const handleNumberClick = (number: string) => {
    if (selectedCell) {
      const [row, col] = selectedCell;

      const updatedBoard = [...board];
      updatedBoard[row][col] = number; // إدخال الرقم في الخلية
      setBoard(updatedBoard); // تحديث اللوحة
      updateConflicts(updatedBoard); // تحديث التعارضات
      setSelectedCell(null); // إلغاء تحديد الخلية
    }
  };

  const handleRestart = () => {
    initializeBoard();
    setSelectedCell(null);
  };

  return (
    <div className="board-container">
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

      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => {
            const cellIndex = rowIndex * N + colIndex; // حساب الفهرس 1D
            const isConflict = conflicts.includes(cellIndex); // التحقق من التعارض

            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cellValue}
                isSelected={
                  selectedCell
                    ? selectedCell[0] === rowIndex && selectedCell[1] === colIndex
                    : false
                }
                onClick={() => handleCellClick(rowIndex, colIndex)}
                highlight={isConflict ? '#f8d7da' : undefined} // لون تعارض
              />
            );
          })
        )}
      </div>

      <div className="actions">
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Board;
