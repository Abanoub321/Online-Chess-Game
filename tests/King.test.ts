import King from "../src/Pieces/King";
import Pawn from '../src/Pieces/Pawn';

describe('King', () => {
    it('has valid moves', () => {
        const king = new King('white', 'E', 1);

        expect(king.getMoves([king]).sort()).toEqual([
            'F1', 'F2', 'E2', 'D2', 'D1'
        ].sort());
    });
    it('has valid moves in the middle', () => {
        const king = new King('white', 'E', 5);

        expect(king.getMoves([king]).sort()).toEqual([
            'F4', 'F5', 'F6', 'E6', 'E4', 'D6', 'D5', 'D4'
        ].sort());
    })
    it('should not move on allies', () => {
        const king = new King('white', 'E', 1);
        const pieces = [
            new Pawn('white', 'E', 2),
            king
        ];

        expect(king.getMoves(pieces).sort()).toEqual([
            'F1', 'F2', 'D2', 'D1'
        ].sort());
    });

    it('can move', () => {

        const king = new King('white', 'E', 1);
        king.move('F2', [king]);

        expect(king.row).toEqual(2);
        expect(king.column).toEqual('F');
    })

    it('throws on wrong move', () => {
        const king = new King('white', 'E', 1);
        expect(() => king.move('F3', [king])).toThrow();
    });

    it('has kill moves', () => {
        const king = new King('white', 'E', 1);

        const pieces = [
            new Pawn('black', 'E', 2),
            new Pawn('white', 'F', 2),
            king
        ];

        expect(king.getKillMoves(pieces).sort()).toEqual([
            'E2'
        ].sort());
    });

    it('can not move if threatened', () => {
        const king = new King('white', 'E', 1);

        const pieces = [
            new Pawn('black', 'E', 2),
            new Pawn('white', 'F', 2),
            king
        ];

        expect(king.getMoves(pieces)).toEqual([
            'D2'
        ].sort());
    });

    it('can not kill if threatened', () => {
        const king = new King('white', 'E', 1);

        const pieces = [
            new Pawn('black', 'E', 1),
            new Pawn('black', 'F', 3),
            king
        ];

        expect(king.getKillMoves(pieces)).toEqual([
        ].sort());

    });
    it('can not move if threatend by another king', () => {
        const king = new King('white', 'E', 1);

        const pieces = [
            new King('black', 'E', 3),
            king
        ];

        expect(king.getMoves(pieces)).toEqual([
            'D1', 'F1'
        ].sort());

    });
});