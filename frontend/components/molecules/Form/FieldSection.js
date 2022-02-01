import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from 'styled-components';

import { SystemComponent } from '../../atoms/SystemComponents';
import Header4 from '../../atoms/Header4';
import Input from '../../atoms/Input';
import Checkbox from '../../atoms/Checkbox';
import Radio from '../../atoms/Radio';

const TitleSection = ({text}) => {
    return (
        <SystemComponent>
            <Header4>
                {text}
            </Header4>
        </SystemComponent>
    )
}

const DescriptionSection = ({text}) => {
    return (
        <SystemComponent>
            <Header4>
                {text}
            </Header4>
        </SystemComponent>
    )
}

const FieldSection = ({title, description='', type="textbox"}) => {
    const theme = useContext(ThemeContext);

    const renderInputField = (type) => {
        switch (type) {
            case 'textbox':
                return (
                    <Input height={[
                        theme.textInputHeight.small, 
                        theme.textInputHeight.medium, 
                        theme.textInputHeight.large]} 
                        width="600px"
                    />
                )
            case 'checkbox':
                return (
                   <Checkbox></Checkbox>
                )
            default:
                return <></>;
        }
    }

    return (
        <SystemComponent
            fontSize={theme.fontSizes.header3}
            textAlign='center'
        >
            <SystemComponent textAlign='left' mb={["10px", "15px"]}>
                <TitleSection text={title} />
                <DescriptionSection text={description} />
            </SystemComponent>

            <SystemComponent>
                {renderInputField(type)}
            </SystemComponent>
        </SystemComponent>
    )
}
export default FieldSection;