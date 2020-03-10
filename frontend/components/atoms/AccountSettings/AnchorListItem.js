import styled from 'styled-components';
import Button from '../Button';

const AnchorListItem = styled(Button)`
    padding-top: 2px;
    padding-bottom: 2px;
    margin-bottom: ${props => props.theme.space[2]}px;

    &:hover {
        opacity: 1;
    }
`;
export default AnchorListItem;
