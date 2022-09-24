import React from 'react';
import LargeButton from '../../atoms/LargeButton';
import Header3 from '../../atoms/Header3';
import { SystemComponent } from '../../atoms/SystemComponents';

import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

const EditableSectionHeader = ({ title, handleEditClicked }) => {
    const theme = useContext(ThemeContext);

    return (
        <SystemComponent display='flex' justifyContent='space-between'>
            <SystemComponent
                style={{ transformOrigin: 'left' }}
                mr={theme.space.editableHeaderMargin}
            >
                <Header3>{title}</Header3>
            </SystemComponent>
            <LargeButton handleClick={handleEditClicked} variant='primary'>
                Edit
            </LargeButton>
        </SystemComponent>
    );
};
export default EditableSectionHeader;
