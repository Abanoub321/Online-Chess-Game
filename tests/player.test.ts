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
});