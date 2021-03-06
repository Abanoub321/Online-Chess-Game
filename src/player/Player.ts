import Game from "../game/Game";


export default class Player {
    name: string;
    color: string | undefined;
    game: Game | undefined;
    constructor(name: string) {
        this.name = name;
    }
    createNewGame() {
        if (this.game)
            throw new Error('Player is already in a game');
        this.game = new Game(this);
    }
    joinGame(game: Game) {
        if (this.game)
            throw new Error('Player is already in a game');

        try {
            game.joinGame(this);
            this.game = game;
        } catch (e: Error | any) {
            throw e;
        }
    }
}