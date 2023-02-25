import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const LetterRow = (props: any) => {
    const currentColor = props.currentColor;
    const renderRow = () => {
        let row = [];
        if (currentColor === 'white')
            for (let i = 65; i <= 72; i++)
                row.push(<Col className="tile" style={{margin:0,padding:10,marginLeft:40}}><h4>{String.fromCharCode(i)}</h4></Col>)
        else
            for (let i = 72; i >= 65; i--)
                row.push(<Col className="tile" style={{margin:0,padding:10,marginLeft:40}}><h4>{String.fromCharCode(i)}</h4></Col>)
        return row;
    }
    return (
        <Row md={8} className='row' >
            {
                renderRow()
            }
        </Row>
    );
};