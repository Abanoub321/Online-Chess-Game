import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GameBoard } from '../components/GameBoard/GameBoard';
import { socket } from '../services/socket';
export const GameRoute = () => {
  const location: any = useLocation();
  const [gameStatus, setGameStatus] = useState(location.state.gameStatus);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState('white');
  const [playerColor,setPlayerColor] = useState('white');
  const [gameId,setGameId] = useState(location.state.gameId);
  const { board } = location.state;

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
  return (
    <div>
      <h1>{gameStatus.toLowerCase().split('_').join(' ')}</h1>
      <h4>Now it's {currentPlayerTurn} turn</h4>
      <GameBoard
        board={board}
        gameStatus={gameStatus}
        currentPlayerTurn={currentPlayerTurn}
        playerColor={playerColor}
        gameId={gameId}
      />
      <h4>you are {playerColor}</h4>
    </div>
  );
};