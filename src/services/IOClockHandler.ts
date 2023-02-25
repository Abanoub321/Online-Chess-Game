import Game from "../game/Game";
import GameStatus from "../GameStatusEnum";

const handleClocks = (io: any, game: Game) => {
    if (game.status === GameStatus.STARTED) {
        const tickIntervalId = setInterval(() => {
            let whitePlayer = game.player1.color === "white" ? game.player1 : game.player2;
            let blackPlayer = game.player1.color === "black" ? game.player1 : game.player2;
            io.to(whitePlayer.name).emit('clock-tick', {
                whitePlayerTime: whitePlayer.currentGameTime,
                blackPlayerTime: blackPlayer.currentGameTime
            })
            io.to(blackPlayer.name).emit('clock-tick', {
                whitePlayerTime: whitePlayer.currentGameTime,
                blackPlayerTime: blackPlayer.currentGameTime
            })

        }, 1000);
        game.gameIntervalId = tickIntervalId;
    }
    else if (game.status == GameStatus.BLACK_WON || game.status == GameStatus.WHITE_WON)
        clearInterval(game.gameIntervalId!)
}

export default handleClocks;