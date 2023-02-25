import { GameCardsList } from '../components/GameCardsList';
import { CreateGameButton } from '../components/CreateGameButton';

export const HomeRoute = (props: any) => {
    const { socket } = props;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50
            }}
        >
            <CreateGameButton socket={socket} />
            <GameCardsList socket={socket} />
        </div>
    );
};