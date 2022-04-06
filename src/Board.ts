import color from "./ColorEnum";
import Bishop from "./Pieces/Bishop";
import King from "./Pieces/King";
import Knight from "./Pieces/Knight";
import Pawn from "./Pieces/Pawn";
import Piece from "./Pieces/Piece";
import Queen from "./Pieces/Queen";
import Rook from "./Pieces/Rook";
import types from "./TypeEnum";

export default class Board {
    pieces: Piece[];
    constructor() {
        this.pieces = new Array();
        this.initializePieces();
    }

    initializePieces() {
        for (let i = 0, j = 65; i < 8; i++, j++) {
            this.pieces.push(new Pawn(color.white, String.fromCharCode(j), 2));
        }
        for (let i = 0, j = 65; i < 8; i++, j++) {
            this.pieces.push(new Pawn(color.black, String.fromCharCode(j), 7));
        }

        this.pieces.push(new Rook(color.white, 'A', 1));
        this.pieces.push(new Rook(color.white, 'H', 1));
        this.pieces.push(new Rook(color.black, 'A', 8));
        this.pieces.push(new Rook(color.black, 'H', 8));

        this.pieces.push(new Knight(color.white, 'B', 1));
        this.pieces.push(new Knight(color.white, 'G', 1));
        this.pieces.push(new Knight(color.black, 'B', 8));
        this.pieces.push(new Knight(color.black, 'G', 8));

        this.pieces.push(new Bishop(color.white, 'C', 1));
        this.pieces.push(new Bishop(color.white, 'F', 1));
        this.pieces.push(new Bishop(color.black, 'C', 8));
        this.pieces.push(new Bishop(color.black, 'F', 8));

        for (let i = 0; i < 2; i++) {
            this.pieces.push(new Queen((i % 2 == 0) ? color.white : color.black, 'D', (i % 2 == 0) ? 1 : 8));
            this.pieces.push(new King((i % 2 == 0) ? color.white : color.black, 'E', (i % 2 == 0) ? 1 : 8));
        }
    }

    getPieces() {
        return this.pieces;
    }


}