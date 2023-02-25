import { Server ,Socket} from "socket.io";
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

    socket.on("disconnect", (reason) => {
        console.log("disconnected", socket.id)
        const game = Object.values(games).find((game: any) => game.player1.name === socket.id || game.player2.name === socket.id);
        if (game) {
            if (game.status === GameStatus.STARTED) {
                let leftPlayer = players[socket.id];
                games[game.id].status = leftPlayer.color === 'white' ? GameStatus.BLACK_WON : GameStatus.WHITE_WON;
                io.to(`room-${games[game.id].id}`).emit('game-ended', {
                    gameStatus: games[game.id].status,
                    winner: games[game.id].status === GameStatus.WHITE_WON ? 'white' : 'black'
                });
            }
            else {
                delete games[game.id];
                
                let availableGames = Object.keys(games).filter(gameId => {
                    return games[gameId].status === GameStatus.WAITING_FOR_PLAYERS;
                });
                
                for(let player of Object.keys(players)){
                    io.to(player).emit('gameList', availableGames);
                }
            }
        }
        delete players[socket.id];
    });
});