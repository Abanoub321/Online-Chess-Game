import '../../App.css';
import Image from 'react-bootstrap/Image'
const whiteQueen = require('../../assets/queen_white.png');
const whiteRook = require('../../assets/rook_white.png');
const whiteBishop = require('../../assets/bishop_white.png');
const whiteKnight = require('../../assets/knight_white.png');
export const WhitePromote = (props: any) => {
    const { onclick } = props;
    return (
        <div className='overlay'>
            <Image src={whiteQueen} fluid className='promote_pieces' onClick={() => onclick('queen')} />
            <Image src={whiteRook} fluid className='promote_pieces' onClick={() => onclick('rook')} />
            <Image src={whiteBishop} fluid className='promote_pieces' onClick={() => onclick('bishop')} />
            <Image src={whiteKnight} fluid className='promote_pieces' onClick={() => onclick('knight')} />
        </div>
    );
};