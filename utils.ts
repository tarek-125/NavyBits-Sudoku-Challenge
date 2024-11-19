export const isValidSudoku = (board: string[][]): boolean => {
    // تحقق بسيط من صحة اللعبة
    const isValidRow = (row: string[]) =>
      row.filter((val) => val !== '').length === new Set(row).size;
  
    const isValidColumn = (colIndex: number) => {
      const column = board.map((row) => row[colIndex]);
      return isValidRow(column);
    };
  
    const isValidSubGrid = (rowStart: number, colStart: number) => {
      const values: string[] = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          values.push(board[rowStart + i][colStart + j]);
        }
      }
      return isValidRow(values);
    };
  
    for (let i = 0; i < 9; i++) {
      if (!isValidRow(board[i]) || !isValidColumn(i)) return false;
    }
  
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        if (!isValidSubGrid(i, j)) return false;
      }
    }
  
    return true;
  };
  