import color from "./ColorEnum";
import Pawn from "./Pieces/Pawn";
import Piece from "./Pieces/Piece";
import types from "./TypeEnum";

export default class Board {
    pieces: Piece[];
    constructor() {
        this.initializePieces();
        this.initializeLocation();
    }

    initializePieces() {
        this.pieces = new Array();
        for (let i = 0; i < 16; i++) {
            this.pieces.push(new Pawn((i % 2 == 0) ? color.white : color.black))
        }

        for (let i = 0; i < 4; i++) {
            this.pieces.push(new Piece(types.rook, (i % 2 == 0) ? color.white : color.black));
            this.pieces.push(new Piece(types.knight, (i % 2 == 0) ? color.white : color.black));
            this.pieces.push(new Piece(types.bishop, (i % 2 == 0) ? color.white : color.black));
        }
        for (let i = 0; i < 2; i++) {
            this.pieces.push(new Piece(types.queen, (i % 2 == 0) ? color.white : color.black));
            this.pieces.push(new Piece(types.king, (i % 2 == 0) ? color.white : color.black));
        }
    }

    initializeLocation() {

        let charCntr = 65;
        let firstisTaken = false;
        this.pieces.forEach((piece) => {
            if (piece.type === types.pawn) {
                if (piece.color === color.white) {
                    piece.row = 2;
                    piece.column = String.fromCharCode(charCntr);
                } else {
                    piece.row = 7;
                    piece.column = String.fromCharCode(charCntr);
                    charCntr++;
                }
            }
            if (piece.type === types.rook) {
                if (piece.color === color.white) {
                    piece.row = 1;
                    if (firstisTaken)
                        piece.column = 'H';
                    else
                        piece.column = 'A';
                } else {
                    piece.row = 8;
                    if (firstisTaken) {
                        piece.column = 'H';
                    }
                    else {
                        piece.column = 'A';
                    }

                }
            }
            if (piece.type === types.knight) {
                if (piece.color === color.white) {
                    piece.row = 1;
                    if (firstisTaken)
                        piece.column = 'G';
                    else
                        piece.column = 'B';
                } else {
                    piece.row = 8;
                    if (firstisTaken)
                        piece.column = 'G';
                    else {
                        piece.column = 'B';
                    }
                }
            }
            if (piece.type === types.bishop) {
                if (piece.color === color.white) {
                    piece.row = 1;
                    if (firstisTaken)
                        piece.column = 'F';
                    else
                        piece.column = 'C';
                } else {
                    piece.row = 8;
                    if (firstisTaken)
                        piece.column = 'F';
                    else {
                        piece.column = 'C';
                        firstisTaken = true;
                    }
                }
            }
            if(piece.type === types.queen) {
                if (piece.color === color.white) {
                    piece.row = 1;
                } else {
                    piece.row = 8;
                }
                piece.column = 'D';
            }
            if(piece.type === types.king) {
                if (piece.color === color.white) {
                    piece.row = 1;
                } else {
                    piece.row = 8;
                }
                piece.column = 'E';
            }
        });

    }

    getPieces() {
        return this.pieces;
    }


}