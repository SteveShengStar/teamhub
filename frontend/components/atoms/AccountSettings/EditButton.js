import styled from 'styled-components';
import theme from '../../theme'; // TODO: use props=>theme instead of importing
import Button from '../Button';


const EditButton = styled(Button)`
    background-color: ${theme.colors.greys[2]};
    height: 30px;
`;
export default EditButton;
