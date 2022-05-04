import Piece from './Piece';

export default class Queen extends Piece {
    patterns: { row: number, column: number }[];
    constructor(color: string, column: string, row: number) {
        super('queen', color, column, row);
        this.patterns = [
            { row: 0, column: -1 },
            { row: 1, column: 0 },
            { row: -1, column: 0 },
        ];
    }

    getMoves(pieces: Piece[]): string[] {
        let moves: string[] = [];
        const row = this.row;
        const column = this.column;

        let locations: { [key: string]: boolean } = {};
        pieces.forEach(piece => {
            locations[piece.column + piece.row] = true;
        });

        let booleans: boolean[] = [false, false, false];

        let countable = 1;

        for (let i = row + 1; i <= 8; i++) {
            if (locations[String.fromCharCode(column.charCodeAt(0) - countable) + i]) {
                booleans[0] = true;
            }
            if (locations[String.fromCharCode(column.charCodeAt(0) + countable) + i]) {
                booleans[1] = true;
            }
            if (locations[column + i]) {
                booleans[2] = true;
            }

            if (booleans[0] && booleans[1] && booleans[2])
                break;

            if (column.charCodeAt(0) - countable >= 65 && !booleans[0]) {
                moves.push(`${String.fromCharCode(column.charCodeAt(0) - countable)}${i}`);
            }
            if (column.charCodeAt(0) + countable <= 72 && !booleans[1]) {
                moves.push(`${String.fromCharCode(column.charCodeAt(0) + countable)}${i}`);
            }
            if (!booleans[2])
                moves.push(`${column}${i}`);
            countable++;
        }

        countable = 1;
        booleans = [false, false, false];
        for (let i = row - 1; i >= 1; i--) {

            if (locations[String.fromCharCode(column.charCodeAt(0) - countable) + i]) {
                booleans[0] = true;
            }
            if (locations[String.fromCharCode(column.charCodeAt(0) + countable) + i]) {
                booleans[1] = true;
            }

            if (locations[column + i]) {
                booleans[2] = true;
            }

            if (booleans[0] && booleans[1] && booleans[2])
                break;

            if (column.charCodeAt(0) - countable >= 65 && !booleans[0]) {
                moves.push(`${String.fromCharCode(column.charCodeAt(0) - countable)}${i}`);
            }
            if (column.charCodeAt(0) + countable <= 72 && !booleans[1]) {
                moves.push(`${String.fromCharCode(column.charCodeAt(0) + countable)}${i}`);
            }
            if (!booleans[2])
                moves.push(`${column}${i}`);
            countable++;
        }

        countable = 1;
        booleans = [false, false];
        while (column.charCodeAt(0) - countable > 64 || column.charCodeAt(0) + countable < 73) {

            if (locations[String.fromCharCode(column.charCodeAt(0) - countable) + row])
                booleans[0] = true;
            if (locations[String.fromCharCode(column.charCodeAt(0) + countable) + row])
                booleans[1] = true;

            if (booleans[0] && booleans[1])
                break;

            if (column.charCodeAt(0) - countable >= 65 && !booleans[0]) {
                moves.push(`${String.fromCharCode(column.charCodeAt(0) - countable)}${row}`);
            }
            if (column.charCodeAt(0) + countable <= 72 && !booleans[1]) {
                moves.push(`${String.fromCharCode(column.charCodeAt(0) + countable)}${row}`);
            }
            countable++;
        }

        return moves;
    }


    move(position: string, pieces: Piece[]): void {
        let row = parseInt(position.charAt(1));
        let column = position.charAt(0);
        if (this.isValidMove(this.getMoves(pieces), position) || this.isValidMove(this.getKillMoves(pieces), position)) {
            this.row = row;
            this.column = column;
        }
        else
            throw new Error('Invalid move');
    }

    isValidMove(moves: string[], position: string): boolean {
        return moves.find(move => move === position) ? true : false;
    }


    getKillMoves(pieces: Piece[]): string[] {
        let moves: string[] = [];
        const row = this.row;
        const column = this.column;

        let locations: { [key: string]: Piece } = {};
        pieces.forEach(piece => {
            //  if (piece.color !== this.color)
            locations[piece.column + piece.row] = piece;
        });





        let booleans: boolean[] = [false, false, false];
        let countable = 1;

        for (let i = row + 1; i <= 8; i++) {

            if (locations[String.fromCharCode(column.charCodeAt(0) - countable) + i] && !booleans[0]) {
                if (locations[String.fromCharCode(column.charCodeAt(0) - countable) + i].color !== this.color)
                    moves.push(`${String.fromCharCode(column.charCodeAt(0) - countable)}${i}`);
                booleans[0] = true;
            }
            if (locations[String.fromCharCode(column.charCodeAt(0) + countable) + i] && !booleans[1]) {
                if (locations[String.fromCharCode(column.charCodeAt(0) + countable) + i].color !== this.color)
                    moves.push(`${String.fromCharCode(column.charCodeAt(0) + countable)}${i}`);
                booleans[1] = true;
            }

            if (locations[column + i] && !booleans[2]) {
                if (locations[column + i].color !== this.color)
                    moves.push(`${column}${i}`);
                booleans[2] = true;
            }

            if (booleans[0] && booleans[1] && booleans[2])
                break;

            countable++;
        }

        countable = 1;
        booleans = [false, false, false];
        for (let i = row - 1; i >= 1; i--) {

            if (locations[String.fromCharCode(column.charCodeAt(0) - countable) + i] && !booleans[0]) {
                if (locations[String.fromCharCode(column.charCodeAt(0) - countable) + i].color !== this.color)
                    moves.push(`${String.fromCharCode(column.charCodeAt(0) - countable)}${i}`);
                booleans[0] = true;
            }
            if (locations[String.fromCharCode(column.charCodeAt(0) + countable) + i] && !booleans[1]) {
                if (locations[String.fromCharCode(column.charCodeAt(0) + countable) + i].color !== this.color)
                    moves.push(`${String.fromCharCode(column.charCodeAt(0) + countable)}${i}`);
                booleans[1] = true;
            }

            if (locations[column + i] && !booleans[2]) {
                if (locations[column + i].color !== this.color)
                    moves.push(`${column}${i}`);
                booleans[2] = true;
            }

            if (booleans[0] && booleans[1] && booleans[2])
                break;

            countable++;
        }

        countable = 1;
        booleans = [false, false];
        while (column.charCodeAt(0) - countable > 64 || column.charCodeAt(0) + countable < 73) {

            if (locations[String.fromCharCode(column.charCodeAt(0) - countable) + row] && !booleans[0]) {
                if (locations[String.fromCharCode(column.charCodeAt(0) - countable) + row].color !== this.color)
                    moves.push(`${String.fromCharCode(column.charCodeAt(0) - countable)}${row}`);
                booleans[0] = true;
            }
            if (locations[String.fromCharCode(column.charCodeAt(0) + countable) + row] && !booleans[1]) {
                if (locations[String.fromCharCode(column.charCodeAt(0) + countable) + row].color !== this.color)
                    moves.push(`${String.fromCharCode(column.charCodeAt(0) + countable)}${row}`);
                booleans[1] = true;
            }

            if (booleans[0] && booleans[1])
                break;
            countable++;
        }

        return moves;
    }
}