import '../App.css'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-overlays/Modal';
import { GameBoard } from '../components/GameBoard/GameBoard';
import { socket } from '../services/socket';
import { Turn } from '../components/Turn';
import { NumberColumn } from '../components/GameBoard/NumberColumn';
import { LetterRow } from '../components/GameBoard/LetterRow';
import { ModalMatcher } from '../components/ModalComponents/ModalMatcher';
import { ClockComponent } from '../components/GameBoard/ClockComponent';



export const GameRoute = () => {
  const location: any = useLocation();
  const [gameStatus, setGameStatus] = useState(location.state.gameStatus);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState('white');
  const [playerColor, setPlayerColor] = useState('white');
  const [kingsPosition, setKingsPosition] = useState({
    whiteKing: {
      row: 0,
      column: 4
    }, blackKing: {
      row: 7,
      column: 4
    }
  });
  
  const [gameBoard, setGameBoard] = useState(location.state.board);
  const [show, setShow] = useState(false);
  const gameId = location.state.gameId;


  useEffect(() => {
    if (gameStatus === 'WHITE_PROMOTE' && playerColor === 'white')
      setShow(true);
    else if (gameStatus === 'BLACK_PROMOTE' && playerColor === 'black')
      setShow(true);
  }, [gameStatus])

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
    const { gameStatus, currentPlayerTurn, board, kingsPosition } = response;
    setGameStatus(gameStatus);
    setCurrentPlayerTurn(currentPlayerTurn);
    setGameBoard(board);
    setKingsPosition(kingsPosition);
  })

  socket.on('game-ended', (response: any) => {
    const { gameStatus, winner } = response;
    setGameStatus(gameStatus);
  })

  
  const promotePawn = (type: string) => {
    socket.emit('promote', gameId, socket.id, type, (response: any) => {
      console.log(response);
    });
    setShow(false);
  }
  return (
    <>
      <div className='Game_Page' >
        <h1>{gameStatus === 'WAITING_FOR_PLAYERS' || gameStatus === 'WHITE WON' || gameStatus === 'BLACK WON' ? gameStatus.toLowerCase().split('_').join(' ') : null}</h1>
        <div className='Game_layer'>
          <NumberColumn currentColor={playerColor} />
          <GameBoard
            board={gameBoard}
            gameStatus={gameStatus}
            currentPlayerTurn={currentPlayerTurn}
            playerColor={playerColor}
            gameId={gameId}
            kingsPosition={kingsPosition}
          />
          {/* <Turn color={currentPlayerTurn} /> */}
          <ClockComponent playerColor={playerColor}>
            <Turn color={currentPlayerTurn} />
          </ClockComponent>
        </div>

        <LetterRow currentColor={playerColor} />
        <Modal
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="modal-label"
          enforceFocus
          className='modal-guts'
        >
          <ModalMatcher color={playerColor} onClick={promotePawn} />
        </Modal>
      </div>
    </>
  );
};

