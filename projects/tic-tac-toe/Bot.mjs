function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export class Bot1 {
  constructor(piece) {
    this.piece = piece;
    this.name = "Talgat";
  }

  move(board) {
    // console.log(
    // 	"%c Talgat - board -> ",
    // 	"background: #222; color: royalblue",
    // 	board
    // );
    // let i = getRandomInt(0, 9);
    // while (board[i] !== 0) {
    // 	i = getRandomInt(0, 9);
    // }
    // console.log(
    // 	"%c Talgat - i -> ",
    // 	"background: #222; color: royalblue",
    // 	i
    // );
    // return i;
    let bestScore = -1000;
    let bestMove;
    const newBoard = [...board];
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === 0) {
        newBoard[i] = 1;
        const score = minimax(newBoard, 0, false);
        newBoard[i] = 0;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }

    }
    return bestMove;
  }
}

export class Bot2 {
  constructor(piece) {
    this.piece = piece;
    this.name = "Abat";
  }

  move(board) {
    console.log(
      "%c Abat - board -> ",
      "background: #222; color: royalblue",
      board
    );
    let i = getRandomInt(0, 9);
    while (board[i] !== 0) {
      i = getRandomInt(0, 9);
    }
    console.log("%c Abat - i -> ", "background: #222; color: royalblue", i);
    return i;


  }
}

// [0 1 2] // [3 4 5] // [6 7 8] // horizontal
function minimax(board, depth, isMax) {
  let score = checkWinner(board);

  // If Maximizer has won the game
  // return his/her evaluated score
  if (score === 1)
    return score;

  // If Minimizer has won the game
  // return his/her evaluated score
  if (score === -1)
    return score;

  if (score === "tie")
    return 0;
  // If this maximizer's move
  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === 0) {
        board[i] = 1;
        best = Math.max(best, minimax(board,
          depth + 1, false));
        board[i] = 0;
      }
    }
    return best;
  }

  // If this minimizer's move
  else {
    let best = 1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === 0) {
        board[i] = -1;
        best = Math.min(best, minimax(board,
          depth + 1, true));
        board[i] = 0;
      }
    }
    return best;
  }
}

function checkWinner(board) {
  let winner = null; // [0 1 2] // [3 4 5] // [6 7 8] // horizontal

  if (board[0] === board[1] && board[1] === board[2] && board[0] !== 0) {
    if (board[0] === 1) winner = 1;
    else winner = -1;
  }
  if (board[3] === board[4] && board[4] === board[5] && board[3] !== 0) {
    if (board[3] === 1) winner = 1;
    else winner = -1;
  }
  if (board[6] === board[7] && board[7] === board[8] && board[6] !== 0) {
    if (board[6] === 1) winner = 1;
    else winner = -1;
  }

  // Vertical
  if (board[0] === board[3] && board[3] === board[6] && board[0] !== 0) {
    if (board[0] === 1) winner = 1;
    else winner = -1;
  }
  if (board[1] === board[4] && board[4] === board[7] && board[1] !== 0) {
    if (board[1] === 1) winner = 1;
    else winner = -1;
  }
  if (board[2] === board[5] && board[5] === board[8] && board[2] !== 0) {
    if (board[2] === 1) winner = 1;
    else winner = -1;
  }

  // Diagonal
  if (board[0] === board[4] && board[4] === board[8] && board[0] !== 0) {
    if (board[0] === 1) winner = 1;
    else winner = -1;
  }
  if (board[2] === board[4] && board[4] === board[6] && board[2] !== 0) {
    if (board[2] === 1) winner = 1;
    else winner = -1;
  }

  let openSpots = 0;
  for (let i = 0; i < 9; i++) {
    if (board[i] === 0) {
      openSpots++;
    }
  }

  if (winner === null && openSpots === 0) {
    return "tie";
  } else {
    return winner;
  }
}