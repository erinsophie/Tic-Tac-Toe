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

})();








