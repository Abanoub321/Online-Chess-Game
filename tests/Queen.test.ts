import Queen from '../src/Pieces/Queen';

//ref : https://www.chess.com/terms/chess-pieces#queen

describe('Queen', () => {

    it('has valid moves', () => {
        const queen = new Queen('white');
        queen.row = 1;
        queen.column = 'D';
        expect(queen.getMoves([]).sort()).toEqual([
            'C1', 'B1', 'A1',
            'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8',
            'E1', 'F1', 'G1', 'H1',
            'C2', 'B3', 'A4',
            'E2', 'F3', 'G4', 'H5'
        ].sort());
    });
    it('has valid moves in the middle', () => {
        const queen = new Queen('white');
        queen.row = 4;
        queen.column = 'E';
        expect(queen.getMoves([]).sort()).toEqual([
            'D3', 'D4', 'D5',
            'C2', 'C4', 'C6',
            'B1', 'B4', 'B7',
            'A4', 'A8',
            'E2', 'E3', 'E1', 'E5', 'E6', 'E7', 'E8',
            'F3', 'F4', 'F5',
            'G2', 'G4', 'G6',
            'H1', 'H4', 'H7'
        ].sort());
    });
    it('can not move over pieces', () => {
        const queen = new Queen('white');
        queen.row = 1;
        queen.column = 'D';
        const pieces = [
            new Queen('black'),
            new Queen('white'),
        ];

        pieces[0].row = 2;
        pieces[0].column = 'C';

        pieces[1].row = 1;
        pieces[1].column = 'G';


        expect(queen.getMoves(pieces).sort()).toEqual([
            'C1', 'B1', 'A1',
            'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8',
            'E1', 'F1',
            'E2', 'F3', 'G4', 'H5'
        ].sort());
    });
    it('moves', () => {
        const queen = new Queen('white');
        queen.row = 1;
        queen.column = 'D';
        const pieces = [
            new Queen('black'),
            new Queen('white'),
        ];

        pieces[0].row = 2;
        pieces[0].column = 'C';

        pieces[1].row = 1;
        pieces[1].column = 'G';

        queen.move('B1',pieces);
        expect(queen.row).toEqual(1);
        expect(queen.column).toEqual('B');
    })
    it('wrong move should throw',()=> {
        const queen = new Queen('white');
        queen.row = 1;
        queen.column = 'D';
        const pieces = [
            new Queen('white'),
            new Queen('white'),
            new Queen('white'),
        ];

        pieces[0].row = 2;
        pieces[0].column = 'C';

        pieces[1].row = 1;
        pieces[1].column = 'G';

        pieces[2].row = 3;
        pieces[2].column = 'D';

        expect(()=>{
            queen.move('D3',pieces);
        }).toThrow();
    })
    it('has kill moves', () => {
        const queen = new Queen('white');
        queen.row = 1;
        queen.column = 'D';
        const pieces = [
            new Queen('black'),
            new Queen('white'),
            new Queen('black'),
        ];

        pieces[0].row = 2;
        pieces[0].column = 'C';

        pieces[1].row = 1;
        pieces[1].column = 'G';


        pieces[2].row = 3;
        pieces[2].column = 'B';
        
        expect(queen.getKillMoves(pieces)).toEqual([
            'C2'
        ]);
    });

    it('can move to kill', () => {
        const queen = new Queen('white');
        queen.row = 1;
        queen.column = 'D';
        const pieces = [
            new Queen('black'),
            new Queen('white'),
            new Queen('black'),
        ];

        pieces[0].row = 2;
        pieces[0].column = 'C';

        pieces[1].row = 1;
        pieces[1].column = 'G';


        pieces[2].row = 3;
        pieces[2].column = 'B';
        
        queen.move('C2',pieces);
        expect(queen.row).toEqual(2);
        expect(queen.column).toEqual('C');
    });
    it('can not move to kill behind enemis or allies', () => {
        const queen = new Queen('white');
        queen.row = 1;
        queen.column = 'D';
        const pieces = [
            new Queen('black'),
            new Queen('white'),
            new Queen('black'),
        ];

        pieces[0].row = 2;
        pieces[0].column = 'C';

        pieces[1].row = 1;
        pieces[1].column = 'G';


        pieces[2].row = 3;
        pieces[2].column = 'B';
        
        expect(()=>{
            queen.move('H1',pieces);
        }).toThrow();
        expect(()=>{
            queen.move('B3',pieces);
        }).toThrow();
    });
});