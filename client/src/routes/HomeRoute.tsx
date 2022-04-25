import React, { useState } from 'react';
import { GameCardsList } from '../components/GameCardsList';
import { CreateGameButton } from '../components/CreateGameButton';
//import { socket } from '../services/socket';
export const HomeRoute = (props: any) => {
    const { socket } = props;

    return (
        <div>
            <CreateGameButton socket={socket} />
            <GameCardsList socket={socket} />
        </div>
    );
};