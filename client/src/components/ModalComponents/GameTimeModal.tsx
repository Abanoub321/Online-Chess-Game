import '../../App.css';


export const GameTimesModal = (props: any) => {
    const { onclick } = props;
    let btnStyle = {
        width: '100px',
        height: '50px',
        margin: '10px'
    }
    return (
        <div style={
            {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                width: '100%',
                height: '500px',
                padding: '50px',
            }
        }>
            <h1
                style={{
                    textAlign: 'center',
                    fontSize: '30px',
                }}
            >Choose Game Time</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gridTemplateRows: 'repeat(4, 1fr)',
                gridGap: '10px',
                justifyItems: 'center',
                alignItems: 'center',

            }}>
                <button style={btnStyle} onClick={() => onclick(1, 0)}>1 + 0</button>
                <button style={btnStyle} onClick={() => onclick(2, 1)}>2 + 1</button>
                <button style={btnStyle} onClick={() => onclick(3, 0)}>3 + 0</button>
                <button style={btnStyle} onClick={() => onclick(3, 2)}>3 + 2</button>
                <button style={btnStyle} onClick={() => onclick(5, 0)}>5 + 0</button>
                <button style={btnStyle} onClick={() => onclick(5, 3)}>5 + 3</button>
                <button style={btnStyle} onClick={() => onclick(10, 0)}>10 + 0</button>
                <button style={btnStyle} onClick={() => onclick(10, 5)}>10 + 5</button>
                <button style={btnStyle} onClick={() => onclick(15, 0)}> 15 + 0</button>
                <button style={btnStyle} onClick={() => onclick(15, 10)}> 15 + 10</button>
                <button style={btnStyle} onClick={() => onclick(30, 0)}> 30 + 0</button>
                <button style={btnStyle} onClick={() => onclick(30, 15)}> 30 + 15</button>
            </div>

        </div>
    );
};

const GameTimeModalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    game_times: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        borderRadius: '4px',
        border: '1px solid #ccc',
        padding: '20px',
        width: '500px',
        height: '500px',
        zIndex: 9999
    },
    game_time_buttons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    game_time_button: {
        width: '100px',
        height: '100px',
        margin: '10px'
    }
}