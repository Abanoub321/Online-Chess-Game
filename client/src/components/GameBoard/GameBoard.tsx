import '../../App.css';
import { useEffect, useState } from "react";
import { Cell } from "./Cell";
import { socket } from '../../services/socket';

export const GameBoard = (props: any) => {
    const { board, gameId, gameStatus, kingsPosition } = props;


    const [normalMoves, setNormalMoves] = useState({} as any);
    const [attackMoves, setAttackMoves] = useState({} as any);
    const [selectedCell, setSelectedCell] = useState({} as any);
    const [checked, setChecked] = useState('');
    const { playerColor, currentPlayerTurn } = props;

    useEffect(() => {
        if (gameStatus === 'BLACK_CHECKMATE')
            setChecked('black');
        else if (gameStatus === 'WHITE_CHECKMATE')
            setChecked('white');
        else {
            setChecked('')
        }
    }, [gameStatus])

    const buildBoard = () => {
        let newBoard = [];
        if (playerColor === 'black') {

            for (let i = 0; i < board.length; i++) {

                for (let j = 0; j < board[i].length; j++) {
                    let cell = board[i][j];
                    let normalFlag, AttackFlag;
                    if (normalMoves[`${i},${j}`] == true)
                        normalFlag = true
                    if (attackMoves[`${i},${j}`] == true)
                        AttackFlag = true
                    if (checked == 'white' && kingsPosition.whiteKing.row == i + 1 && kingsPosition.whiteKing.column == String.fromCharCode(65 + j))
                        AttackFlag = true
                    if (checked == 'black' && kingsPosition.blackKing.row == i + 1 && kingsPosition.blackKing.column == String.fromCharCode(65 + j))
                        AttackFlag = true
                    newBoard.push(<Cell
                        color={(i + j) % 2 == 0 ? 'white' : 'grey'}
                        col={j}
                        row={i}
                        cell={cell}
                        onclick={handlePieceClick}
                        handleAvailableMoves={handleAvailableMoves}
                        attackCell={AttackFlag}
                        normalCell={normalFlag}
                    />)
                }
            }
        } else {

            for (let i = board.length - 1; i >= 0; i--) {

                for (let j = board.length - 1; j >= 0; j--) {
                    let cell = board[i][j];
                    let normalFlag, AttackFlag;
                    if (normalMoves[`${i},${j}`] == true)
                        normalFlag = true
                    if (attackMoves[`${i},${j}`] == true)
                        AttackFlag = true
                    if (checked == 'white' && kingsPosition.whiteKing.row == i + 1 && kingsPosition.whiteKing.column == String.fromCharCode(65 + j))
                        AttackFlag = true
                    if (checked == 'black' && kingsPosition.blackKing.row == i + 1 && kingsPosition.blackKing.column == String.fromCharCode(65 + j))
                        AttackFlag = true
                    newBoard.push(<Cell
                        color={(i + j) % 2 == 0 ? 'white' : 'grey'}
                        col={j}
                        row={i}
                        cell={cell}
                        onclick={handlePieceClick}
                        handleAvailableMoves={handleAvailableMoves}
                        attackCell={AttackFlag}
                        normalCell={normalFlag}
                    />)
                }
            }
        }
        return newBoard;
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
            setNormalMoves({});
            setAttackMoves({});
            setSelectedCell({});
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
        <div className='board' id="board">
            {
                buildBoard()
            }
        </div>

    );
};