// PLAYER FACTORY FUNCTION
const Player = (marker) => {
  const getMarker = () => marker;
  return { getMarker };
};

// COMPUTER FACTORY FUNCTION
const ComputerPlayer = (marker) => {
  const getMarker = () => marker;

  const getMove = (board) => {
    const availableCells = [];
    board.forEach((cell, index) => {
      if (cell === '') {
        availableCells.push(index);
      }
    });
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    return availableCells[randomIndex];
  };
  return { getMarker, getMove };
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
  let computerPlayer = ComputerPlayer('O');
  const state = {
    computerModeOn: false,
    playerModeOn: true,
  };

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

  ////////////////////////////////////////////////////////////////////

  const gameMode = document.querySelector('.game-mode');

  function displayGameMode() {
    let currentMode;
    if (state.computerModeOn === true) {
      currentMode = 'Computer mode ✔';
    } else {
      currentMode = 'Player mode ✔';
    }
    return (gameMode.textContent = currentMode);
  }

  ////////////////////////////////////////////////////////////////////

  const computerBtn = document.querySelectorAll('.computer-btn');
  computerBtn.forEach(button => button.addEventListener('click', setComputerMode));

  function setComputerMode() {
    state.computerModeOn = true;
    state.playerModeOn = false;
    closeModal();
    displayGameMode();
  }

  const playerBtn = document.querySelectorAll('.player-btn');
  playerBtn.forEach(button => button.addEventListener('click', setPlayerMode));

  function setPlayerMode() {
    state.playerModeOn = true;
    state.computerModeOn = false;
    closeModal();
    displayGameMode();
  }

  ////////////////////////////////////////////////////////////////////

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });

  ////////////////////////////////////////////////////////////////////

  function handleOutcome() {
    if (checkWin()) {
      endGame(`Player ${currentPlayer.getMarker()} wins!`);
    } else if (checkDraw()) {
      endGame("It's a draw!");
    } else {
      switchPlayer();
    }
  }

  function handleCellClick() {
    const cellIndex = parseInt(this.dataset.index);

    if (GameBoard.getBoard()[cellIndex] !== '') {
      return;
    }
    GameBoard.updateBoard(cellIndex, currentPlayer.getMarker());
    this.textContent = currentPlayer.getMarker();
    handleOutcome();
  }

  ////////////////////////////////////////////////////////////////////

  function switchPlayer() {
    //if in computer mode
    if (state.computerModeOn === true) {
      currentPlayer = currentPlayer === player1 ? computerPlayer : player1;

      if (currentPlayer === computerPlayer) {
        // retrieve available cells
        const computerMove = computerPlayer.getMove(GameBoard.getBoard());
        GameBoard.updateBoard(computerMove, currentPlayer.getMarker());

        setTimeout(() => {
          cells[computerMove].textContent = currentPlayer.getMarker();
          handleOutcome();
        }, 500);

        playerTurn.textContent = `Player ${currentPlayer.getMarker()}'s turn`;
      }
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    playerTurn.textContent = `Player ${currentPlayer.getMarker()}'s turn`;
  }

  ////////////////////////////////////////////////////////////////////

  function checkWin() {
    const board = GameBoard.getBoard();

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  ////////////////////////////////////////////////////////////////////

  function checkDraw() {
    const board = GameBoard.getBoard();
    return board.every((cell) => cell !== '');
  }

  ////////////////////////////////////////////////////////////////////

  function endGame(message) {
    gameOver = true;
    modal.classList.add('active');
    overlay.classList.add('active');
    const endGameMsg = document.querySelector('.message');
    endGameMsg.textContent = message;
  }

  ////////////////////////////////////////////////////////////////////

  function resetGame() {
    GameBoard.resetBoard();
    currentPlayer = player1;
    playerTurn.textContent = `Player ${currentPlayer.getMarker()}'s turn`;
    gameOver = false;
    cells.forEach((cell) => {
      cell.textContent = '';
    });
  }

  ////////////////////////////////////////////////////////////////////

  function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    modeModal.classList.remove('active')
    resetGame();
  }

  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  overlay.addEventListener('click', closeModal);
  const resetBtn = document.querySelector('.reset-btn');
  resetBtn.addEventListener('click', resetGame);
  const playerTurn = document.querySelector('.player-turn');

  ////////////////////////////////////////////////////////////////////

  const chooseMode = document.querySelector('.choose-mode');
  chooseMode.addEventListener('click', setMode);
  const modeModal = document.querySelector('.mode-modal');

  function setMode() {
    modeModal.classList.add('active');
    overlay.classList.add('active');
  }

  ////////////////////////////////////////////////////////////////////

  return {
    state,
    setComputerMode,
    setPlayerMode,
  };
})();
