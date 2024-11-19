export const isValidSudoku = (board: string[][]): boolean => {
    // تحقق من صحة الحل (مثال بسيط)
    for (let i = 0; i < 9; i++) {
      const row = new Set<string>();
      const col = new Set<string>();
  
      for (let j = 0; j < 9; j++) {
        // التحقق من الصفوف
        if (board[i][j] && row.has(board[i][j])) return false;
        if (board[i][j]) row.add(board[i][j]);
  
        // التحقق من الأعمدة
        if (board[j][i] && col.has(board[j][i])) return false;
        if (board[j][i]) col.add(board[j][i]);
      }
    }
    return true;
  };
  