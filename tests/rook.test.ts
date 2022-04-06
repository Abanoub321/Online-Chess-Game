import King from '../src/Pieces/King';
import Rook from '../src/Pieces/Rook';

describe('Rook', () => {
    it('has right moves', () => {
        const rook = new Rook('white', 'A', 1);
        expect(rook.getMoves([])).toEqual([
            'A2',
            'A3',
            'A4',
            'A5',
            'A6',
            'A7',
            'A8',
            'B1',
            'C1',
            'D1',
            'E1',
            'F1',
            'G1',
            'H1',
        ]);
    });
    it('moves', () => {
        const rook = new Rook('white', 'A', 1);
        rook.move('A2', []);
        expect(rook.row).toBe(2);
        expect(rook.column).toBe('A');
    });

    it('shouldn\'t have invalid moves', () => {
        const rook = new Rook('white', 'A', 1);
        expect(() => rook.move('C5', [])).toThrow();
    });
    it('has kill moves', () => {
        const rook = new Rook('white', 'A', 2);
        const pieces = [
            new Rook('black', 'A', 5),
            new Rook('black', 'A', 1),
        ];

        expect(rook.getKillMoves(pieces)).toEqual([
            'A1',
            'A5',
        ]);
    });

    it('can kill', () => {
        const rook = new Rook('white', 'A', 2);

        const pieces = [
            new Rook('black', 'A', 5),
            new Rook('black', 'A', 1),
        ];

        rook.move('A1', pieces);
        expect(rook.row).toBe(1);
        expect(rook.column).toBe('A');
    });

    it('can\'t kill behind enemies', () => {
        const rook = new Rook('white', 'A', 2);


        const pieces = [
            new Rook('black', 'A', 5),
            new Rook('black', 'A', 6),
        ];

        expect(rook.getKillMoves(pieces)).toEqual(['A5']);
    });

    it('can\'t kill allies', () => {
        const rook = new Rook('white', 'A', 2);

        const pieces = [
            new Rook('white', 'A', 5),
            new Rook('white', 'A', 6),
        ];

        expect(rook.getKillMoves(pieces)).toEqual([]);
    });

    it('shouldn\'t jump over pieces', () => {
        const rook = new Rook('white', 'A', 1);

        const pieces = [
            new Rook('white', 'A', 5),
            new Rook('white', 'A', 3),
        ];

        expect(rook.getMoves(pieces)).toEqual([
            'A2',
            'B1',
            'C1',
            'D1',
            'E1',
            'F1',
            'G1',
            'H1',
        ]);
    });

    it.skip('castling should be available', () => {
        const rook = new Rook('white', 'H', 1);


        const pieces = [
            new Rook('white', 'H', 2),
            new King('white', 'E', 1)
        ]
        pieces[0].row = 2;
        pieces[0].column = 'H';

        pieces[1].row = 1;
        pieces[1].column = 'E';

        expect(rook.getMoves([])).toEqual([
        ]);
    });

    it('can\'t castle', () => {
        const rook = new Rook('white', 'A', 1);
        rook.move('C1', []);
        expect(rook.row).toBe(1);
        expect(rook.column).toBe('C');
        expect(rook.hasMoved).toBe(true);
    });

});