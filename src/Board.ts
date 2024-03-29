import color from "./ColorEnum";
import Game from "./game/Game";
import GameStatus from "./GameStatusEnum";
import Bishop from "./Pieces/Bishop";
import King from "./Pieces/King";
import Knight from "./Pieces/Knight";
import Pawn from "./Pieces/Pawn";
import Piece from "./Pieces/Piece";
import Queen from "./Pieces/Queen";
import Rook from "./Pieces/Rook";
import types from "./TypeEnum";

export default class Board {

    pieces: Piece[];
    constructor() {
        this.pieces = new Array();
        this.initializePieces();
    }

    initializePieces() {
        for (let i = 0, j = 65; i < 8; i++, j++) {
            this.pieces.push(new Pawn(color.white, String.fromCharCode(j), 2));
        }
        for (let i = 0, j = 65; i < 8; i++, j++) {
            this.pieces.push(new Pawn(color.black, String.fromCharCode(j), 7));
        }

        this.pieces.push(new Rook(color.white, 'A', 1));
        this.pieces.push(new Rook(color.white, 'H', 1));
        this.pieces.push(new Rook(color.black, 'A', 8));
        this.pieces.push(new Rook(color.black, 'H', 8));

        this.pieces.push(new Knight(color.white, 'B', 1));
        this.pieces.push(new Knight(color.white, 'G', 1));
        this.pieces.push(new Knight(color.black, 'B', 8));
        this.pieces.push(new Knight(color.black, 'G', 8));

        this.pieces.push(new Bishop(color.white, 'C', 1));
        this.pieces.push(new Bishop(color.white, 'F', 1));
        this.pieces.push(new Bishop(color.black, 'C', 8));
        this.pieces.push(new Bishop(color.black, 'F', 8));

        for (let i = 0; i < 2; i++) {
            this.pieces.push(new Queen((i % 2 == 0) ? color.white : color.black, 'D', (i % 2 == 0) ? 1 : 8));
            this.pieces.push(new King((i % 2 == 0) ? color.white : color.black, 'E', (i % 2 == 0) ? 1 : 8));
        }
    }

    getPieces() {
        return this.pieces;
    }

    getBoard(): { type: string, color: string }[][] {
        let board: { type: string, color: string }[][] = new Array();
        for (let i = 0; i < 8; i++) {
            board.push(new Array());
            for (let j = 0; j < 8; j++) {
                board[i].push(null as any);
            }
        }
        this.pieces.forEach((piece) => {
            board[piece.row - 1][piece.column.charCodeAt(0) - 65] = {
                type: piece.type,
                color: piece.color
            };
        });
        return board;
    }
    getPieceMoves(row: number, column: number): { row: number, column: number }[] {
        let pieceMoves = new Array();

        row = row + 1;
        let columnChar = String.fromCharCode(column + 65);

        let piece = this.pieces.find((p) => p.row == row && p.column == columnChar);
        let moves = piece!.getMoves(this.pieces);

        moves.forEach(move => {
            row = parseInt(move.charAt(1)) - 1;
            column = move.charCodeAt(0) - 65;

            pieceMoves.push({
                row,
                column
            });
        })

        return pieceMoves;
    }

    getPieceAttackMoves(row: number, column: number): { row: number, column: number }[] {
        let pieceMoves = new Array();
        row = row + 1;
        let columnChar = String.fromCharCode(column + 65);

        let piece = this.pieces.find((p) => p.row == row && p.column == columnChar);
        let moves = piece!.getKillMoves(this.pieces);

        moves.forEach(move => {
            row = parseInt(move.charAt(1)) - 1;
            column = move.charCodeAt(0) - 65;
            pieceMoves.push({
                row,
                column
            });
        });
        return pieceMoves;
    }

    movePiece(row: number, column: number, newRow: number, newCol: number): void | string {
        row = row + 1;
        let columnChar = String.fromCharCode(column + 65);

        let piece = this.pieces.find((p) => p.row == row && p.column == columnChar);
        try {
            let position = `${String.fromCharCode(newCol + 65)}${newRow + 1}`;
            let isAkillMove = piece?.getKillMoves(this.pieces).includes(position);
            piece!.move(position, this.pieces);
            if (isAkillMove) {
                let killedPieceIndex = this.pieces.findIndex((p) => p.row == newRow + 1 && p.column == String.fromCharCode(newCol + 65) && p.color !== piece!.color);
                this.pieces.splice(killedPieceIndex, 1);
            }

        } catch (e: any) {
            console.log(e);
            return e.message;
        }
    }

    isKingThreatened(color: string): boolean {
        let kingIndex = this.pieces.findIndex((p) => p.type == types.king && p.color == color);
        let king: King | any = this.pieces[kingIndex];
        let location = `${king.column}${king.row}`;
        if (king.isThreatened(location, this.pieces, kingIndex)) {
            return true;
        }
        return false;
    }

    checkIfLost(color: string): boolean {
        if (this.getDefendAllies(color).length > 0)
            return false;
        return true
    }
    getDefendAllies = (color: string): Piece[] => {
        let defenders: Piece[] = [];
        let allies = this.pieces.filter(p => p.color == color);

        for (let i = 0; i < allies.length; i++) {
            let ally: Piece = allies[i];
            if (this.availFakeMoves(ally).length > 0) {
                defenders.push(ally);
                continue;
            }
            if (this.availFakeKillMoves(ally).length > 0)
                defenders.push(ally);
        }

        return defenders;
    }
    availFakeMoves = (piece: Piece): { row: number, column: number }[] => {
        let fakeMoves: { row: number, column: number }[] = []

        let kingIndex = this.pieces.findIndex((p) => p.type == types.king && piece.color == p.color);
        let king: King | any = this.pieces[kingIndex];

        let row = piece.row;
        let col = piece.column;
        let moves = piece.getMoves(this.pieces);
        for (let j = 0; j < moves.length; j++) {
            let move = moves[j];
            let newRow = parseInt(move.charAt(1));
            let newCol = move[0];
            piece.column = newCol;
            piece.row = newRow;
            if (!king.isThreatened(`${king.column}${king.row}`, this.pieces, kingIndex)) {
                piece.row = row;
                piece.column = col;
                fakeMoves.push({
                    row: newRow - 1,
                    column: newCol.charCodeAt(0) - 65
                })
            }
            piece.row = row;
            piece.column = col;
        }
        return fakeMoves;
    }
    availFakeKillMoves = (piece: Piece): { row: number, column: number }[] => {
        let fakeMoves: { row: number, column: number }[] = []

        let kingIndex = this.pieces.findIndex((p) => p.type == types.king && piece.color == p.color);
        let king: King | any = this.pieces[kingIndex];
        let row = piece.row;
        let col = piece.column;

        let killMoves = piece.getKillMoves(this.pieces);
        for (let j = 0; j < killMoves.length; j++) {
            let move = killMoves[j];
            let newRow = parseInt(move.charAt(1));
            let newCol = move[0];

            let tempPieces = this.pieces.filter(p => !(p.column == newCol && p.row == newRow));
            let kingIndex = tempPieces.findIndex((p) => p.type == types.king && p.color == piece.color);
            if (kingIndex == -1)
                continue;
            if (!king.isThreatened(`${king.column}${king.row}`, tempPieces, kingIndex)) {
                piece.row = row;
                piece.column = col;
                fakeMoves.push({
                    row: newRow - 1,
                    column: newCol.charCodeAt(0) - 65
                })
            }

            piece.row = row;
            piece.column = col;
        }

        return fakeMoves;
    }
    promotePawn(index: number, promoteTo: string) {
        if (promoteTo === types.bishop)
            this.pieces[index] = new Bishop(this.pieces[index].color, this.pieces[index].column, this.pieces[index].row);
        else if (promoteTo === types.knight)
            this.pieces[index] = new Knight(this.pieces[index].color, this.pieces[index].column, this.pieces[index].row);
        else if (promoteTo === types.queen)
            this.pieces[index] = new Queen(this.pieces[index].color, this.pieces[index].column, this.pieces[index].row);
        else if (promoteTo === types.rook)
            this.pieces[index] = new Rook(this.pieces[index].color, this.pieces[index].column, this.pieces[index].row);
    }

    getKingsPosition(){
        let whiteKingIndex = this.pieces.findIndex((p) => p.type == types.king && p.color == 'white');
        let blackKingIndex = this.pieces.findIndex((p) => p.type == types.king && p.color == 'black');
        let whiteKing: King | any = this.pieces[whiteKingIndex];
        let blackKing: King | any = this.pieces[blackKingIndex];
        return {
            whiteKing: {
                row: whiteKing.row,
                column: whiteKing.column
            },
            blackKing: {
                row: blackKing.row,
                column: blackKing.column
            }
        }
    }
}