import King from "../src/Pieces/King";
import Pawn from "../src/Pieces/Pawn";
import Queen from "../src/Pieces/Queen";
import Rook from "../src/Pieces/Rook";


describe('Castling', () => {
    describe('Rook', () => {
        it('left has move', () => {
            const rook = new Rook('white', 'A', 1);
            const pieces = [
                new Pawn('white', 'A', 2),
                new King('white', 'E', 1),
                rook
            ];

            expect(rook.getMoves(pieces)).toEqual([
                'B1',
                'C1',
                'D1',
                'E1',
            ]);
        });
        it('right has move', () => {
            const rook = new Rook('white', 'H', 1);
            const pieces = [
                new Pawn('white', 'H', 2),
                new King('white', 'E', 1),
                rook
            ];

            expect(rook.getMoves(pieces).sort()).toEqual([
                'F1',
                'G1',
                'E1',
            ].sort());
        });

        it('can not happen if it moved', () => {
            const rook = new Rook('white', 'A', 1);
            const pieces = [
                new Pawn('white', 'A', 2),
                new Pawn('white', 'B', 2),
                new King('white', 'E', 1),
                rook
            ];
            rook.move('B1', pieces);
            expect(rook.getMoves(pieces).sort()).toEqual([
                'A1', 'C1', 'D1'
            ].sort());
        })

        it('can not happen if king moved', () => {
            const rook = new Rook('white', 'A', 1);
            const king = new King('white', 'E', 1);
            const pieces = [
                new Pawn('white', 'A', 2),
                new Pawn('white', 'B', 2),
                king,
                rook
            ];
         
            king.move('D1', pieces);

            expect(rook.getMoves(pieces).sort()).toEqual([
                'B1', 'C1',
            ].sort());
        });

        it('can not happen if area is threatened', () => {
            const rook = new Rook('white', 'A', 1);
            const king = new King('white', 'E', 1);
            const pieces = [
                new Pawn('white', 'A', 2),
                new Pawn('black', 'C', 2),
                king,
                rook
            ];


            expect(rook.getMoves(pieces).sort()).toEqual([
                'B1', 'C1', 'D1'
            ].sort());
        });

        it('can not happen if area is threatened 2', () => {
            const rook = new Rook('black', 'A', 8);
            const king = new King('black', 'E', 8);
            const pieces = [
                new Pawn('black', 'A', 7),
                new Queen('white', 'C', 7),
                king,
                rook
            ];


            expect(rook.getMoves(pieces).sort()).toEqual([
                'B8', 'C8', 'D8'
            ].sort());
        });

        it('move', () => {
            const rook = new Rook('white', 'A', 1);
            const king = new King('white', 'E', 1);
            const pieces = [
                new Pawn('white', 'A', 2),
                new Pawn('white', 'B', 2),
                rook,
                king
            ];
            rook.move('E1', pieces);

            expect(rook.column).toBe('D');
            expect(king.column).toBe('C');

        })
        it('moves 2', () => {
            const rook = new Rook('black', 'A', 8);
            const king = new King('black', 'E', 8);
            const pieces = [
                new Pawn('black', 'A', 7),
                king,
                rook
            ];

            rook.move('E8', pieces);

            expect(rook.column).toBe('D');
            expect(king.column).toBe('C');

        })
        it('can not castle if pieces in the middle', () => {
            const rook = new Rook('white', 'A', 1);
            const king = new King('white', 'E', 1);
            const pieces = [
                new Pawn('white', 'A', 1),
                new Pawn('white', 'B', 1),
                new Pawn('white', 'C', 1),
                rook,
                king
            ];

            expect(() => rook.move('E1', pieces)).toThrow();

        })
    })

    describe('King', () => {
        it('has move', () => {
            const king = new King('white', 'E', 1);
            const pieces = [
                new Rook('white', 'A', 1),
                new Rook('white', 'H', 1),
                new Pawn('white', 'E', 2),
                new Pawn('white', 'F', 2),
                new Pawn('white', 'D', 2),
                king
            ];

            expect(king.getMoves(pieces).sort()).toEqual([
                'D1', 'F1', 'G1', 'C1'
            ].sort());

        })
        it('can not happen if area is threatened', () => {
            const king = new King('white', 'E', 1);
            const pieces = [
                new Rook('white', 'A', 1),
                new Rook('white', 'H', 1),
                new Pawn('white', 'E', 2),
                new Pawn('white', 'F', 2),
                new Pawn('white', 'D', 2),
                new Pawn('black', 'C', 2),
                king
            ];

            expect(king.getMoves(pieces).sort()).toEqual([
                'F1', 'G1'
            ].sort());

        });
        it('can not happen if it is threatened', () => {
            const king = new King('white', 'E', 1);
            const pieces = [
                new Rook('white', 'A', 1),
                new Rook('white', 'H', 1),
                new Queen('black', 'C', 3),
                king
            ];
            expect(king.getMoves(pieces).sort()).toEqual([
                'D1', 'F1', 'E2', 'F2'
            ].sort());
        });

        it('moves', () => {
            const king = new King('white', 'E', 1);
            const pieces = [
                new Rook('white', 'A', 1),
                new Rook('white', 'H', 1),
                new Pawn('white', 'E', 2),
                new Pawn('white', 'F', 2),
                new Pawn('white', 'D', 2),
                king
            ];
            king.move('G1', pieces);
            expect(king.column).toBe('G');
            expect(pieces[1].column).toBe('F');
        });
    })
});