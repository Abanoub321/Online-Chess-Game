
export default abstract class Piece {
    type: string;
    color: string;
    row: number;
    column: string;
    constructor(type: string, color: string = 'white', column: string, row: number) {
        this.type = type;
        this.color = color;
        this.row = row;
        this.column = column;
    }
    abstract getMoves(pieces: Piece[]): string[];
    abstract move(position: string, pieces: Piece[]): void;
    abstract getKillMoves(pieces: Piece[]): string[];
    abstract isValidMove(moves: string[], position: string): boolean;


}