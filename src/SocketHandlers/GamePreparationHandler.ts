import GameStatus from '../GameStatusEnum';

const GamePreparationHandler = (io: any, socket: any, games: any, players: any) => {
    const createGame = (cb: Function) => {

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

    }

    const joinGame = (gameId: any, cb: Function) => {
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
    }

    socket.on("create game", createGame);
    socket.on("join game", joinGame);
}

export default GamePreparationHandler;