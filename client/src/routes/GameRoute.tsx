import { useLocation } from 'react-router-dom';
import { GameBoard } from '../components/GameBoard/GameBoard';
//import { socket } from '../services/socket';
export const GameRoute = () => {
  //board

  const location: any = useLocation();
  const { board } = location.state;
  return (
    <div>
      <GameBoard board={board} />
    </div>
  );
};