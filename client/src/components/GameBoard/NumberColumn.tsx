
export const NumberColumn = (props: any) => {
    const currentColor = props.currentColor;
    const renderColumn = () => {
        let column = [];
        if (currentColor === 'black')
            for (let i = 0; i < 8; i++)
                column.push(<h4 className="tile">{i + 1}</h4>)
        else
            for (let i = 8; i > 0; i--)
                column.push(<h4 className="tile">{i}</h4>)
        return column;
    }
    return (
        <div className="col">
            {
                renderColumn()
            }
        </div>
    );
};