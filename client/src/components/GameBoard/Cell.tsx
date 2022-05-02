import '../../App.css'
import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image'
export const Cell = (props: any) => {
    const { color, row, col, cell } = props;
    const [pressed, setPressed] = useState(false);
    useEffect(() => {
        if (props.normalCell)
            console.log(props);
    })

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
        className={props.normalCell?'normalMove':''}
            onClick={() => {
                if (props.onclick()) {
                    if (!pressed) {
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
