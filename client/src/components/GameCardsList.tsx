import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { GameCard } from './GameCard';

export const GameCardsList = (props: any) => {
    const [games, setGames] = useState([]);
    const { socket } = props;
    useEffect(() => {
        socket.on('gameList', (updatedGames: any) => {
            console.log(updatedGames)
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