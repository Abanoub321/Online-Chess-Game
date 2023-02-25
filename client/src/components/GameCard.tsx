import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';
import { socket } from '../services/socket';
import { AvailableGames } from '../types/availableGames';
export const GameCard = (props: any) => {
    const game = props.game as AvailableGames;
    const navigate = useNavigate();
    const joinGameHandler = (e: any) => {
        e.preventDefault();
        socket.emit('join game', game.id, (response: any) => {
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
        <Card border="primary" style={{ width: '10rem', margin: 5 }}>
            <Card.Body
                style={{
                    textAlign: 'center',
                }}
            >
                <Card.Title>{game.gameTime / 60 / 1000} + {game.increment}</Card.Title>
                <Button variant="outline-primary" onClick={joinGameHandler}>Join Game</Button>
            </Card.Body>
        </Card>
    );
};