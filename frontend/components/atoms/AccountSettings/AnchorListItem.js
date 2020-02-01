import styled from 'styled-components';
import Button from '../Button';

const AnchorListItem = styled(Button)`
    padding-top: 2px;
    padding-bottom: 2px;

    // TODO: Is there a better way to do this ?
    transform: scale(1.0) !important;
`;
export default AnchorListItem;