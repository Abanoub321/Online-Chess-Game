import Pawn from "../src/Pieces/Pawn";
import Board from "../src/Board";


describe('Pawn', () => {
    let pieces;
    beforeEach(() => {
        pieces = new Board().getPieces();
    });

    test('White Pawn has right moves', () => {
        const pawn = new Pawn('white');
        pawn.row = 2;
        pawn.column = 'A';
        expect(pawn.getMoves(pieces)).toEqual([
            'A3',
            'A4'
        ]);
    });
    test('Black Pawn has right moves', () => {
        const pawn = new Pawn('black');
        pawn.row = 7;
        pawn.column = 'A';
        expect(pawn.getMoves(pieces)).toEqual([
            'A6',
            'A5'
        ]);
    });
    test('Pawn move', () => {
        const pawn = new Pawn('white');
        pawn.row = 2;
        pawn.column = 'A';
        pawn.move('A3', pieces);
        expect(pawn.row).toBe(3);
    });
    test('Pawn invalid move', () => {
        const pawn = new Pawn('white');
        pawn.row = 2;
        pawn.column = 'A';
        expect(() => pawn.move('A5', pieces)).toThrow();
    });

    test('Pawn second Move', () => {
        const pawn = new Pawn('white');
        pawn.row = 2;
        pawn.column = 'A';


        expect(pawn.getMoves(pieces)).toEqual([
            'A3',
            'A4'
        ]);
    });
    test('Pawn Promotes', () => {
        const pawn = new Pawn('white');
        pawn.row = 7;
        pawn.column = 'A';
        pawn.firstMove = false;
        pieces = pieces.filter(piece => piece.row !== 8 || piece.column !== 'A');
        pawn.move('A8', pieces);
        expect(pawn.canBePromoted).toBe(true);
    });

    test('Pawn white has kill moves', () => {

        const pawn = pieces.find(piece =>
            piece.color === 'white' && piece.type === 'pawn' && piece.row === 2 && piece.column === 'E'
        );
        pawn.move('E4', pieces);
        const pawn2 = pieces.find(piece =>
            piece.color === 'black' && piece.type === 'pawn' && piece.row === 7 && piece.column === 'D'
        );
        pawn2.move('D5', pieces);

        expect(pawn.getKillMoves(pieces)).toEqual([
            'D5'
        ]);
    });
    test('Pawn black has kill moves', () => {
        const pawn: Pawn = pieces.find(piece =>
            piece.color === 'black' && piece.type === 'pawn' && piece.row === 7 && piece.column === 'E'
        );
        pawn.move('E5', pieces);
        const pawn2: Pawn = pieces.find(piece =>
            piece.color === 'white' && piece.type === 'pawn' && piece.row === 2 && piece.column === 'D'
        );
        pawn2.move('D4', pieces);
        expect(pawn.getKillMoves(pieces)).toEqual([
            'D4'
        ]);
    });
    test('Piece in front of pawn', () => {
        const pawn1: Pawn = pieces.find(piece =>
            piece.color === 'white' && piece.type === 'pawn' && piece.row === 2 && piece.column === 'E'
        );
        pawn1.move('E4', pieces);
        const pawn2: Pawn = pieces.find(piece =>
            piece.color === 'black' && piece.type === 'pawn' && piece.row === 7 && piece.column === 'E'
        );
        pawn2.move('E5', pieces);

        expect(pawn1.getMoves(pieces)).toEqual([]);
    });
    test('Pawn Kills Move', () => {
        const pawn: Pawn = pieces.find(piece =>
            piece.color === 'white' && piece.type === 'pawn' && piece.row === 2 && piece.column === 'E'
        );
        pawn.move('E4', pieces);
        const pawn2: Pawn = pieces.find(piece =>
            piece.color === 'black' && piece.type === 'pawn' && piece.row === 7 && piece.column === 'D'
        );
        pawn2.move('D5', pieces);
        pawn.move('D5', pieces)
        expect(pawn.column).toBe('D');
        expect(pawn.row).toBe(5);
    });
    test.skip('Pawn promotes', () => { });
});
