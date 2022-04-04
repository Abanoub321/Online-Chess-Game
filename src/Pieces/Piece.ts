
export default class Piece {
    type: string;
    color: string;
    row: number;
    column: string;
    constructor(type: string, color: string = 'white') {
        this.type = type;
        this.color = color;
    }
    getMoves(pieces: Piece[]): string[] {
        throw new Error('Method not implemented.');
    }
    move(position: string, pieces: Piece[]): void {
        throw new Error('Method not implemented.');   
    }
    getKillMoves(pieces: Piece[]): string[] {
        throw new Error('Method not implemented.');
    }
    isValidMove(moves: string[], position: string): boolean {
        throw new Error('Method not implemented.');
    }
    
}