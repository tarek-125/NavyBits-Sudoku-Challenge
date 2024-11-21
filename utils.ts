export const N: number = 9;

export type SudokuGrid = number[][];

export function isValidSudoku(grid: SudokuGrid): boolean {
  for (let row = 0; row < N; row++) {
    const rowSet = new Set<number>();
    const colSet = new Set<number>();
    for (let col = 0; col < N; col++) {
      if (grid[row][col] !== 0) {
        if (rowSet.has(grid[row][col])) return false;
        rowSet.add(grid[row][col]);
      }

      if (grid[col][row] !== 0) {
        if (colSet.has(grid[col][row])) return false;
        colSet.add(grid[col][row]);
      }
    }
  }

  for (let startRow = 0; startRow < N; startRow += 3) {
    for (let startCol = 0; startCol < N; startCol += 3) {
      const subgridSet = new Set<number>();
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const value = grid[startRow + row][startCol + col];
          if (value !== 0) {
            if (subgridSet.has(value)) return false;
            subgridSet.add(value);
          }
        }
      }
    }
  }
  return true;
}

export function isSafe(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  for (let x = 0; x < N; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}
export const checkConflicts = (board: number[][]): number[] => {
    const conflicts = new Set<number>();
  
    // التحقق من الصفوف
    board.forEach((row, rowIndex) => {
      const seen = new Map<number, number>();
      row.forEach((value, colIndex) => {
        if (value !== 0) {
          const cellIndex = rowIndex * board.length + colIndex;
          if (seen.has(value)) {
            conflicts.add(seen.get(value)!);
            conflicts.add(cellIndex);
          } else {
            seen.set(value, cellIndex);
          }
        }
      });
    });
  
    // التحقق من الأعمدة
    for (let col = 0; col < board.length; col++) {
      const seen = new Map<number, number>();
      for (let row = 0; row < board.length; row++) {
        const value = board[row][col];
        if (value !== 0) {
          const cellIndex = row * board.length + col;
          if (seen.has(value)) {
            conflicts.add(seen.get(value)!);
            conflicts.add(cellIndex);
          } else {
            seen.set(value, cellIndex);
          }
        }
      }
    }
  
    // التحقق من المناطق 3x3
    for (let regionRow = 0; regionRow < 3; regionRow++) {
      for (let regionCol = 0; regionCol < 3; regionCol++) {
        const seen = new Map<number, number>();
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            const value = board[regionRow * 3 + row][regionCol * 3 + col];
            if (value !== 0) {
              const cellIndex =
                (regionRow * 3 + row) * board.length + (regionCol * 3 + col);
              if (seen.has(value)) {
                conflicts.add(seen.get(value)!);
                conflicts.add(cellIndex);
              } else {
                seen.set(value, cellIndex);
              }
            }
          }
        }
      }
    }
  
    return Array.from(conflicts);
  };
  