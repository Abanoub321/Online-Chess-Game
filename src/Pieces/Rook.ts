import Piece from './Piece';

export default class Rook extends Piece {
    hasMoved: boolean;

    constructor(color: string) {
        super('rook', color);
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

        return moves;
    }

    move(position: string, pieces: Piece[]): void {
        const row = parseInt(position[1]);
        const column = position.charAt(0);
        if (this.isValidMove(this.getMoves(pieces), position)) {
            this.hasMoved = true;
            this.row = row;
            this.column = column;
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
        for (let i = this.row - 1; i >= 1; i--) {
            if (pieces.find(piece => piece.row == i && piece.column == column && piece.color != this.color)) {
                moves.push(`${column}${i}`);
                break;
            }
        }
        for (let i = this.row + 1; i <= 8; i++) {
            if (pieces.find(piece => piece.row == i && piece.column == column && piece.color != this.color)) {
                moves.push(`${column}${i}`);
                break;
            }
        }
        for (let i = column.charCodeAt(0) + 1; i <= 72; i++) {
            if (pieces.find(piece => piece.row == row && piece.column == String.fromCharCode(i) && piece.color != this.color)) {
                moves.push(`${String.fromCharCode(i)}${row}`);
                break;
            }
        }
        for (let i = column.charCodeAt(0) - 1; i >= 65; i--) {
            if (pieces.find(piece => piece.row == row && piece.column == String.fromCharCode(i) && piece.color != this.color)) {
                moves.push(`${String.fromCharCode(i)}${row}`);
                break;
            }
        }
        return moves;
    }
}