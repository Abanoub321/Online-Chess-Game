import { Server } from "socket.io";
const uuid = require("uuid");
import GamePreparationHandler from "./SocketHandlers/GamePreparationHandler";
import GameHandler from "./SocketHandlers/GameHandler";
import Game from "./game/Game";
import GameStatus from "./GameStatusEnum";
import Player from "./player/Player";

const io = new Server(5000, {
    cors: {
        origin: "*",
    }
});


const players: { [id: string]: Player } = {};
const games: { [id: string]: Game } = {};

io.engine.generateId = (req: any) => {
    return uuid.v4(); // must be unique across all Socket.IO servers
}

io.on("connection", (socket) => {
    console.log(socket.id)
    let joinedPlayer = new Player(socket.id);
    players[socket.id] = joinedPlayer;

    let availableGames = Object.keys(games).filter(gameId => {
        return games[gameId].status === GameStatus.WAITING_FOR_PLAYERS;
    });
    socket.emit('gameList', availableGames);

    GamePreparationHandler(io, socket, games, players);
    GameHandler(io, socket, games, players);

    socket.on("disconnecting", (reason) => {

        for (const room of socket.rooms) {
            if (room !== socket.id) {
                socket.to(room).emit("player left", socket.id);

                if (games[room.replace("room-", "")].status === GameStatus.STARTED) {
                    let leftPlayer = players[socket.id];
                    games[room.split("-")[1]].status = leftPlayer.color === 'white' ? GameStatus.BLACK_WON : GameStatus.WHITE_WON;
                    delete games[room];
                }
            }
        }
        delete players[socket.id];
    });
});