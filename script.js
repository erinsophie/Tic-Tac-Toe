// PLAYER FACTORY FUNCTION
const Player = (marker) => {
  const getMarker = () => marker;
  return { getMarker };
};

// MODULE FOR GAME BOARD
const GameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const updateBoard = (index, value) => {
    board[index] = value;
  };

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  return { getBoard, updateBoard, resetBoard };
})();

// MODULE FOR GAME LOGIC
const Game = (() => {
  const player1 = Player('X');
  const player2 = Player('O');
  let currentPlayer = player1;
  let gameOver = false;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });

  function handleCellClick() {
    // get cell index from data index attribute
    const cellIndex = parseInt(this.dataset.index);

    // gets the current status of the board by accessing the board array and passing in the current index of the cell that was clicked
    // checks if that cell is already filled
    if (GameBoard.getBoard()[cellIndex] !== '') {
      return;
    }

    // if it's empty, the board array is passed the current cell's index
    //which makes the current cell index equal the current player's marker
    GameBoard.updateBoard(cellIndex, currentPlayer.getMarker());
    // the text content of each cell div is updated with the marker
    this.textContent = currentPlayer.getMarker();

    // check if winner or draw is true, if neither are true, then switch player
    if (checkWin()) {
      endGame(`Player ${currentPlayer.getMarker()} wins!`);
    } else if (checkDraw()) {
      endGame("It's a draw!");
    } else {
      switchPlayer();
    }
  }

  ////////////////////////////////////////////////////////////////////

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    playerTurn.textContent = `Player ${currentPlayer.getMarker()}'s turn`;
  }

  function checkWin() {
    // retrieve board status from GameBoard object
    const board = GameBoard.getBoard();
    // check for winner using destructuring assignment to extract the 3 cell indices for each possible winning combo from winningCombinations array
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      // then check if all 3 indices have the same markers
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  // gets the current state of the board and checks if every cell is filled
  function checkDraw() {
    const board = GameBoard.getBoard();
    return board.every((cell) => cell !== '');
  }

  // when this is called gameover is set to true
  function endGame(message) {
    gameOver = true;
    modal.classList.add('active');
    overlay.classList.add('active');
    const endGameMsg = document.querySelector('.message');
    endGameMsg.textContent = message;
  }

  function resetGame() {
    GameBoard.resetBoard();
    currentPlayer = player1;
    playerTurn.textContent = `Player ${currentPlayer.getMarker()}'s turn`;
    gameOver = false;
    cells.forEach((cell) => {
      cell.textContent = '';
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    resetGame();
  }

  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const resetBtn = document.querySelector('.reset-btn');
  const playerTurn = document.querySelector('.player-turn');
  resetBtn.addEventListener('click', resetGame);
  overlay.addEventListener('click', closeModal);

  return { resetGame };
})();
