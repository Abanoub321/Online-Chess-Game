import '../../App.css'
import React from 'react';
import Image from 'react-bootstrap/Image'
export const Cell = (props: any) => {
    const { color, row, col, cell } = props;


    const styles = {
        rectangle: {
            backgroundColor: color
        }
    }
    return (
        <div
            className={props.normalCell ? 'rectangle ' + 'normalMove' : props.attackCell ? 'killMove ' + 'rectangle' : 'rectangle'}
            style={styles.rectangle}
            onClick={() => props.onclick(row, col)
            }
        >

            {
                cell == null ? null :
                    <Image src={require(`../../assets/${cell.type}_${cell.color}.png`)} fluid />
            }
        </div >
    );

};
