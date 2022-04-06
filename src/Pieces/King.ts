import Piece from "./Piece";


export default class King extends Piece {
    patterns: { row: number, column: number }[];
    constructor(color: string, column: string, row: number) {
        super('king', color, column, row);
        this.patterns = [
            { row: -1, column: 0 },
            { row: -1, column: -1 },
            { row: 0, column: -1 },
            { row: 1, column: -1 },
            { row: 1, column: 0 },
            { row: 1, column: 1 },
            { row: 0, column: 1 },
            { row: -1, column: 1 },
        ]
    }

    getMoves(pieces: Piece[]): string[] {
        let moves: string[] = [];

        let locations: { [key: string]: boolean } = {};
        pieces.forEach(piece => {
            locations[piece.column + piece.row] = true;
        });

        for (let pattern of this.patterns) {
            let row = this.row + pattern.row;
            let column = String.fromCharCode(this.column.charCodeAt(0) + pattern.column);
            if (row >= 1 && row <= 8 && column >= 'A' && column < 'H' && !locations[column + row]) {
                moves.push(`${column}${row}`);
            }
        }

        let index = pieces.findIndex(piece => piece.column == this.column && piece.row == this.row);
        // copy of array
        let newPieces = pieces.map(piece => Object.assign(Object.create(Object.getPrototypeOf(piece)), piece));
        moves = moves.filter((move) => {
            return !this.isThreatened(move, newPieces, index)
        });

        return moves;
    }
    move(position: string, pieces: Piece[]): void {
        let row = parseInt(position.charAt(1));
        let column = position.charAt(0);
        if (this.isValidMove(this.getMoves(pieces), position)) {
            this.row = row;
            this.column = column;
        }
        else {
            throw new Error(`Invalid move for ${this.color} king`);
        }
    }
    isValidMove(moves: string[], position: string): boolean {
        return moves.find(move => move === position) ? true : false
    }

    isThreatened(move: String, pieces: Piece[], index: any): boolean {
        pieces[index].row = parseInt(move.charAt(1));
        pieces[index].column = move.charAt(0);
        for (let i = 0; i < pieces.length; i++) {
            if (i === index)
                continue;
            let pieceMoves = pieces[i].getKillMoves(pieces);
            if (pieceMoves.find(pieceMove => move === pieceMove)) {
                return true;
            }
        }
        return false;
    }

    getKillMoves(pieces: Piece[]): string[] {
        let moves: string[] = [];
        let locations: { [key: string]: boolean } = {};
        pieces.forEach(piece => {
            if (piece.color !== this.color)
                locations[piece.column + piece.row] = true;
        });

        for (let pattern of this.patterns) {
            let row = this.row + pattern.row;
            let column = String.fromCharCode(this.column.charCodeAt(0) + pattern.column);
            if (row >= 1 && row <= 8 && column >= 'A' && column < 'H' && locations[column + row]) {
                moves.push(`${column}${row}`);
            }
        }

        let index = pieces.findIndex(piece => piece.column == this.column && piece.row == this.row);
        //create new copy with no refrence to original pieces
        let newPieces = pieces.map(piece => Object.assign(Object.create(Object.getPrototypeOf(piece)), piece));
        moves = moves.filter((move) => {
            return !this.isThreatened(move, newPieces, index)
        });
        

        return moves;
    }
}