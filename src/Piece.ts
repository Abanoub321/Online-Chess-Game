
export default class Piece {
    type: string;
    color: string;
    row: number;
    column: string;
    constructor(type: string, color: string = 'white') {
        this.type = type;
        this.color = color;
    }
}