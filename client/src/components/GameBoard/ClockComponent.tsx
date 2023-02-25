// @flow 
import { useState } from 'react';
import { socket } from '../../services/socket';
import moment from 'moment';

type Props = {
    children?: JSX.Element;
    playerColor: string;
};


export const ClockComponent = (props: Props) => {
    const [time, setTime] = useState({
        whitePlayerTime: 0,
        blackPlayerTime: 0
    });
    socket.on('clock-tick', (response) => {
        setTime(response);
    })
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >
            {
                props.playerColor === 'white' ? (<>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span>{
                            moment(time.blackPlayerTime).format('mm:ss')
                        }</span>
                    </div>
                    {props.children}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >

                        <span>{
                            moment(time.whitePlayerTime).format('mm:ss')
                            }</span>
                    </div>
                </>) : (<>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span>{
                            moment(time.whitePlayerTime).format('mm:ss')
                            }</span>
                    </div>
                    {props.children}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span>{
                            moment(time.blackPlayerTime).format('mm:ss')
                            }</span>
                    </div>
                </>)
            }
        </div>
    );
};