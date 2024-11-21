import React, { useState, useEffect } from 'react';
import './Board.css';
import Cell from './Cell';
import { N, isSafe, solveSudoku, checkConflicts } from './utils';

const Board: React.FC = () => {
  const [board, setBoard] = useState<string[][]>([]);
  const [conflicts, setConflicts] = useState<number[]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [difficulty, setDifficulty] = useState<string>('Medium');

  const initializeBoard = (level: string) => {
    let uniqueSolution = false;
    let finalBoard: number[][] = [];

    // مولد اللوحة مع التأكد من وجود حل فريد
    while (!uniqueSolution) {
      const emptyBoard = Array.from({ length: N }, () => Array(N).fill(0));
      let numPrefilledCells: number;

      switch (level) {
        case 'Easy':
          numPrefilledCells = 25;
          break;
        case 'Medium':
          numPrefilledCells = 20;
          break;
        case 'Hard':
          numPrefilledCells = 15;
          break;
        default:
          numPrefilledCells = 23;
      }

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

      // تحقق من وجود حل فريد
      if (solveSudoku(emptyBoard) === 1) {
        uniqueSolution = true;
        finalBoard = [...emptyBoard];
      }
    }

    // حذف الأرقام لإنشاء اللغز
    let cellsToRemove: number;
    switch (level) {
      case 'Easy':
        cellsToRemove = 56;
        break;
      case 'Medium':
        cellsToRemove = 61;
        break;
      case 'Hard':
        cellsToRemove = 66;
        break;
      default:
        cellsToRemove = 58;
    }

    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * N);
      const col = Math.floor(Math.random() * N);

      if (finalBoard[row][col] !== 0) {
        finalBoard[row][col] = 0;
        cellsToRemove--;
      }
    }

    const textBoard = finalBoard.map((row) =>
      row.map((cell) => (cell === 0 ? '' : cell.toString()))
    );

    setBoard(textBoard);
    setConflicts([]);
  };

  useEffect(() => {
    initializeBoard(difficulty);
  }, [difficulty]);

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
      updatedBoard[row][col] = number;
      setBoard(updatedBoard);
      updateConflicts(updatedBoard);
      setSelectedCell(null);
    }
  };

  const handleRestart = () => {
    initializeBoard(difficulty);
    setSelectedCell(null);
  };

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value);
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
            const cellIndex = rowIndex * N + colIndex;
            const isConflict = conflicts.includes(cellIndex);

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
                highlight={isConflict ? '#f8d7da' : undefined}
              />
            );
          })
        )}
      </div>

      <div className="actions">
        <div className="restart-container">
          <button className="restart-button" onClick={handleRestart}>
            Restart Game
          </button>
          <select
            className="difficulty-dropdown"
            value={difficulty}
            onChange={handleDifficultyChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Board;
