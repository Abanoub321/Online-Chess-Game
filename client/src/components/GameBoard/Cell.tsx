
import React from 'react';
import Image from 'react-bootstrap/Image'
export const Cell = (props: any) => {
    const { color, row, col, cell } = props;

    return (
        <div style={{
            display:'flex',
            backgroundColor: color,
            width: '75px',
            height: '75px',
            border: '1px solid black',
            margin: '0px',
            justifyContent: 'center',

        }}
            onClick={() => {
               
            }}
        >
            {
                cell == null ? null :
                    <Image src={require(`../../assets/${cell.type}_${cell.color}.png`)} fluid />
            }
        </div>
    );
};

const styles = {
    rectangle: {
        width: '50px',
        height: '50px',
    }
}