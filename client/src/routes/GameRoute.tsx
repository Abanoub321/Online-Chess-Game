import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GameBoard } from '../components/GameBoard/GameBoard';
import { socket } from '../services/socket';
export const GameRoute = () => {
  const location: any = useLocation();
  const [gameStatus, setGameStatus] = useState(location.state.gameStatus);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState('white');
  const [playerColor, setPlayerColor] = useState('white');
  const [gameId, setGameId] = useState(location.state.gameId);
  const [flipped, setFlipped] = useState(false);
  const [gameBoard, setGameBoard] = useState(location.state.board);

  useEffect(() => {
  //  if (!flipped)
}, [])


useEffect(() => {
  console.log('updated')
  //flipBoard(gameBoard);
  }, [])
  socket.on('gameStarted', data => {
    console.log(data);
    const { gameStatus, currentPlayerTurn } = data;
    setGameStatus(gameStatus);
    setCurrentPlayerTurn(currentPlayerTurn);
  })

  socket.on('playerColor', data => {
    console.log(data);
    setPlayerColor(data.playerColor);
  })
  socket.once('move-made', (response: any) => {
    const { gameStatus, currentPlayerTurn, board } = response;
    
      setGameStatus(gameStatus);
      setCurrentPlayerTurn(currentPlayerTurn);
      console.log(board[0]);
      setGameBoard(board);
      console.log(gameBoard[0]);
    
  })



  const flipBoard = (board: []) => {
    let newBoard = board;
    setFlipped(true);
    setGameBoard(newBoard.reverse());
  }
  return (
    <div>
      <h1>{gameStatus.toLowerCase().split('_').join(' ')}</h1>
      <h4>Now it's {currentPlayerTurn} turn</h4>
      <GameBoard
        board={gameBoard}
        gameStatus={gameStatus}
        currentPlayerTurn={currentPlayerTurn}
        playerColor={playerColor}
        gameId={gameId}
      />
      <h4>you are {playerColor}</h4>
    </div>
  );
};