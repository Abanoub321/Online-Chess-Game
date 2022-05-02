import '../../App.css'
import React from 'react';
import Image from 'react-bootstrap/Image'
export const Cell = (props: any) => {
    const { color, row, col, cell } = props;


    const styles = {
        rectangle: {
            display: 'flex',
            backgroundColor: color,
            width: '75px',
            height: '75px',
            border: '1px solid black',
            margin: '0px',
            justifyContent: 'center',

        }
    }
    return (
        <div style={styles.rectangle}
            className={props.normalCell ? 'normalMove' : ''}
            onClick={() => props.onclick(row, col)}
        >

            {
                cell == null ? null :
                    <Image src={require(`../../assets/${cell.type}_${cell.color}.png`)} fluid />
            }
        </div >
    );

};
