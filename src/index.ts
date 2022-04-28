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
    socket.emit('gameList', availableGames);

    socket.on('create game', (cb: Function) => {

        try {
            players[socket.id].createNewGame();
            let game = players[socket.id].game;
            games[game!.id] = game!;
            socket.join(`room-${game!.id}`);
            cb({
                status: "OK",
                gameId: game!.id,
                board: game!.board,
                gameStatus: game!.status
            });
            let availableGames = Object.keys(games).filter(gameId => {
                return games[gameId].status === GameStatus.WAITING_FOR_PLAYERS;
            });
            socket.broadcast.emit('gameList', availableGames);
        } catch (error: Error | any) {
            console.log(error);
            cb({
                status: "NOT OK",
                error: error.message
            })
        }
    })

    socket.on('join game', (gameId: string, cb: Function) => {

        try {
            let game = games[gameId];
            players[socket.id].joinGame(game!);
            socket.join(`room-${game?.id}`);
            cb({
                status: "OK",
                gameId: game!.id,
                board: game!.board,
                gameStatus: game!.status
            });
            let availableGames = Object.keys(games).filter(gameId => {
                return games[gameId].status === GameStatus.WAITING_FOR_PLAYERS;
            });

            socket.to(`room-${game?.id}`).emit('gameUpdates', {
                gameId: game!.id,
                board: game!.board,
                gameStatus: game!.status
            });
            socket.broadcast.emit('gameList', availableGames);
        } catch (error: Error | any) {
            console.log(error);
            cb({
                status: "NOT OK",
                error: error.message
            })
        }
    });
    socket.on('check-for-move', (gameId: string, playerId: string, move: { x: number, y: number }, cb) => {
        let player = players[playerId];
        let game = games[gameId];
        const { x, y } = move;
        try {
            let availableMoves = game?.avialableMoves(player, x, y);
            cb({
                status: "OK",
                availableMoves
            })
        } catch (error: Error | any) {
            console.log(error.message);
            cb({
                status: "NOT OK",
                error: error.message
            })
        }
    })
    socket.on('make-move', (gameId: string, playerId: string, oldMove: { x: number, y: number }, newMove: { x: number, y: number }, cb) => {
        let player = players[playerId];
        let game = games[gameId];

        try {
            game?.movePiece(player, oldMove.x, oldMove.y, newMove.x, newMove.y);
            socket.to(`room-${game?.id}`).emit('move made', game?.board);
            cb({
                status: "OK",
                board: game?.board
            })
        } catch (error: Error | any) {
            console.log(error.message);
            cb({
                status: "NOT OK",
                error: error.message
            })
        }
    });
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