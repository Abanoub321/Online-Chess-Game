import { Server } from "socket.io";
const uuid = require("uuid");
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
    socket.to(socket.id).emit('gameList', availableGames);

    socket.on('create game', (cb: Function) => {
        console.log('called create game');
        try {
            players[socket.id].createNewGame();
            let game = players[socket.id].game;
            games[game!.id] = game!;
            socket.join(`room-${game!.id}`);
            cb({
                status: "OK",
                gameId: game!.id,
                board: game!.board
            });
            let availableGames = Object.keys(games).filter(gameId => {
                return games[gameId].status === GameStatus.WAITING_FOR_PLAYERS;
            });
            socket.emit('gameList', availableGames);
        } catch (error: Error | any) {
            console.log(error);
            cb({
                status: "NOT OK",
                error: error.message
            })
        }
    })

    socket.on('join game', (gameId: string, cb: Function) => {
        console.log('called join game');
        try {
            let game = games[gameId];
            players[socket.id].joinGame(game!);
            socket.join(`room-${game?.id}`);
            socket.to(`room-${game?.id}`).emit('joined game', game?.board);
            cb({
                status: "OK",
                gameId: game!.id,
                board: game!.board
            });
            let availableGames = Object.keys(games).filter(gameId => {
                return games[gameId].status === GameStatus.WAITING_FOR_PLAYERS;
            });
            socket.emit('gameList', availableGames);
        } catch (error: Error | any) {
            console.log(error);
            cb({
                status: "NOT OK",
                error: error.message
            })
        }
    });
   /* socket.on("disconnecting", (reason) => {
        console.log('called disconnecting game');
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                socket.to(room).emit("player left", socket.id);
                if (games[room.split("-")[1]].status === GameStatus.STARTED) {
                    let leftPlayer = players[socket.id];
                    games[room.split("-")[1]].status = leftPlayer.color === 'white' ? GameStatus.BLACK_WON : GameStatus.WHITE_WON;
                }
            }
        }
        delete players[socket.id];
    });*/
});