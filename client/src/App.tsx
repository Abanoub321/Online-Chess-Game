import React, { useEffect, useState } from 'react';
import { socket } from './services/socket';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { HomeRoute } from './routes/HomeRoute';
import { GameRoute } from './routes/GameRoute';


//const socket = io("http://localhost:5000");

function App() {

  //const [gameId, setGameId] = useState('');

  socket.on("connect", () => {
    console.log(socket.connected); // true
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  /*  const createNewGame = () => {
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
    }*/

  return (

    <Routes>
      <Route path="/" element={<HomeRoute socket={socket} />} />
      <Route path="game/:gameId" element={<GameRoute />} />
    </Routes>

  );
}

export default App;
