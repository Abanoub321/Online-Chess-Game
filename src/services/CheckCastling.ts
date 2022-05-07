import King from "../Pieces/King";
import Piece from "../Pieces/Piece";


const isCastlingAvailable = (pieces: Piece[], castlingPiece: Piece | any): boolean => {
    pieces = pieces.map(piece => Object.assign(Object.create(Object.getPrototypeOf(piece)), piece));
    const king: King | any = pieces.find((piece: Piece) => piece.type === 'king' && piece.color === castlingPiece.color);
    if (!king)
        return false;
    if (king.hasMoved || castlingPiece.hasMoved)
        return false;

    let alliesLocation: { [key: string]: boolean } = {};
    pieces.forEach((piece: Piece) => {
        if (piece.color === castlingPiece.color) {
            alliesLocation[piece.column + piece.row] = true;
        }
    });



    let locations: { [key: string]: boolean } = {};

    let pieceIndex = pieces.findIndex((piece: Piece) => piece.column === castlingPiece.column && piece.row === castlingPiece.row);

    if (castlingPiece.column == 'A') {


        if (alliesLocation[`B${castlingPiece.row}`] || alliesLocation[`C${castlingPiece.row}`] || alliesLocation[`D${castlingPiece.row}`])
            return false;

        pieces[pieceIndex].column = 'B';
        getEnemisKillMoves(pieces, locations, castlingPiece.color);
        pieces[pieceIndex].column = 'C';
        getEnemisKillMoves(pieces, locations, castlingPiece.color);
        pieces[pieceIndex].column = 'D';
        getEnemisKillMoves(pieces, locations, castlingPiece.color);
        pieces[pieceIndex].column = 'E';
        getEnemisKillMoves(pieces, locations, castlingPiece.color);
        if (castlingPiece.color == 'white') {

            if (locations['B1'] || locations['C1'] || locations['D1'] || locations['E1'])
                return false;
        }
        if (castlingPiece.color == 'black') {
            if (locations['B8'] || locations['C8'] || locations['D8'] || locations['E8'])
                return false;
        }
    }
    if (castlingPiece.column == 'H') {

        if (alliesLocation[`F${castlingPiece.row}`] || alliesLocation[`G${castlingPiece.row}`])
            return false;

        pieces[pieceIndex].column = 'F';
        getEnemisKillMoves(pieces, locations, castlingPiece.color);
        pieces[pieceIndex].column = 'G';
        getEnemisKillMoves(pieces, locations, castlingPiece.color);
        pieces[pieceIndex].column = 'E';
        getEnemisKillMoves(pieces, locations, castlingPiece.color);
        if (castlingPiece.color == 'white')
            if (locations['F1'] || locations['G1'] || locations['E1'])
                return false;
        if (castlingPiece.color == 'black')
            if (locations['F8'] || locations['G8'] || locations['E8'])
                return false;
    }

    return true;
}

const getEnemisKillMoves = (pieces: Piece[], locations: { [key: string]: boolean }, color: string): void => {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].color !== color) {
            let killMoves = pieces[i].getKillMoves(pieces);
            killMoves.forEach(move => {
                locations[move] = true;
            })
        }
    }
}


export { isCastlingAvailable };