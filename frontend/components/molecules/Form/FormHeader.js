import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { SystemComponent, SystemSpan } from '../../atoms/SystemComponents';
import Subtitle from '../../atoms/Subtitle';

const FormHeader = ({ title, marginBottom }) => {
    const theme = useContext(ThemeContext);
    return (
        <SystemComponent
            fontSize={theme.fontSizes.header3}
            textAlign='center'
            mb={marginBottom}
        >
            <SystemSpan>
                <Subtitle>{title}</Subtitle>
            </SystemSpan>
        </SystemComponent>
    );
};
export default FormHeader;
