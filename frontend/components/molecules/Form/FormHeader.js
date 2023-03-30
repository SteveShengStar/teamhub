import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { SystemComponent } from '../../atoms/SystemComponents';
import Subtitle from '../../atoms/Subtitle';

const FormHeader = ({ title, description, marginBottom }) => {
    const theme = useContext(ThemeContext);
    return (
        <SystemComponent mb={marginBottom}>
            <SystemComponent textAlign='center'>
                <Subtitle>{title}</Subtitle>
            </SystemComponent>
            <SystemComponent fontSize={theme.fontSizes.smallTitle}>
                {description}
            </SystemComponent>
        </SystemComponent>
    );
};
export default FormHeader;
