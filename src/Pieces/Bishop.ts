import Piece from './Piece';


export default class Bishop extends Piece {

    constructor(color: string, column: string, row: number) {
        super('bishop', color, column, row);
    }
    getMoves(pieces: Piece[]): string[] {

        let moves: string[] = [];
        let row = this.row;
        let column = this.column;
        let left: number, right: number;
        left = column.charCodeAt(0) - 1;
        right = column.charCodeAt(0) + 1;
        for (let i = row - 1; i >= 1; i--) {
            pieces.forEach(piece => {
                if (piece.row === i && piece.column === String.fromCharCode(left)) {
                    left = 64;
                }
                if (piece.row === i && piece.column === String.fromCharCode(right)) {
                    right = 73;
                }
            });
            if (left < 65 && right > 72) break;
            if (left >= 65) {
                moves.push(`${String.fromCharCode(left)}${i}`);
                left--;
            }
            if (right <= 72) {
                moves.push(`${String.fromCharCode(right)}${i}`);
                right++;
            }
        }
        left = column.charCodeAt(0) - 1;
        right = column.charCodeAt(0) + 1;

        for (let i = row + 1; i <= 8; i++) {
            pieces.forEach(piece => {
                if (piece.row === i && piece.column === String.fromCharCode(left)) {
                    left = 64;
                }
                if (piece.row === i && piece.column === String.fromCharCode(right)) {
                    right = 73;
                }
            });
            if (left < 65 && right > 72) break;
            if (left >= 65) {
                moves.push(`${String.fromCharCode(left)}${i}`);
                left--;
            }
            if (right <= 72) {
                moves.push(`${String.fromCharCode(right)}${i}`);
                right++;
            }
        }
        return moves;
    }
    move(position: string, pieces: Piece[]): void {

        if (this.isValidMove(this.getMoves(pieces), position) || this.isValidMove(this.getKillMoves(pieces), position)) {
            this.row = parseInt(position.charAt(1));
            this.column = position.charAt(0);
        }
        else
            throw new Error('Invalid position');
    }
    isValidMove(moves: string[], position: string): boolean {
        if (moves.find(move => move === position))
            return true;
        return false;
    }
    getKillMoves(pieces: Piece[]): string[] {
        let moves: string[] = [];
        let row = this.row;
        let column = this.column;
        let left: number, right: number;
        left = column.charCodeAt(0) - 1;
        right = column.charCodeAt(0) + 1;
        let locations: { [key: string]: boolean } = {};
        pieces.forEach(piece => {
            locations[piece.column + piece.row] = true;
        });
        let leftSide: boolean, rightSide: boolean;
        leftSide = rightSide = true;
        for (let i = row - 1; i >= 1; i--) {
            if (left >= 65 && leftSide) {
                if (pieces.find(piece => piece.row === i && piece.column === String.fromCharCode(left) && piece.color !== this.color))
                    moves.push(`${String.fromCharCode(left)}${i}`);
                if (locations[String.fromCharCode(left) + i])
                    leftSide = false
                left--;
            }
            if (right <= 72 && rightSide) {
                if (pieces.find(piece => piece.row === i && piece.column === String.fromCharCode(right) && piece.color !== this.color))
                    moves.push(`${String.fromCharCode(right)}${i}`);
                if (locations[String.fromCharCode(right) + i])
                    rightSide = false
                right++;
            }
        }
        left = column.charCodeAt(0) - 1;
        right = column.charCodeAt(0) + 1;
        leftSide = rightSide = true;
        for (let i = row + 1; i <= 8; i++) {
            if (left >= 65 && leftSide) {
                if (pieces.find(piece => piece.row === i && piece.column === String.fromCharCode(left) && piece.color !== this.color))
                    moves.push(`${String.fromCharCode(left)}${i}`);
                if (locations[String.fromCharCode(left) + i])
                    leftSide = false
                left--;
            }
            if (right <= 72 && rightSide) {
                if (pieces.find(piece => piece.row === i && piece.column === String.fromCharCode(right) && piece.color !== this.color))
                    moves.push(`${String.fromCharCode(right)}${i}`);
                if (locations[String.fromCharCode(right) + i])
                    rightSide = false
                right++;
            }
        }


        return moves;
    }
}