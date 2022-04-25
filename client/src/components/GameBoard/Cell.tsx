
import React from 'react';

export const Cell = (props: any) => {
    const { color, row, col } = props;

    return (
        <div style={{
            backgroundColor: color,
            width: '75px',
            height: '75px',
            border: '1px solid black',
            margin: '0px'
        }}
            onClick={() => {
                alert(`${row} + ${col}`);
            }}
        >

        </div>
    );
};

const styles = {
    rectangle: {
        width: '50px',
        height: '50px',
    }
}