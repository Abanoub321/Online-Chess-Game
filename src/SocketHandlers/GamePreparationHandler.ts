import GameStatus from '../GameStatusEnum';
import Player from '../player/Player';

const GamePreparationHandler = (io: any, socket: any, games: any, players: { [id: string]: Player }) => {
    const createGame = (gameTime: number, incrementTime: number, cb: Function) => {

        try {
            players[socket.id].createNewGame(gameTime, incrementTime);
            let game = players[socket.id].game;
            games[game!.id] = game!;
            socket.join(`room-${game!.id}`);
            cb({
                status: "OK",
                gameId: game!.id,
                board: game?.board?.getBoard(),
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

    }

    const joinGame = (gameId: any, cb: Function) => {
        try {
            let game = games[gameId];
            players[socket.id].joinGame(game!);
            socket.join(`room-${game?.id}`);

            cb({
                status: "OK",
                playerColor: players[socket.id].color,
                gameId: game!.id,
                board: game!.board?.getBoard(),
                gameStatus: game!.status,
            });
            io.in(`room-${game?.id}`).emit('gameStarted', {
                // playerColor: players[socket.id].name == game.player1.name ? game.player2.color : game.player1.color,
                gameId: game!.id,
                board: game!.board?.getBoard(),
                gameStatus: game!.status,
                currentPlayerTurn: game!.currentPlayer.color,
            });

            let player1 = game!.player1;
            let player2 = game!.player2;

            io.to(`${player1.name}`).emit('playerColor', {
                playerColor: player1.color,
            })

            io.to(`${player2.name}`).emit('playerColor', {
                playerColor: player2.color,
            })

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
    }

    socket.on("create game", createGame);
    socket.on("join game", joinGame);
}

export default GamePreparationHandler;