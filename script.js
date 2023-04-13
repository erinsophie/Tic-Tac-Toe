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
    [2, 4, 6]
  ];

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  // functionm first gets the current status of the board by accessing the board array and passing in the current index of the cell that was clicked
  // it then checks if that cell is already filled 
  // if it's empty, the board array is passed the current cell's index and the current player's marker as arguments 
  //which updates the array, making the current cell index equal the current player's marker
  // it then updates the cell's text content in the UI

  function handleCellClick() {
    const cellIndex = parseInt(this.dataset.index);

    if (GameBoard.getBoard()[cellIndex] !== '') {
      return;
    }
    GameBoard.updateBoard(cellIndex, currentPlayer.getMarker());
    this.textContent = currentPlayer.getMarker();

  }

})();








