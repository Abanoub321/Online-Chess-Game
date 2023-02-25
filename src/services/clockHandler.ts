import Player from "../player/Player";

const handleTimeDecrimental = (player: Player) => {
    const timeInterval = setInterval(() => {
        if (player.currentGameTime > 0) {
            player.currentGameTime = player.currentGameTime - 1000;
        } else {
            clearInterval(timeInterval);
        }
    }, 1000);

    return timeInterval;
}

export const handleClock = (player:Player, increment: number, stopTimer: Boolean = false) => {
    const timeInterval = handleTimeDecrimental(player);
    if (stopTimer) {
        console.log('stop timer')
        clearInterval(timeInterval);
    }
    return timeInterval;
    // return () => {
    //     clearInterval(timeInterval);
    // }
}