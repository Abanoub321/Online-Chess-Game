import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Cell } from "./Cell";
import { socket } from '../../services/socket';

export const GameBoard = (props: any) => {
    const { board, gameId } = props;
    const [gameBoard, setGameBoard] = useState(board);
    const [normalMoves, setNormalMoves] = useState({});
    const [attackMoves, setAttackMoves] = useState({});
    const { playerColor, currentPlayerTurn } = props;
    useEffect(() => {
        flipBoard();
    }, [board])
    const buildBoard = () => {
        return gameBoard.map((row: any, rowIndex: number) => {
            return (
                <Row key={rowIndex} className='gx-0' >
                    {row.map((cell: any, colIndex: number) => {

                        return (
                            <Col key={colIndex} style={
                                {
                                    margin: '0px',
                                }
                            }
                            >
                                <Cell
                                    color={(rowIndex + colIndex) % 2 == 0 ? 'white' : 'grey'}
                                    col={(colIndex - 8) * -1}
                                    row={(rowIndex - 8) * -1}
                                    cell={cell}
                                    onclick={handlePieceClick}
                                    handleAvailableMoves={handleAvailableMoves}
                                />
                            </Col>
                        )
                    })
                    }
                </Row>
            )
        })
    }

    const handleAvailableMoves = (row: number, col: number) => {
        let move = {
            x: row - 1,
            y: col - 1,
        }
        socket.emit('check-for-move', gameId, socket.id, move, (response: any) => {
            const {attack,normal} = response;
           /* attack.foreach(move => {
                attackMoves[move.x + ',' + move.y] = move;
            })*/
        })
    }
    const handlePieceClick = () => {
        if (playerColor == currentPlayerTurn) {
            return true
        }
        else {
            alert('not your turn');
            return false
        }
    }
    const flipBoard = () => {      
       let newBoard = board;
        setGameBoard(newBoard.reverse());
    }

    return (
        <Container style={{
            width: 'fit-content',
        }}>
            {
                buildBoard()
            }
        </Container>
    );
};