import '../../App.css';
import { BlackPromote } from './BlackPromote';
import { WhitePromote } from './WhitePromote';

export const ModalMatcher = (props: any) => {
    const { onClick, color } = props;
    if (color === 'white')
        return (
            <WhitePromote onclick={onClick} />
        );
    else
        return (
            <BlackPromote onclick={onClick} />
        );
};