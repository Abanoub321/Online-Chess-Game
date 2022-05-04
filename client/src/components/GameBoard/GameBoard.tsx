import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Cell } from "./Cell";
import { socket } from '../../services/socket';

export const GameBoard = (props: any) => {
    let { board, gameId } = props;


    const [normalMoves, setNormalMoves] = useState({} as any);
    const [attackMoves, setAttackMoves] = useState({} as any);
    const [selectedCell, setSelectedCell] = useState({} as any);
    const { playerColor, currentPlayerTurn } = props;

    const buildBoard = () => {
        board.reverse()
        console.log(board)
        return board.map((row: any, rowIndex: number) => {
            return (
                <Row key={rowIndex} className='gx-0' >
                    {row.map((cell: any, colIndex: number) => {
                        let normalFlag, AttackFlag;
                        if (normalMoves[`${rowIndex},${colIndex}`] == true)
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
                                    col={colIndex}
                                    row={rowIndex}
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
                setSelectedCell({ row, col });
            }
        })
    }
    const handlePieceMove = (row: number, col: number) => {

        socket.emit('make-move', gameId, socket.id, { x: selectedCell.row - 1, y: selectedCell.col - 1 }, { x: row - 1, y: col - 1 }, (response: any) => {
            console.log(response);
            setNormalMoves({});
            setAttackMoves({});
            setSelectedCell({ });
        })

    }
    const handlePieceClick = (row: number, col: number) => {

        if (playerColor == currentPlayerTurn) {
            if (normalMoves[`${row},${col}`] || attackMoves[`${row},${col}`]) {
                // move piece
                handlePieceMove(row + 1, col + 1);
            }
            else {
                handleAvailableMoves(row + 1, col + 1);
            }
        }
        else {
            alert('not your turn');
            return false
        }
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