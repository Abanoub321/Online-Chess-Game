import Piece from './Piece';

export default class Pawn extends Piece {
    firstMove: boolean = true;
    canBePromoted: boolean = false;

    constructor(color: string = 'white') {
        super('pawn', color);
    }

    getMoves(pieces: Piece[]): string[] {
        let moves = [];
        if (this.color === 'white') {
            if (!pieces.find(piece => piece.column === this.column && piece.row === this.row + 1)) {
                moves.push(`${this.column}${this.row + 1}`);
            }

            if (!pieces.find(piece => piece.column === this.column && piece.row === this.row + 2) && this.firstMove) {
                moves.push(`${this.column}${this.row + 2}`);
            }

        } else {
            if (!pieces.find(piece => piece.column === this.column && piece.row === this.row - 1))
                moves.push(`${this.column}${this.row - 1}`);
            if (!pieces.find(piece => piece.column === this.column && piece.row === this.row - 2) && this.firstMove)
                moves.push(`${this.column}${this.row - 2}`);
        }

        return moves;
    }

    move(position: string, pieces: Piece[]): void {

        if (this.isValidMove(this.getMoves(pieces), position) || this.isValidMove(this.getKillMoves(pieces), position)) {
            if (this.firstMove)
                this.firstMove = false;
            let row = parseInt(position.charAt(1));
            let column = position.charAt(0);
            if (this.color === 'white' && this.row === 7) {
                this.canBePromoted = true;
            }
            else if (this.color === 'black' && this.row === 2) {
                this.canBePromoted = true;
            }
            this.row = row;
            this.column = column;
        } else {
            throw new Error('Invalid move');
        }
    }

    getKillMoves(pieces: Piece[]) {
        let moves = [];
        let validPieces;
        if (this.color === 'white') {
            let killMoves = [
                {
                    column: String.fromCharCode(this.column.charCodeAt(0) - 1),
                    row: this.row + 1
                },
                {
                    column: String.fromCharCode(this.column.charCodeAt(0) + 1),
                    row: this.row + 1
                }
            ];

            validPieces = pieces.filter(piece => {
                if (piece.column === killMoves[0].column && piece.row === killMoves[0].row) {
                    return piece;
                }
                if (piece.column === killMoves[1].column && piece.row === killMoves[1].row) {
                    return piece;
                }
            }
            );
        } else {
            let killMoves = [
                {
                    column: String.fromCharCode(this.column.charCodeAt(0) - 1),
                    row: this.row - 1
                },
                {
                    column: String.fromCharCode(this.column.charCodeAt(0) + 1),
                    row: this.row - 1
                }
            ];

            validPieces = pieces.filter(piece => {
                if (piece.column === killMoves[0].column && piece.row === killMoves[0].row) {
                    return piece;
                }
                if (piece.column === killMoves[1].column && piece.row === killMoves[1].row) {
                    return piece;
                }
            }
            );
        }

        if (validPieces.length > 0) {
            validPieces.forEach(piece => {
                moves.push(`${piece.column}${piece.row}`)
            });
        }
        return moves;
    }

    isValidMove(moves: string[], position: string) {
        let found = moves.find(move => move === position);
        if (found)
            return true;
        return false;
    }
}

