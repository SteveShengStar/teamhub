import styled from 'styled-components';
import Button from './Button';
import { variant } from 'styled-system';


// TODO: consider making this inherit from SystemButton --> decouples these 2 atoms
const CustomButton = styled(Button)`
    padding-top: 2px;
    padding-bottom: 2px;
    
    &::after {
        margin-left: 15px;
        content: "✔";
    }
`;
const ToggleListItem = ({variant}) => {
    return (
        <CustomButton variant={variant}/>
    )
}

export default ToggleListItem;