import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GameBoard } from '../components/GameBoard/GameBoard';
import { socket } from '../services/socket';
export const GameRoute = () => {
  const location: any = useLocation();
  const [gameStatus,setGameStatus] = useState(location.state.gameStatus);
  const { board } = location.state;
  
  socket.on('gameUpdates',data =>{
    console.log(data);
    const {gameStatus} = data;
    setGameStatus(gameStatus);
  })
  return (
    <div>
      <h1>{gameStatus.toLowerCase().split('_').join(' ')}</h1>
      <GameBoard board={board} />
    </div>
  );
};