import Knight from '../src/Pieces/Knight';

describe('Knights', () => {
    it('has valid moves', () => {
        const knight = new Knight('white','B',1);
        expect(knight.getMoves([])).toEqual([
            'A3', 'C3', 'D2'
        ]);
    })
    it('has valid moves if it is in center', () => {
        const knight = new Knight('white','E',4);
        expect(knight.getMoves([])).toEqual([
            'C5', 'C3', 'D6', 'D2', 'F6', 'F2', 'G5', 'G3'
        ]);
    });

    it('should not move on allies', () => {
        const knight = new Knight('white','B',1);

        const ally = new Knight('white','C',3);
    
        expect(knight.getMoves([ally])).toEqual([
            'A3', 'D2'
        ]);
    });
    it('moves', () => {
        const knight = new Knight('white','B',1);

        knight.move('A3', []);
        expect(knight.row).toEqual(3);
        expect(knight.column).toEqual('A');
    })
    it('throw exception on wrong moves', () => {
        const knight = new Knight('white','B',1);
      
        const ally = new Knight('white','C',3);
    
        expect(() => knight.move('C3', [ally])).toThrow();
    });
    it('has kill moves', () => {
        const knight = new Knight('white','B',1);
       
        const enemy = new Knight('black','C',3);

        expect(knight.getKillMoves([enemy])).toEqual([
            'C3'
        ]);
    })
    it('can kill', () => {
        const knight = new Knight('white','B',1);
        const enemy = new Knight('black','C',3);
        knight.move('C3', [enemy]);
        expect(enemy.row).toEqual(3);
        expect(enemy.column).toEqual('C');
    })
});