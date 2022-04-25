import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom';
import { socket } from '../services/socket';
export const GameCard = (props: any) => {
    const game = props.game;
    const navigate = useNavigate();
    const joinGameHandler = (e:any) => {
        e.preventDefault();
        socket.emit('join game', game,(response:any) => {
            console.log(response);
            if(response.status == 'OK'){
                navigate(`/game/${response.gameId}`);
            }
            //else show error
        });
    }
    return (
        <Card border="primary" style={{ width: '10rem' , margin:5 }}>
            <Card.Body>
            <Button variant="outline-primary" onClick={joinGameHandler}>Join Game</Button>
            </Card.Body>
        </Card>
    );
};