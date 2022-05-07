
const GameHandler = (io: any, socket: any, games: any, players: any) => {

    const checkForMove = (gameId: string, playerId: string, move: { x: number, y: number }, cb: any) => {
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
    }

    const makeMove = (gameId: string, playerId: string, oldMove: { x: number, y: number }, newMove: { x: number, y: number }, cb: any) => {
        let player = players[playerId];
        let game = games[gameId];

        try {
            game?.movePiece(player, oldMove.x, oldMove.y, newMove.x, newMove.y);
            cb({
                status: "OK",
            })
            io.in(`room-${game?.id}`).emit('move-made', {
                board: game?.board?.getBoard(),
                gameStatus: game!.status,
                currentPlayerTurn: game!.currentPlayer.color,
            });
        } catch (error: Error | any) {
            console.log(error.message);
            cb({
                status: "NOT OK",
                error: error.message
            })
        }
    }
    const promote = (gameId: string, playerId: string, promoteTo: string, cb: Function) => {
        let player = players[playerId];
        let game = games[gameId];
        game?.promotePawn(player, promoteTo);
        cb({
            status: "OK",
        })
        io.in(`room-${game?.id}`).emit('move-made', {
            board: game?.board?.getBoard(),
            gameStatus: game!.status,
            currentPlayerTurn: game!.currentPlayer.color,
        });
    }

    socket.on("check-for-move", checkForMove);
    socket.on("make-move", makeMove);
    socket.on('promote', promote)
}

export default GameHandler;