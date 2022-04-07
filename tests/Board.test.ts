import Board from '../src/Board';

describe('Board', () => {
    let board: Board;
    const matchTwoBoards = (b1: { type: string, color: string }[][] | any, b2: { type: string, color: string }[][] | any) => {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (b1[i][j] !== null) {
                    expect(b1[i][j].type).toBe(b2[i][j].type);
                    expect(b1[i][j].color).toBe(b2[i][j].color);
                } else
                    expect(null).toBe(b2[i][j]);
            }
        }
    }
    beforeEach(() => {
        board = new Board();
    });
    test('Board is initialized', () => {
        let pieces = board.getPieces();
        expect(pieces.length).toBe(32);
    });

    test('Board is initialized with right pieces', () => {
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
        const pieces = board.getPieces();
        let white = pieces.filter(piece => piece.color === 'white');
        let black = pieces.filter(piece => piece.color === 'black');

        expect(white.length).toBe(16);
        expect(black.length).toBe(16);
    });


    describe('Board pieces in right locations', () => {
        let board: Board;
        let locations: { [key: string]: number };
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

            let rows: { [key: number]: number } = {
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
            let rows: { [key: number]: number } = {
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
            let rows: { [key: number]: number } = {
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
                if (queen.color === 'white') {
                    expect(queen.row).toBe(1);
                } else {
                    expect(queen.row).toBe(8);
                }
                expect(queen.column).toBe('D');
            });
        });

        test('Kings', () => {
            let kings = board.getPieces().filter(piece => piece.type === 'king');
            kings.forEach((king) => {
                if (king.color === 'white') {
                    expect(king.row).toBe(1);
                } else {
                    expect(king.row).toBe(8);
                }
                expect(king.column).toBe('E');
            });
        });
    })


    it('should return complete board', () => {
        let expectedBoard = [
            [{ type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' }, { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }],
            [{ type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [{ type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }],
            [{ type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' }, { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }],
        ];
        let completeBoard = board.getBoard();
        matchTwoBoards(completeBoard, expectedBoard);
    });

    it('should return piece moves if white', () => {
        let moves = board.getPieceMoves(1, 0);

        expect(moves.sort()).toEqual([
            {
                row: 2,
                column: 0
            },
            {
                row: 3,
                column: 0
            }
        ].sort())
    })

    it('should return piece moves if black', () => {
        let moves = board.getPieceMoves(7, 1);

        expect(moves.sort()).toEqual([
            {
                row: 5,
                column: 0
            },
            {
                row: 5,
                column: 2
            }
        ].sort())
    })
    it('should return empty array if piece is blocked', () => {
        let moves = board.getPieceMoves(0, 0);

        expect(moves).toEqual([])
    })
    it('should moves piece', () => {
        board.movePiece(1, 0, 2, 0);
        let expectedBoard = [
            [{ type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' }, { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }],
            [null, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }],
            [{ type: 'pawn', color: 'white' }, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [{ type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }],
            [{ type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' }, { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }],
        ];
        let completeBoard = board.getBoard();
        matchTwoBoards(completeBoard, expectedBoard);
    })
    it('should return not valid if not valid move', () => {
        let move = board.movePiece(1, 0, 4, 0);
        expect(move).toBe('Invalid move');
    })
    it('should return empty array if kill moves are not exists', () => {
        let moves = board.getPieceAttackMoves(1, 0);
        expect(moves).toEqual([])
    })

    it('should return kill moves if exists', () => {
        board.movePiece(1, 4, 3, 4);
        board.movePiece(6, 3, 4, 3);

        let moves = board.getPieceAttackMoves(3, 4);
        expect(moves.sort()).toEqual([
            {
                row: 4,
                column: 3
            }
        ]);
    })

    it('should move to kill', () => {
        board.movePiece(1, 4, 3, 4);
        board.movePiece(6, 3, 4, 3);
        board.movePiece(3, 4, 4, 3);

        let expectedBoard = [
            [{ type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' }, { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }],
            [{ type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, null, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, { type: 'pawn', color: 'white' }, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [{ type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, null, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }],
            [{ type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' }, { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }],
        ];
        let completeBoard = board.getBoard();

        matchTwoBoards(completeBoard, expectedBoard);
    })

    it('should check if lost', () => {
        board.movePiece(1, 4, 3, 4);
        board.movePiece(6, 3, 4, 3);
        board.movePiece(3, 4, 4, 3);

        expect(board.checkIfLost('black')).toBe(false);
    })

    it('should return false if lost', () => {
        board.movePiece(1, 4, 3, 4);
        board.movePiece(6, 1, 5, 1);
        board.movePiece(0, 5, 3, 2);
        board.movePiece(7, 1, 5, 0);
        board.movePiece(0, 3, 2, 5);
        board.movePiece(5, 0, 3, 1);
        board.movePiece(2, 5, 6, 5);

        expect(board.checkIfLost('black')).toBe(true);

    })

});