import { useState } from 'react';
import Modal from 'react-overlays/Modal';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { GameTimesModal } from './ModalComponents/GameTimeModal';

export const CreateGameButton = (props: any) => {
    const [show, setShow] = useState(false);
    const { socket } = props;
    const navigate = useNavigate();
    const toggleModal = () => {
        setShow(!show);
    }
    const CreateGame = (gameTime: number, incremental: number) => {
        socket.emit('create game', gameTime*60*1000, incremental, (response: any) => {
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
        <>
            <Button variant="primary" size="lg" onClick={toggleModal}
                style={{
                    margin: 15
                }}
            >
                Create Game
            </Button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="modal-label"
                enforceFocus
                className='modal-guts'
            >
                <GameTimesModal
                    onclick={CreateGame}
                />
            </Modal>
        </>
    );
};