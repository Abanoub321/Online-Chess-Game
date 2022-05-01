
import React, { useState } from 'react';
import Image from 'react-bootstrap/Image'
export const Cell = (props: any) => {
    const { color, row, col, cell } = props;
    const [pressed, setPressed] = useState(false);
    return (
        <div style={{
            display: 'flex',
            backgroundColor: color,
            width: '75px',
            height: '75px',
            border: '1px solid black',
            margin: '0px',
            justifyContent: 'center',

        }}
            onClick={() => {
                if(props.onclick()){
                    if (!pressed) {
                        console.log(row, col);
                        props.handleAvailableMoves(row, col);
                    } else {
                        console.log('after');
    
                    }
                    setPressed(!pressed);
                }
            }}
        >
            {
                cell == null ? null :
                    <Image src={require(`../../assets/${cell.type}_${cell.color}.png`)} fluid />
            }
        </div >
    );
};

const styles = {
    rectangle: {
        width: '50px',
        height: '50px',
    }
}