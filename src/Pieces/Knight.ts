import Piece from './Piece';

export default class Knight extends Piece {
    patterns: { row: number, column: number }[];
    constructor(color: string) {
        super('Knight', color);
        this.patterns = [
            { row: 1, column: -2 },
            { row: -1, column: -2 },

            { row: 2, column: -1 },
            { row: -2, column: -1 },

            { row: 2, column: 1 },
            { row: -2, column: 1 },

            { row: 1, column: 2 },
            { row: -1, column: 2 },
        ];
    }
    getMoves(pieces: Piece[]): string[] {
        let moves: string[] = [];

        let locations: { [key: string]: boolean } = {};
        pieces.forEach(piece => {
            locations[piece.column + piece.row] = true;
        });

        this.patterns.forEach(pattern => {
            const newRow = this.row + pattern.row;
            const newColumn = this.column.charCodeAt(0) + pattern.column;
            if (newRow >= 1 && newRow < 8 && String.fromCharCode(newColumn) >= 'A' && String.fromCharCode(newColumn) < 'I') {
                if (!locations[String.fromCharCode(newColumn) + newRow]) {
                    const newPosition = String.fromCharCode(newColumn) + newRow;
                    moves.push(newPosition);
                }
            }
        })


        return moves;
    }
    move(position: string, pieces: Piece[]): void {
        if (this.isValidMove(this.getMoves(pieces), position) || this.isValidMove(this.getKillMoves(pieces), position)) {
            this.row = parseInt(position.charAt(1));
            this.column = position.charAt(0);
        } else
            throw new Error('Invalid move');
    }
    isValidMove(moves: string[], position: string): boolean {
        if (moves.find(move => move === position))
            return true;
        return false;
    }

    getKillMoves(pieces: Piece[]): string[] {
        let moves: string[] = [];

        let locations: { [key: string]: boolean } = {};
        pieces.forEach(piece => {
            if (piece.color !== this.color)
                locations[piece.column + piece.row] = true;
        });

        this.patterns.forEach(pattern => {
            const newRow = this.row + pattern.row;
            const newColumn = this.column.charCodeAt(0) + pattern.column;
            if (newRow >= 1 && newRow < 8 && String.fromCharCode(newColumn) >= 'A' && String.fromCharCode(newColumn) < 'I') {
                if (locations[String.fromCharCode(newColumn) + newRow]) {
                    const newPosition = String.fromCharCode(newColumn) + newRow;
                    moves.push(newPosition);
                }
            }
        })

        return moves;
    }
}