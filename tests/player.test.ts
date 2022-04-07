import Player from "../src/player/Player";

describe('Player', () => {
    let player: Player;
    beforeEach(() => {
        player = new Player('Player', 'white');
    });
    it('should create an instance', () => {
        expect(player).toBeTruthy();
    });
    it('should have a name', () => {
        expect(player.name).toBeDefined();
    });
    it('should has piece color', () => {
        expect(player.color).toBeDefined();
    })
});