import Piece from '../src/Pieces/Piece';
import Rook from '../src/Pieces/Rook';

describe('Rook', () => {
    it('has right moves', () => {
        const rook = new Rook('white');
        rook.row = 1;
        rook.column = 'A';
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
        const rook = new Rook('white');
        rook.row = 1;
        rook.column = 'A';
        rook.move('A2', []);
        expect(rook.row).toBe(2);
        expect(rook.column).toBe('A');
    });

    it('shouldn\'t have invalid moves', () => {
        const rook = new Rook('white');
        rook.row = 1;
        rook.column = 'A';
        expect(() => rook.move('C5', [])).toThrow();
    });
    it('has kill moves', () => {
        const rook = new Rook('white');
        rook.row = 2;
        rook.column = 'A';
        const pieces = [
            new Rook('black'),
            new Rook('black'),
        ];
        pieces[0].row = 5;
        pieces[0].column = 'A';

        pieces[1].row = 1;
        pieces[1].column = 'A';

        expect(rook.getKillMoves(pieces)).toEqual([
            'A1',
            'A5',
        ]);
    });

    it('can kill', () => {
        const rook = new Rook('white');
        rook.row = 2;
        rook.column = 'A';
        const pieces = [
            new Rook('black'),
            new Rook('black'),
        ];
        pieces[0].row = 5;
        pieces[0].column = 'A';

        pieces[1].row = 1;
        pieces[1].column = 'A';

        rook.move('A1', pieces);
        expect(rook.row).toBe(1);
        expect(rook.column).toBe('A');
    });
    
    it('can\'t kill behind enemies', () => {
        const rook = new Rook('white');
        rook.row = 2;
        rook.column = 'A';

        const pieces = [
            new Rook('black'),
            new Rook('black'),
        ];

        pieces[0].row = 5;
        pieces[0].column = 'A';

        pieces[1].row = 6;
        pieces[1].column = 'A';

        expect(rook.getKillMoves(pieces)).toEqual(['A5']);
    });

    it('can\'t kill allies', () => {
        const rook = new Rook('white');
        rook.row = 2;
        rook.column = 'A';

        const pieces = [
            new Rook('white'),
            new Rook('white'),
        ];

        pieces[0].row = 5;
        pieces[0].column = 'A';

        pieces[1].row = 6;
        pieces[1].column = 'A';

        expect(rook.getKillMoves(pieces)).toEqual([]);
    });
    
    it('shouldn\'t jump over pieces', () => {
        const rook = new Rook('white');
        rook.row = 1;
        rook.column = 'A';

        const pieces = [
            new Rook('white'),
            new Rook('white'),
        ];

        pieces[0].row = 5;
        pieces[0].column = 'A';

        pieces[1].row = 3;
        pieces[1].column = 'A';

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
        const rook = new Rook('white');
        rook.row = 1;
        rook.column = 'H';
        
        const pieces = [
            new Rook('white'),
            new Piece('king', 'white')
        ]
        pieces[0].row = 2;
        pieces[0].column = 'H';

        pieces[1].row = 1;
        pieces[1].column = 'E';

        expect(rook.getMoves([])).toEqual([
        ]);
    });
    
    it('can\'t castle', () => {
        const rook = new Rook('white');
        rook.row = 1;
        rook.column = 'A';
        rook.move('C1', []);
        expect(rook.row).toBe(1);
        expect(rook.column).toBe('C');
        expect(rook.hasMoved).toBe(true);
    });

});