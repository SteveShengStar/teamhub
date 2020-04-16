import styled from 'styled-components';
import Button from './Button';
import { variant } from 'styled-system';


// TODO: consider making this inherit from SystemButton --> decouples these 2 atoms
const CustomButton = styled(Button)`
    padding-top: 2px;
    padding-bottom: 2px;

    &:hover {
        /* TODO: Deactivate these effects for now. Think about what to do for this later */
        /* TODO: Think about using LESS or SASS to make transitions more smooth */
        /* https://www.freecodecamp.org/forum/t/is-there-a-way-to-calculate-the-width-needed-to-get-to-the-end-of-the-parent-element-in-a-css-transition/184506*/
        
        &::after {
            margin-left: 15px;
            content: "✔";
        }
        transform: none;
    }
    
    &::after {
        ${props => props.selected && 'margin-left: 15px;'}
        ${props => props.selected && 'content: "✔";'}
    }
`;
// TODO: use proptypes to make this take only text
const ToggleListItem = ({children, id, variant, selected, onSelect}) => {
    
    return (
        <CustomButton variant={variant}
            selected={selected}
            onClick={() => onSelect(id)}
        >
            {children}
        </CustomButton>
    )
}

export default ToggleListItem;