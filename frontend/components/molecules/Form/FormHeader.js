import React from 'react';
import { ThemeContext } from 'styled-components';
import { SystemComponent, SystemSpan, Subtitle } from '../../atoms/SystemComponents';

const FormHeader = ({ title, marginBottom }) => {
    const theme = useContext(ThemeContext);
    return (
      <SystemComponent
        fontSize={theme.fontSizes.header3}
        textAlign="center"
        mb={marginBottom}
      >
        <SystemSpan>
          <Subtitle>{title}</Subtitle>
        </SystemSpan>
      </SystemComponent>
    );
};
export default FormHeader;