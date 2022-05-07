const uuid = require("uuid");
import Board from "../Board";
import Player from "../player/Player";
import GameStatus from "../GameStatusEnum";
import color from "../ColorEnum";
import Piece from "../Pieces/Piece";

export default class Game {

    id: string;
    board: Board;
    player1: Player;
    player2: Player = null as any;
    status: string
    currentPlayer: Player | undefined;

    constructor(player: Player) {
        this.id = uuid.v4();
        this.board = new Board();
        this.player1 = player;
        this.status = GameStatus.WAITING_FOR_PLAYERS;
    }

    joinGame(player2: Player) {
        if (this.status !== GameStatus.WAITING_FOR_PLAYERS)
            throw new Error('Game is not waiting for players');
        this.player2 = player2;
        this.status = GameStatus.STARTED;
        this.assignColors();
        this.assignCurrentPlayer();
    }

    assignColors() {
        const colors = [color.black, color.white];
        const randomIndex = Math.floor(Math.random() * colors.length);
        this.player1.color = colors[randomIndex];
        this.player2.color = colors[randomIndex === 0 ? 1 : 0];
    }
    assignCurrentPlayer() {
        this.currentPlayer = this.player1.color === color.white ? this.player1 : this.player2;
    }

    avialableMoves(player: Player, x: number, y: number): { normal: Array<{ row: number, column: number }>, attack: Array<{ row: number, column: number }> } {

        if (this.status === GameStatus.WAITING_FOR_PLAYERS)
            throw new Error('Game not started');
        if (this.status === GameStatus.WHITE_WON || this.status === GameStatus.BLACK_WON)
            throw new Error('Game is over');
        if (player.color !== this.currentPlayer!.color)
            throw new Error('Player is not current player');
        let piece = this.board.getBoard()[x][y];

        if (piece == null)
            throw new Error('Player should choose piece');
        if (piece.color !== player.color)
            throw new Error('Piece is not yours');
        let normal: { row: number, column: number }[], attack: { row: number, column: number }[];
        normal = attack = [];
        if (this.status === GameStatus.WHITE_CHECKMATE || this.status === GameStatus.BLACK_CHECKMATE) {
            let defenders = this.board.getDefendAllies(piece.color);
            let defendingPiece: Piece | undefined = defenders.find(p => p.row === x + 1 && p.column === String.fromCharCode(y + 65))
            if (defendingPiece) {
                normal = this.board.availFakeMoves(defendingPiece);
                attack = this.board.availFakeKillMoves(defendingPiece);
            }
        } else {
            normal = this.board.getPieceMoves(x, y)
            attack = this.board.getPieceAttackMoves(x, y);
        }
        return {
            normal,
            attack
        }
    }

    movePiece(player: Player, row: number, column: number, newRow: number, newColumn: number) {
        if (player.color !== this.currentPlayer!.color)
            throw new Error('Player is not current player');
        if (this.board.getBoard()[row][column].color !== player.color)
            throw new Error('Piece is not yours');
        this.board.movePiece(row, column, newRow, newColumn);
        if (this.board.isKingThreatened(this.currentPlayer?.color === color.white ? color.black : color.white)) {
            this.status = this.currentPlayer?.color != 'white' ? GameStatus.WHITE_CHECKMATE : GameStatus.BLACK_CHECKMATE;
            if (this.board.checkIfLost(this.currentPlayer?.color === color.white ? color.black : color.white)) {
                this.status = this.currentPlayer?.color === color.white ? GameStatus.WHITE_WON : GameStatus.BLACK_WON;
            }
        }
        else {
            this.status = GameStatus.STARTED;
        }
        this.swapTurns();
    }

    swapTurns() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }
}