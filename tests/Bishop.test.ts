import Bishop from '../src/Pieces/Bishop';

describe('Bishop', () => {
    it('should has the right moves', () => {
        const bishop = new Bishop('white', 'C', 1);
        expect(bishop.getMoves([])).toEqual([
            'B2', 'D2', 'A3', 'E3', 'F4', 'G5', 'H6',
        ]);
    });
    it('should has the right moves if in the middle', () => {
        const bishop = new Bishop('white', 'D', 4);
        expect(bishop.getMoves([])).toEqual([
            'C3', 'E3', 'B2', 'F2', 'A1', 'G1', 'C5', 'E5', 'B6', 'F6', 'A7', 'G7', 'H8'
        ]);
    });
    it('should has the right moves if in the corner', () => {
        const bishop = new Bishop('white', 'A', 1);
        expect(bishop.getMoves([])).toEqual([
            'B2', 'C3', 'D4', 'E5', 'F6', 'G7', 'H8'
        ]);
    });
    it('can not jump over pieces', () => {
        const bishop = new Bishop('white', 'D', 4);
        const pieces = [
            new Bishop('white', 'B', 2),
            new Bishop('black', 'F', 6),
        ];

        expect(bishop.getMoves(pieces)).toEqual([
            'C3', 'E3', 'F2', 'G1', 'C5', 'E5', 'B6', 'A7'
        ]);
    });
    it('can move', () => {
        const bishop = new Bishop('white', 'D', 4);

        const pieces = [
            new Bishop('white', 'B', 2),
            new Bishop('black', 'F', 6),
        ];
        bishop.move('C3', pieces)
        expect(bishop.row).toEqual(3);
        expect(bishop.column).toEqual('C');
    });
    it('throw on invalid moves', () => {
        const bishop = new Bishop('white', 'D', 4);

        const pieces = [
            new Bishop('white', 'B', 2),
            new Bishop('black', 'F', 6),
        ];
        expect(() => bishop.move('B2', pieces)).toThrow();
    });
    it('can find kill moves', () => {
        const bishop = new Bishop('white', 'D', 4);

        const pieces = [
            new Bishop('white', 'B', 2),
            new Bishop('black', 'F', 6),
        ];

        expect(bishop.getKillMoves(pieces)).toEqual([
            'F6'
        ]);
    })
    it('can move to kill', () => {
        const bishop = new Bishop('white', 'D', 4);

        const pieces = [
            new Bishop('white', 'B', 2),
            new Bishop('black', 'F', 6),
        ];

        bishop.move('F6', pieces)
        expect(bishop.row).toEqual(6);
        expect(bishop.column).toEqual('F');
    });
    it('can not move behind enemies', () => {
        const bishop = new Bishop('white', 'D', 4);
        const pieces = [
            new Bishop('white', 'B', 2),
            new Bishop('black', 'F', 6),
        ];
        expect(() => bishop.move('G8', pieces)).toThrow();
    });
    it('should not kill behind allies', () => {
        const bishop = new Bishop('white', 'C', 1);
        const pieces = [
            new Bishop('white', 'D', 2),
            new Bishop('black', 'H', 6),
        ];
        expect(bishop.getKillMoves(pieces)).toEqual([]);
    })
});