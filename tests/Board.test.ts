import Board from '../src/Board';

describe('Board-testing', () => {
    test('Board is initialized', () => {
        let board = new Board();
        let pieces = board.getPieces();
        expect(pieces.length).toBe(32);
    });

    test('Board is initialized with right pieces', () => {
        const board = new Board();
        const pieces = board.getPieces();
        let pawns = pieces.filter(piece => piece.type === 'pawn');
        let rook = pieces.filter(piece => piece.type == 'rook');
        let knight = pieces.filter(piece => piece.type == 'knight');
        let bishop = pieces.filter(piece => piece.type == 'bishop');
        let queen = pieces.filter(piece => piece.type == 'queen');
        let king = pieces.filter(piece => piece.type == 'king');

        expect(pawns.length).toBe(16);
        expect(rook.length).toBe(4);
        expect(knight.length).toBe(4);
        expect(bishop.length).toBe(4);
        expect(queen.length).toBe(2);
        expect(king.length).toBe(2);
    });


    test('Board initialized with right colors', () => {
        const board = new Board();
        const pieces = board.getPieces();
        let white = pieces.filter(piece => piece.color === 'white');
        let black = pieces.filter(piece => piece.color === 'black');

        expect(white.length).toBe(16);
        expect(black.length).toBe(16);
    });


    describe('Board pieces in right locations', () => {
        let board;
        let locations;
        beforeAll(() => {
            board = new Board();
        })
        beforeEach(() => {
            locations = {};
        });
        
        test('Pawns', () => {
            let pawns = board.getPieces().filter(piece => piece.type === 'pawn');
            for (let i = 0; i < 8; i++) {
                locations[String.fromCharCode(65 + i)] = 0;
            }
            pawns.forEach((pawn) => {
                if (pawn.color === 'white') {
                    expect(pawn.row).toBe(2);
                } else {
                    expect(pawn.row).toBe(7);
                }
                locations[pawn.column]++;
            });
            Object.keys(locations).forEach((key) => {
                expect(locations[key]).toBe(2);
            });
        });

        test('Rooks', () => {
            let rooks = board.getPieces().filter(piece => piece.type === 'rook');

            let rows = {
                1: 0,
                8: 0
            };
            
            locations = {
                'A': 0,
                'H': 0,
            };
            rooks.forEach((rook) => {
                rows[rook.row]++;
                locations[rook.column]++;
            });
            expect(Object.keys(rows).length).toBe(2);
            expect(rows[1]).toBe(2);
            expect(rows[8]).toBe(2);
            let keys = Object.keys(locations);
            expect(keys.length).toBe(2);
            keys.forEach((key) => {
                expect(locations[key]).toBe(2);
            });
        });

        test('Knights', () => {
            let knights = board.getPieces().filter(piece => piece.type === 'knight');
            let rows = {
                1: 0,
                8: 0
            };
            locations = {
                'B': 0,
                'G': 0,
            };
            knights.forEach((knight) => {
                rows[knight.row]++;
                locations[knight.column]++;
            });
            expect(Object.keys(rows).length).toBe(2);
            expect(rows[1]).toBe(2);
            expect(rows[8]).toBe(2);
            let keys = Object.keys(locations);
            expect(keys.length).toBe(2);
            keys.forEach((key) => {
                expect(locations[key]).toBe(2);
            });
        });

        test('Bishops', () => {
            let bishops = board.getPieces().filter(piece => piece.type === 'bishop');
            let rows = {
                1: 0,
                8: 0
            };
            locations = {
                'C': 0,
                'F': 0,
            };
            bishops.forEach((bishop) => {
                rows[bishop.row]++;
                locations[bishop.column]++;
            });
            expect(Object.keys(rows).length).toBe(2);
            expect(rows[1]).toBe(2);
            expect(rows[8]).toBe(2);
            let keys = Object.keys(locations);
            expect(keys.length).toBe(2);
            keys.forEach((key) => {
                expect(locations[key]).toBe(2);
            });
        });

        test('Queens', () => {
            let queens = board.getPieces().filter(piece => piece.type === 'queen');
            queens.forEach((queen) => {
                if(queen.color === 'white') 
                {
                    expect(queen.row).toBe(1);
                }else
                {
                    expect(queen.row).toBe(8);
                }
                expect(queen.column).toBe('D');
            });
        });

        test('Kings', () => {
            let kings = board.getPieces().filter(piece => piece.type === 'king');
            kings.forEach((king) => {
                if(king.color === 'white') 
                {
                    expect(king.row).toBe(1);
                }else
                {
                    expect(king.row).toBe(8);
                }
                expect(king.column).toBe('E');
            });
        });
    })
});