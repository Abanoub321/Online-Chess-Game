import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Cell } from "./Cell";
import { socket } from '../../services/socket';

export const GameBoard = (props: any) => {
    const { board, gameId } = props;
    const [gameBoard, setGameBoard] = useState(board);
    const [flipped, setFlipped] = useState(false);
    const [normalMoves, setNormalMoves] = useState({} as any);
    const [attackMoves, setAttackMoves] = useState({} as any);
    const { playerColor, currentPlayerTurn } = props;
    useEffect(() => {
        if (!flipped)
            flipBoard();
    }, [board])
    const buildBoard = () => {
        return gameBoard.map((row: any, rowIndex: number) => {
            return (
                <Row key={rowIndex} className='gx-0' >
                    {row.map((cell: any, colIndex: number) => {
                        let normalFlag, AttackFlag;
                        if (normalMoves[`${(rowIndex - 7) * -1},${(colIndex - 7) * -1}`] == true)
                            normalFlag = true
                        if (attackMoves[`${rowIndex},${colIndex}`] == true)
                            AttackFlag = true
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
                                    attackCell={AttackFlag}
                                    normalCell={normalFlag}
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
            if (response.status == "OK") {

                const { attack, normal } = response.availableMoves;

                let newNormalMoves: any = {};
                let newAttackMoves: any = {};
                normal.forEach((move: any) => {
                    let key = `${move.row},${move.column}`;
                    newNormalMoves[key] = true;
                })
                attack.forEach((move: any) => {
                    let key = `${move.row},${move.column}`;
                    newAttackMoves[key] = true;
                })
                setNormalMoves(newNormalMoves);
                setAttackMoves(newAttackMoves);
            }
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
        setFlipped(true);
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