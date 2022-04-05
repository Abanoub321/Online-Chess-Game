import Knight from '../src/Pieces/Knight';

describe('Knights', () => {
    it('has valid moves', () => {
        const knight = new Knight('white');
        knight.row = 1;
        knight.column = 'B';
        expect(knight.getMoves([])).toEqual([
            'A3', 'C3', 'D2'
        ]);
    })
    it('has valid moves if it is in center', () => {
        const knight = new Knight('white');
        knight.row = 4;
        knight.column = 'E';
        expect(knight.getMoves([])).toEqual([
            'C5', 'C3', 'D6', 'D2', 'F6', 'F2', 'G5', 'G3'
        ]);
    });

    it('should not move on allies', () => {
        const knight = new Knight('white');
        knight.row = 1;
        knight.column = 'B';
        const ally = new Knight('white');
        ally.row = 3;
        ally.column = 'C';
        expect(knight.getMoves([ally])).toEqual([
            'A3', 'D2'
        ]);
    });
    it('moves', () => {
        const knight = new Knight('white');
        knight.row = 1;
        knight.column = 'B';

        knight.move('A3', []);
        expect(knight.row).toEqual(3);
        expect(knight.column).toEqual('A');
    })
    it('throw exception on wrong moves', () => {
        const knight = new Knight('white');
        knight.row = 1;
        knight.column = 'B';
        const ally = new Knight('white');
        ally.row = 3;
        ally.column = 'C';
        expect(() => knight.move('C3', [ally])).toThrow();
    });
    it('has kill moves', () => {
        const knight = new Knight('white');
        knight.row = 1;
        knight.column = 'B';
        const enemy = new Knight('black');
        enemy.row = 3;
        enemy.column = 'C';
        expect(knight.getKillMoves([enemy])).toEqual([
            'C3'
        ]);
    })
    it('can kill', () => {
        const knight = new Knight('white');
        knight.row = 1;
        knight.column = 'B';
        const enemy = new Knight('black');
        enemy.row = 3;
        enemy.column = 'C';
        knight.move('C3', [enemy]);
        expect(enemy.row).toEqual(3);
        expect(enemy.column).toEqual('C');
    })
});