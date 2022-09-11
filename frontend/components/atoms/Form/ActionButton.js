import styled from 'styled-components';
import Button from '../Button';

const ActionButton = styled(Button)`
    font-weight: ${props => props.theme.fontWeights.bold};
    font-size: ${props => props.theme.fontSizes.header4}px;

    cursor: ${props => props.disabled && `default`};
    &:hover {
        transform: ${props => props.disabled && `none`};
    }

    height: 40px;
    width: 120px;
`;
export default ActionButton;