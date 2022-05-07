import Game from "../src/game/Game";
import GameStatus from "../src/GameStatusEnum";
import Player from "../src/player/Player";


describe('Game', () => {
    let game: Game;
    let player1: Player
    beforeEach(() => {
        player1 = new Player('X');
        game = new Game(player1);
    })
    it('should create an instance', () => {
        expect(game).toBeTruthy();
    });

    it('should start with a board', () => {
        expect(game.board).toBeTruthy();
    });
    it('should start with a player', () => {
        expect(game.player1).toBeTruthy();
    });

    it('be in waiting status if it has only one player', () => {
        expect(game.status).toBe('WAITING_FOR_PLAYERS');
    });

    it('should accept joining another player', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        expect(player2).toBeDefined();
    });

    it('can not join players if it is complete', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);

        expect(() => game.joinGame(new Player('Z'))).toThrow();
    })
    it('should assign colors to players', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        expect(game.player1.color).toBeTruthy();
        expect(game.player2.color).toBeTruthy();
    });

    it('should assign current player', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        expect(game.currentPlayer).toBeTruthy();
    });

    it('should not return avaiable moves if game did not started', () => {
        expect(() => game.avialableMoves(player1, 0, 0)).toThrow();
    })

    it('should return piece available moves', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        let moves = game.avialableMoves(currentPlayer!, 1, 1);
        expect(moves).toEqual({
            normal: [
                {
                    row: 2,
                    column: 1
                },
                {
                    row: 3,
                    column: 1
                }
            ],
            attack: []
        });
    })

    it('should not return moves if it is not my turn', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer == player1 ? player2 : player1;
        expect(() => game.avialableMoves(currentPlayer, 1, 1)).toThrow();
    });

    it('should moves if it is my turn', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 1, 2, 1);
        let board = game.board.getBoard();

        expect(board[2][1]).toEqual({
            type: 'pawn',
            color: 'white'
        });
    });

    it('should not moves if it is not my turn', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer == player1 ? player2 : player1;
        expect(() => game.movePiece(currentPlayer!, 1, 1, 2, 1)).toThrow();
    });

    it('should swap turns after each move', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 1, 2, 1);
        expect(game.currentPlayer?.color).toBe('black');
    });

    it('should let black moves next', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 1, 2, 1);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 1, 4, 1);
        let board = game.board.getBoard();

        expect(board[4][1]).toEqual({
            type: 'pawn',
            color: 'black'
        });
    })

    it('should not let player know other player piece moves', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;

        expect(() => game.avialableMoves(currentPlayer!, 6, 1)).toThrow();
    })

    it('should not let player move other player piece', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;

        expect(() => game.movePiece(currentPlayer!, 6, 1, 4, 1)).toThrow();
    })

    it('should check if someone wins', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 4, 3, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 7, 1, 5, 0);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 3, 2, 5);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 4, 4, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 5, 3, 2);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 1, 4, 1);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 2, 5, 6, 5);

        expect(game.board.getDefendAllies('black')).toEqual([]);
    })

    it('should be checked if Queen normal checks', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 4, 3, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 4, 4, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 3, 4, 7);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 7, 5, 7);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 4, 7, 6, 5);
        let defenders = game.board.getDefendAllies('black');
        expect(defenders.length).toBe(1);
        expect(game.status).toBe(GameStatus.BLACK_CHECKMATE)
    })

    it('should be checked if Knight normal check', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 1, 2, 2);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 3, 4, 3);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 2, 2, 4, 1);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 0, 5, 0);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 4, 1, 6, 2);
        expect(game.status).toBe(GameStatus.BLACK_CHECKMATE)
    })

    it('should be checked if bishop normal check', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 3, 3, 3);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 4, 5, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 4, 3, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 3, 4, 3);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 5, 4, 1);
        expect(game.status).toBe(GameStatus.BLACK_CHECKMATE)
    })

    it('should be checked if rook normal check', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 0, 3, 0);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 4, 4, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 0, 2, 0);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 4, 4, 3, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 2, 0, 2, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 7, 6, 5, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 2, 4, 3, 4);
        expect(game.status).toBe(GameStatus.BLACK_CHECKMATE)
    })
    it('should not accept moving any piece when checked if it not defending', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 4, 3, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 4, 4, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 3, 4, 7);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 7, 5, 7);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 4, 7, 4, 4);
        currentPlayer = game.currentPlayer;
        expect(game.avialableMoves(currentPlayer!, 5, 7)).toEqual({
            normal: [],
            attack: []
        });
        expect(game.avialableMoves(currentPlayer!, 7, 3).normal.length).not.toBe(0);
    })

    it('should move only available pieces when checked', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 4, 3, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 4, 4, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 3, 4, 7);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 7, 5, 7);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 4, 7, 4, 4);
        currentPlayer = game.currentPlayer;
        expect(game.avialableMoves(currentPlayer!, 7, 3)).toEqual({
            normal: [{ row: 6, column: 4 }],
            attack: []
        });
        expect(game.avialableMoves(currentPlayer!, 7, 5)).toEqual({
            normal: [{ row: 6, column: 4 }],
            attack: []
        });
        expect(game.avialableMoves(currentPlayer!, 7, 6)).toEqual({
            normal: [{ row: 6, column: 4 }],
            attack: []
        });
    })

    it('should also be avail to kill if checked only', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 4, 3, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 4, 4, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 3, 4, 7);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 7, 5, 7);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 4, 7, 4, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 7, 6, 6, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 4, 4, 6, 4);
        currentPlayer = game.currentPlayer;
        expect(game.avialableMoves(currentPlayer!, 7, 3)).toEqual({
            normal: [],
            attack: [{ row: 6, column: 4 }]
        });
        expect(game.avialableMoves(currentPlayer!, 7, 5)).toEqual({
            normal: [],
            attack: [{ row: 6, column: 4 }]
        });
        expect(game.avialableMoves(currentPlayer!, 5, 7)).toEqual({
            normal: [],
            attack: []
        });
    })


    it('should be avail to king escape if checked', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 1, 2, 2);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 3, 4, 3);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 2, 2, 4, 1);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 0, 5, 0);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 4, 1, 6, 2);
        currentPlayer = game.currentPlayer;
        expect(game.board.getDefendAllies(currentPlayer.color).length).toBe(2);
    })

    it('should not continue if someone wins', () => {
        let player2 = new Player('Y');
        game.joinGame(player2);
        let currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 1, 4, 3, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 7, 1, 5, 0);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 3, 2, 5);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 4, 4, 4);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 0, 5, 3, 2);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 6, 1, 4, 1);
        currentPlayer = game.currentPlayer;
        game.movePiece(currentPlayer!, 2, 5, 6, 5);


        expect(() => game.movePiece(currentPlayer!, 5, 0, 4, 1)).toThrow();
    })

});