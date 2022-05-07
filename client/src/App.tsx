import './App.css';
import { socket } from './services/socket';
import { Routes, Route } from "react-router-dom";
import { HomeRoute } from './routes/HomeRoute';
import { GameRoute } from './routes/GameRoute';

function App() {

  return (

    <Routes>
      <Route path="/" element={<HomeRoute socket={socket} />} />
      <Route path="game/:gameId" element={<GameRoute />} />
    </Routes>

  );
}

export default App;
