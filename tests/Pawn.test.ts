import Pawn from "../src/Pieces/Pawn";
import Board from "../src/Board";
import Piece from "../src/Pieces/Piece";


describe('Pawn', () => {
    test('White Pawn has right moves', () => {
        const pawn = new Pawn('white', 'A', 2);

        expect(pawn.getMoves([])).toEqual([
            'A3',
            'A4'
        ]);
    });
    test('Black Pawn has right moves', () => {
        const pawn = new Pawn('black', 'A', 7);

        expect(pawn.getMoves([])).toEqual([
            'A6',
            'A5'
        ]);
    });
    test('Pawn move', () => {
        const pawn = new Pawn('white', 'A', 2);

        pawn.move('A3', []);
        expect(pawn.row).toBe(3);
    });
    test('Pawn invalid move', () => {
        const pawn = new Pawn('white', 'A', 2);

        expect(() => pawn.move('A5', [])).toThrow();
    });

    test('Pawn second Move', () => {
        const pawn = new Pawn('white', 'A', 2);

        expect(pawn.getMoves([])).toEqual([
            'A3',
            'A4'
        ]);
    });
    test('Pawn Promotes', () => {
        const pawn = new Pawn('white', 'A', 7);
        pawn.firstMove = false;

        pawn.move('A8', []);
        expect(pawn.canBePromoted).toBe(true);
    });

    test('Pawn white has kill moves', () => {

        const pawn = new Pawn('white', 'E', 2);

        pawn.move('E4', []);
        const pawn2 = new Pawn('black', 'D', 7);

        pawn2.move('D5', [pawn]);

        expect(pawn.getKillMoves([pawn2])).toEqual([
            'D5'
        ]);
    });
    test('Pawn black has kill moves', () => {
        const pawn = new Pawn('black', 'E', 7);

        pawn.move('E5', []);
        const pawn2 = new Pawn('white', 'D', 2);

        pawn2.move('D4', []);
        expect(pawn.getKillMoves([pawn2])).toEqual([
            'D4'
        ]);
    });
    test('Piece in front of pawn', () => {
        const pawn1: Pawn = new Pawn('white', 'E', 2);

        pawn1.move('E4', []);
        const pawn2: Pawn = new Pawn('black', 'E', 7);

        pawn2.move('E5', []);

        expect(pawn1.getMoves([pawn2])).toEqual([]);
    });
    test('Pawn Kills Move', () => {
        const pawn: Pawn = new Pawn('white', 'E', 2);

        pawn.move('E4', []);
        const pawn2: Pawn = new Pawn('black', 'D', 7);

        pawn2.move('D5', [pawn, pawn2]);
        pawn.move('D5', [pawn, pawn2])
        expect(pawn.column).toBe('D');
        expect(pawn.row).toBe(5);
    });
    it('can not has move to kill allies',()=> {
        const pawn: Pawn = new Pawn('white', 'E', 2);
        const pawn2: Pawn = new Pawn('white', 'D', 3);
        expect(pawn.getKillMoves([pawn2])).toEqual([]);
    })
    test.skip('Pawn promotes', () => { });
});
