import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

export const CreateGameButton = (props: any) => {

    const { socket } = props;
    const navigate = useNavigate();
    const CreateGame = (e: Event | any) => {
        e.preventDefault();
        socket.emit('create game', (response: any) => {
            console.log(response);
            //if ok navigate to game
            if (response.status == 'OK') {
                navigate(`/game/${response.gameId}`, {
                    state: {
                        gameId: response.gameId,
                        board: response.board,
                        gameStatus: response.gameStatus
                    }
                });
            }
            //else show error
        });
    }
    return (
        <Button variant="primary" size="lg" onClick={CreateGame}>
            Create Game
        </Button>
    );
};