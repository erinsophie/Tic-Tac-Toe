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









