import Game from "../src/game/Game";
import Player from "../src/player/Player";

describe('Player', () => {
    let player: Player;
    beforeEach(() => {
        player = new Player('Player');
    });
    it('should create an instance', () => {
        expect(player).toBeTruthy();
    });
    it('should have a name', () => {
        expect(player.name).toBeDefined();
    });
    it('should has piece color', () => {
        player.color = 'white'
        expect(player.color).toBeDefined();
    })
    it('should be able to create a new game', () => {
        player.createNewGame();
        expect(player.game).toBeDefined();
    })
    it('should not be able to create a game if he is in a game', () => {
        player.createNewGame();
        expect(() => {
            player.createNewGame();
        }).toThrowError('Player is already in a game');
    })
    it('should be able to join game', () => {
        player.createNewGame();
        let game = player.game;
        let player2 = new Player('Player2');
        player2.joinGame(game!);
        expect(player2.game).toBeDefined();
    })

    it('should not be able to join game if he is in a game', () => {
        player.createNewGame();
        let game = player.game;
        let player2 = new Player('Player2');
        player2.joinGame(game!);
        expect(() => {
            player2.joinGame(game!);
        }).toThrowError('Player is already in a game');
    });
    it('should not be able to join game if game is full', () => {
        player.createNewGame();
        let game = player.game;
        let player2 = new Player('Player2');
        player2.joinGame(game!);
        let player3 = new Player('Player3');
        expect(() => {
            player3.joinGame(game!);
        }).toThrowError();
    });
});