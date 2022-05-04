import { useState, useEffect } from 'react';
import { GameCard } from './GameCard';

export const GameCardsList = (props: any) => {
    const [games, setGames] = useState([]);
    const { socket } = props;
    useEffect(() => {
        socket.on('gameList', (updatedGames: any) => {
            setGames(updatedGames);
        })
    }, [games])

    return (
        <div>


            {
                games.map((game: any, index: number) => {
                    return <GameCard game={game} key={index} />
                })
            }
        </div>
    );
};