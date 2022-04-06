import King from "../src/Pieces/King";
import Pawn from '../src/Pieces/Pawn';

describe('King', () => {
    it('has valid moves', () => {
        const king = new King('white');
        king.row = 1;
        king.column = 'E';

        expect(king.getMoves([king]).sort()).toEqual([
            'F1', 'F2', 'E2', 'D2', 'D1'
        ].sort());
    });
    it('has valid moves in the middle', () => {
        const king = new King('white');
        king.row = 5;
        king.column = 'E';
        expect(king.getMoves([king]).sort()).toEqual([
            'F4', 'F5', 'F6', 'E6', 'E4', 'D6', 'D5', 'D4'
        ].sort());
    })
    it('should not move on allies', () => {
        const king = new King('white');
        king.row = 1;
        king.column = 'E';
        const pieces = [
            new Pawn('white'),
            king
        ];
        pieces[0].row = 2;
        pieces[0].column = 'E';

        expect(king.getMoves(pieces).sort()).toEqual([
            'F1', 'F2', 'D2', 'D1'
        ].sort());
    });

    it('can move', () => {

        const king = new King('white');
        king.row = 1;
        king.column = 'E';

        king.move('F2', [king]);

        expect(king.row).toEqual(2);
        expect(king.column).toEqual('F');
    })

    it('throws on wrong move', () => {
        const king = new King('white');
        king.row = 1;
        king.column = 'E';

        expect(() => king.move('F3', [king])).toThrow();
    });

    it('has kill moves', () => {
        const king = new King('white');
        king.row = 1;
        king.column = 'E';
        const pieces = [
            new Pawn('black'),
            new Pawn('white'),
            king
        ];
        pieces[0].row = 2;
        pieces[0].column = 'E';

        pieces[1].row = 2;
        pieces[1].column = 'F';

        expect(king.getKillMoves(pieces).sort()).toEqual([
            'E2'
        ].sort());
    });

    it('can not move if threatened', () => {
        const king = new King('white');
        king.row = 1;
        king.column = 'E';
        const pieces = [
            new Pawn('black'),
            new Pawn('white'),
            king
        ];
        pieces[0].row = 2;
        pieces[0].column = 'E';

        pieces[1].row = 2;
        pieces[1].column = 'F';
        expect(king.getMoves(pieces)).toEqual([
            'D2'
        ].sort());
    });

    it('can not kill if threatened', () => {
        const king = new King('white');
        king.row = 1;
        king.column = 'E';
        const pieces = [
            new Pawn('black'),
            new Pawn('black'),
            king
        ];
        pieces[0].row = 2;
        pieces[0].column = 'E';

        pieces[1].row = 3;
        pieces[1].column = 'F';


        expect(king.getKillMoves(pieces)).toEqual([
        ].sort());

    });
    it('can not move if threatend by another king', () => {
        const king = new King('white');
        king.row = 1;
        king.column = 'E';
        const pieces = [
            new King('black'),
            king
        ];
        pieces[0].row = 3;
        pieces[0].column = 'E';

        expect(king.getMoves(pieces)).toEqual([
            'D1', 'F1'
        ].sort());

    });
});