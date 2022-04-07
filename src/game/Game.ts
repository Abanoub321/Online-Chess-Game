import Board from "../Board";
import Player from "../player/Player";
import GameStatus from "../GameStatusEnum";

export default class Game {
    board: Board;
    player1: Player;
    player2: Player = null as any;
    status: string
    
    constructor(player: Player) {
        this.board = new Board();
        this.player1 = player;
        this.status = GameStatus.WAITING_FOR_PLAYERS;
    }

    joinGame(player2: Player) {
        if(this.status !== GameStatus.WAITING_FOR_PLAYERS)
            throw new Error('Game is not waiting for players');
        this.player2 = player2;
        this.status = GameStatus.STARTED;    
    }
}