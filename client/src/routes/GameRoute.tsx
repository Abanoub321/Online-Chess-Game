import '../App.css'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GameBoard } from '../components/GameBoard/GameBoard';
import { socket } from '../services/socket';
import { Turn } from '../components/Turn';
import { NumberColumn } from '../components/GameBoard/NumberColumn';
import { LetterRow } from '../components/GameBoard/LetterRow';
export const GameRoute = () => {
  const location: any = useLocation();
  const [gameStatus, setGameStatus] = useState(location.state.gameStatus);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState('white');
  const [playerColor, setPlayerColor] = useState('white');
  const [gameBoard, setGameBoard] = useState(location.state.board);
  const gameId = location.state.gameId;

  socket.on('gameStarted', data => {
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
    setGameBoard(board);
  })

  return (
    <>
      <div className='Game_Page' >
        <h1>{gameStatus != 'STARTED' ? gameStatus.toLowerCase().split('_').join(' ') : null}</h1>
        <div className='Game_layer'>
          <NumberColumn currentColor={playerColor} />
          <GameBoard
            board={gameBoard}
            gameStatus={gameStatus}
            currentPlayerTurn={currentPlayerTurn}
            playerColor={playerColor}
            gameId={gameId}
          />
          <Turn color={currentPlayerTurn} />
        </div>
       
          <LetterRow currentColor={playerColor} />
      </div>
    </>
  );
};