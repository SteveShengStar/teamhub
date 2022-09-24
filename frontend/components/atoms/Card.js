import styled from 'styled-components';
import { SystemComponent } from './SystemComponents';
import { space } from 'styled-system';

const Card = styled(SystemComponent)`
    padding: ${(props) => props.theme.space.cardPaddingSmall}px;
    ${(props) => props.theme.mediaQueries.tablet} {
        padding: ${(props) => props.theme.space.cardPadding}px;
    }
    ${space}
    border: 1px solid ${(props) => props.theme.colors.greys[1]};
    background-color: ${(props) => props.theme.colors.background};
`;

Card.defaultProps = {
    borderRadius: 'default',
};

export default Card;
