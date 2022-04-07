import Game from "../src/game/Game";
import Player from "../src/player/Player";


describe('Game', () => {
    let game: Game;
    beforeEach(() => {
        game = new Game(new Player('X', 'white'));
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
        let player2 = new Player('Y', 'black');
        game.joinGame(player2);
        expect(player2).toBeDefined();
    });

    it('can not join players if it is complete', () => {
        let player2 = new Player('Y', 'black');
        game.joinGame(player2);

        expect(() => game.joinGame(new Player('Z', 'black'))).toThrow();
    })
});