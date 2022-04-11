import { Server } from "socket.io";
const uuid = require("uuid");
import Game from "./game/Game";
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

    let joinedPlayer = new Player(socket.id);
    players[socket.id] = joinedPlayer;
    
    socket.emit('gameList', games);

    socket.on('create game', () => {
        try {
            players[socket.id].createNewGame();
            let game = players[socket.id].game;
            games[game!.id] = game!;
            socket.join(`room-${game!.id}`);
            socket.emit('created game', {
                gameId: game!.id,
                board: game!.board
            });
        } catch (error: Error | any) {
            console.log(error);
        }
    })

    socket.on('join game', (gameId: string) => {
        try {
            let game = games[gameId];
            players[socket.id].joinGame(game!);
            socket.join(`room-${game?.id}`);
            socket.to(`room-${game?.id}`).emit('joined game', game?.board);
        } catch (error: Error | any) {
            console.log(error);
        }
    });

});