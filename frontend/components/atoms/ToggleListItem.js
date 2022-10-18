import styled from 'styled-components';
import { variant } from 'styled-system';

import { SystemComponent } from './SystemComponents';
import Button from './Button';
import { CrossIcon } from './SelectedItemContainer';
import { lowerCase } from 'lodash';

const CrossIconWrapper = styled(SystemComponent)`
    text-align: center;
    cursor: pointer;
    width: 30px;
    -webkit-border-top-right-radius: inherit;
    -webkit-border-bottom-right-radius: inherit;
    -moz-border-radius-topright: inherit;
    -moz-border-radius-bottomright: inherit;
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;

    border-style: solid;
    border-width: 3px;
    margin-left: 10px;

    background-color: #ffffff;
    color: #000000;
`;

// TODO: consider making this inherit from SystemButton --> decouples these 2 atoms
const CustomToggle = styled(Button)`
    padding-bottom: 0;
    padding-top: 0;
    ${(props) => props.selected && `padding-right: 0;`}
    display: flex;

    &:hover {
        /* TODO: Deactivate these effects for now. Think about what to do for this later */
        /* TODO: Think about using LESS or SASS to make transitions more smooth */
        /* https://www.freecodecamp.org/forum/t/is-there-a-way-to-calculate-the-width-needed-to-get-to-the-end-of-the-parent-element-in-a-css-transition/184506*/

        opacity: 1;
        transform: none;

        ${(props) =>
            !props.selected &&
            `
            &::after {
                content: "✔";
                padding-top: 3px;
                padding-bottom: 3px;
                margin-left: 10px;
            }
        `}

        ${CrossIconWrapper} {
            ${CrossIcon} {
                color: ${(props) => props.theme.colors.alertAction};
            }
            background-color: ${(props) => props.theme.colors.greys[1]};
        }
    }
`;

// TODO: use proptypes to make this take only text
const ToggleListItem = ({ text, id, selected, onSelect }) => {
    const variant = selected ? lowerCase(id) : 'cancel';

    return (
        <CustomToggle
            variant={variant}
            selected={selected}
            onClick={() => onSelect(id)}
        >
            <SystemComponent paddingY='3px' color='#ffffff'>
                {text}
            </SystemComponent>
            {selected && (
                <CrossIconWrapper borderColor={variant}>
                    <CrossIcon>
                        <span className='fas fa fa-times'></span>
                    </CrossIcon>
                </CrossIconWrapper>
            )}
        </CustomToggle>
    );
};
export default ToggleListItem;
