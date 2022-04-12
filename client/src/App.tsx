import React, { useEffect, useState } from 'react';
import { socket } from './services/socket';

import './App.css';


//const socket = io("http://localhost:5000");

function App() {

  const [gameId, setGameId] = useState('');
 
  socket.on("connect", () => {
    console.log(socket.connected); // true
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  const createNewGame = () => {
    socket.emit("create game", (response: any) => {
      console.log(response);
      //if ok navigate to game
      //else show error
    });
  }
  const joinGame = () => {
    socket.emit("join game", gameId, (response: any) => {
      console.log(response);
      //if ok navigate to game
      //else show error
    });
  }

  socket!.on('gameList', (games: any) => {
    console.log(games);
  })

  return (
    <div className="App">
      <header className="App-header">
        <input type="button" value="create new game" onClick={createNewGame} />
        <input type="text" value={gameId} onChange={(e) => setGameId(e.target.value)} />
        <input type="button" value="join a Game" onClick={joinGame} />
      </header>
    </div>
  );
}

export default App;
