import styled, { ThemeContext } from 'styled-components';
import { SystemSpan, SystemComponent } from './SystemComponents';
import { useContext } from 'react';

export const CrossIcon = styled(SystemSpan)`
    display: inline-block;
    vertical-align: middle;
`;

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
    background-color: ${(props) => props.theme.colors.white};

    &:hover {
        ${CrossIcon} {
            color: ${(props) => props.theme.colors.alertAction};
        }

        background-color: ${(props) => props.theme.colors.inactive};
    }
`;

const SelectedItemContainer = ({ itemName, handleDeselect }) => {
    const theme = useContext(ThemeContext);

    return (
        <SystemComponent
            display='flex'
            flexDirection='row'
            mt={0}
            mr={4}
            mb={2}
            ml={0}
            paddingY={0}
            pr={0}
            pl={4}
            borderRadius={theme.radii[2]}
            backgroundColor={theme.colors.listBackgroundBlue}
        >
            <SystemComponent pr={1} paddingY={1}>
                {itemName}
            </SystemComponent>
            <CrossIconWrapper onClick={() => handleDeselect(itemName)}>
                <CrossIcon>
                    <span className='fas fa fa-times'></span>
                </CrossIcon>
            </CrossIconWrapper>
        </SystemComponent>
    );
};
export default SelectedItemContainer;
