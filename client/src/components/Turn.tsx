
export const Turn = (props:any) => {
    const color = props.color;
    return (
        <div className="turn">
            <h3>Turn</h3>
            <div className="color_turn" style={{backgroundColor:color}}>

            </div>
        </div>
    );
};