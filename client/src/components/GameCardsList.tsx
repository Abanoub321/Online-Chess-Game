import { useState, useEffect } from 'react';
import { AvailableGames } from '../types/availableGames';
import { GameCard } from './GameCard';

export const GameCardsList = (props: any) => {
    const [games, setGames] = useState<AvailableGames[]>([]);
    const { socket } = props;
    useEffect(() => {
        socket.on('gameList', (updatedGames: any) => {
            console.log('updatedGames: ', updatedGames);
            
            setGames(updatedGames);
        })
    }, [games])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
                flexWrap: 'wrap'
            }}
        >


            {
                games.map((game: AvailableGames, index: number) => {
                    return <GameCard game={game} key={index} />
                })
            }
        </div>
    );
};