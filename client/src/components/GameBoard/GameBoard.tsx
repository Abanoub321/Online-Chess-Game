import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Cell } from "./Cell";

export const GameBoard = (props: any) => {
    const { board } = props;
    const [gameBoard, setGameBoard] = useState([] as any);

    useEffect(() => {

        assignPieces(turnIntoBoard());
    }, [])
    const buildBoard = () => {
        console.log(gameBoard);
        let color = 'black';
        return gameBoard.map((row: any, rowIndex: number) => {
            return (
                <Row key={rowIndex} className='gx-0'>
                    {row.map((cell: any, colIndex: number) => {
                        color = color === 'black' ? 'white' : 'black';

                        return (
                            <Col key={colIndex} style={
                               {
                                   margin: '0px',
                               }
                            }  >
                                <Cell color={color} col={colIndex} row={rowIndex} />
                            </Col>
                        )
                    })
                    }
                </Row>
            )
        })
    }

    const turnIntoBoard = () => {
        let newArray = new Array(8);
        for (let i = 0; i < 8; i++) {
            newArray[i] = new Array(8);
            for (let j = 0; j < 8; j++)
                newArray[i][j] = null;
        }

        return newArray;
    }

    const assignPieces = (newGameBoard: any) => {
        let piecesArray = board.pieces;
        piecesArray.forEach((piece: any) => {
            const row = piece.row - 1;
            const col = (piece.column).charCodeAt(0) - 65;
            newGameBoard[row][col] = piece;

        });
        setGameBoard(newGameBoard);
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