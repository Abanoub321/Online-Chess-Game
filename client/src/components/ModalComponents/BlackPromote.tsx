import '../../App.css';
import Image from 'react-bootstrap/Image'
const blackQueen = require('../../assets/queen_black.png');
const blackRook = require('../../assets/rook_black.png');
const blackBishop = require('../../assets/bishop_black.png');
const blackKnight = require('../../assets/knight_black.png');

export const BlackPromote = (props: any) => {
    const { onclick } = props;
    return (
        <div className='overlay'>
            <Image src={blackQueen} fluid className='promote_pieces' onClick={() => onclick('queen')} />
            <Image src={blackRook} fluid className='promote_pieces' onClick={() => onclick('rook')} />
            <Image src={blackBishop} fluid className='promote_pieces' onClick={() => onclick('bishop')} />
            <Image src={blackKnight} fluid className='promote_pieces' onClick={() => onclick('knight')} />
        </div>
    );
};