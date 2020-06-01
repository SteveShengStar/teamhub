import styled from 'styled-components';
import { SystemComponent } from './SystemComponents';
import { space } from 'styled-system';
import theme from '../theme';

const Card = styled(SystemComponent)`
    padding: ${props => props.theme.space.cardPaddingSmall}px;
    ${props => props.theme.mediaQueries.tablet} {
        padding: ${props => props.theme.space.cardPadding}px;
    }
    ${space}
    border: 1px solid ${props => props.theme.colors.greys[1]};
    /*background-color: rgba(240,240,240,0.9);*/
    background-color: ${props => props.theme.colors.background};

    /*@supports ((-webkit-backdrop-filter: blur(13px)) or (backdrop-filter: blur(13px))) {
        backdrop-filter: blur(13px);
        background-color: rgba(255,255,255,0.37);
    }*/
`;

Card.defaultProps = {
    borderRadius: 'default',
    //boxShadow: 'default',
};

export default Card;