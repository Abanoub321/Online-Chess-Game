import { isCastlingAvailable } from '../services/CheckCastling';
import King from './King';
import Piece from './Piece';

export default class Rook extends Piece {
    hasMoved: boolean;

    constructor(color: string, column: string, row: number) {
        super('rook', color, column, row);
        this.hasMoved = false;
    }

    getMoves(pieces: Piece[]): string[] {
        const moves: string[] = [];
        const row = this.row;
        const column = this.column;

        for (let i = this.row - 1; i >= 1; i--) {
            if (pieces.find(piece => piece.row == i && piece.column == column)) {
                break;
            }
            moves.push(`${column}${i}`);
        }
        for (let i = this.row + 1; i <= 8; i++) {
            if (pieces.find(piece => piece.row == i && piece.column == column)) {
                break;
            }
            moves.push(`${column}${i}`);
        }
        for (let i = column.charCodeAt(0) + 1; i <= 72; i++) {
            if (pieces.find(piece => piece.row == row && piece.column == String.fromCharCode(i))) {
                break;
            }
            moves.push(`${String.fromCharCode(i)}${row}`);
        }
        for (let i = column.charCodeAt(0) - 1; i >= 65; i--) {
            if (pieces.find(piece => piece.row == row && piece.column == String.fromCharCode(i))) {
                break;
            }
            moves.push(`${String.fromCharCode(i)}${row}`);
        }




        if (isCastlingAvailable(pieces, this)) {
            moves.push(`E${this.row}`);
        }
        return moves;
    }

    move(position: string, pieces: Piece[]): void {
        const row = parseInt(position[1]);
        const column = position.charAt(0);
        if (this.isValidMove(this.getMoves(pieces), position) || this.isValidMove(this.getKillMoves(pieces), position)) {
            if (
                column == 'E' &&
                isCastlingAvailable(pieces, this)
            ) {
                const king: King | any = pieces.find((piece: Piece) => piece.type === 'king' && piece.color === this.color);
                if (this.column == 'H') {
                    this.column = 'F'
                    king.column = 'G'
                } else {
                    this.column = 'D';
                    king.column = 'C';
                }
                king.hasMoved = true;
            } else {

                this.hasMoved = true;
                this.row = row;
                this.column = column;
            }
            this.hasMoved = true;
        } else
            throw new Error('Invalid position');

    }

    isValidMove(moves: string[], position: string): boolean {
        const row = parseInt(position[1]);
        const column = position.charAt(0);
        let found = moves.find(move => move === position);
        if (!found)
            return false;
        if (row < 1 || row > 8 || column < 'A' || column > 'H')
            return false;
        return true;
    }

    getKillMoves(pieces: Piece[]): string[] {
        const moves: string[] = [];
        const row = this.row;
        const column = this.column;

        let locations: { [key: string]: boolean } = {};
        pieces.forEach(piece => {
            locations[piece.column + piece.row] = true;
        });

        for (let i = this.row - 1; i >= 1; i--) {
            if (pieces.find(piece => piece.row == i && piece.column == column && piece.color != this.color)) {
                moves.push(`${column}${i}`);
                break;
            }
            if (locations[column + i])
                break;
        }
        for (let i = this.row + 1; i <= 8; i++) {
            if (pieces.find(piece => piece.row == i && piece.column == column && piece.color != this.color)) {
                moves.push(`${column}${i}`);
                break;
            }
            if (locations[column + i])
                break;
        }
        for (let i = column.charCodeAt(0) + 1; i <= 72; i++) {
            if (pieces.find(piece => piece.row == row && piece.column == String.fromCharCode(i) && piece.color != this.color)) {
                moves.push(`${String.fromCharCode(i)}${row}`);
                break;
            }
            if (locations[String.fromCharCode(i) + row])
                break;
        }
        for (let i = column.charCodeAt(0) - 1; i >= 65; i--) {
            if (pieces.find(piece => piece.row == row && piece.column == String.fromCharCode(i) && piece.color != this.color)) {
                moves.push(`${String.fromCharCode(i)}${row}`);
                break;
            }
            if (locations[String.fromCharCode(i) + row])
                break;
        }
        return moves;
    }
}

