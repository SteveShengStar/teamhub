import React from 'react';
import styled from 'styled-components';

import {SystemComponent} from '../../atoms/SystemComponents';
import EditableSectionHeader from './EditableSectionHeader';


const SettingsComponentBody = styled(SystemComponent)`
    display: grid;
    grid-row-gap: ${props => props.theme.space[3]}px;
    margin-bottom: ${props => props.theme.space[5]}px;
`;

const SettingsSection = ({children, title, onEditClicked}) => {
    return (
        <>
            <EditableSectionHeader 
                title={title} 
                handleEditClicked={onEditClicked} 
            />
            <SettingsComponentBody>
                {children}
            </SettingsComponentBody>
        </>
    );
};
export default SettingsSection;