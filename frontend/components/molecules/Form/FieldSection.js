import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from 'styled-components';

import { SystemComponent } from '../../atoms/SystemComponents';
import Header4 from '../../atoms/Header4';
import Input from '../../atoms/Input';

const TitleSection = ({text, asterik}) => {
    return (
        <SystemComponent>
            <Header4>
                {text}
                {asterik && <span style={{color: 'red'}}>*</span>}
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

const FieldSection = ({title, description='', type="textbox", asterik, onChange, name, value}) => {
    const theme = useContext(ThemeContext);

    const renderInputField = (type) => {


        // const handleChange = ({target}) => {
        //     e.preventDefault()
        //     setFormValue(target.value)
        // }
        switch (type) {
            case 'textbox':
                return (
                    <Input height={[
                        theme.textInputHeight.small, 
                        theme.textInputHeight.medium, 
                        theme.textInputHeight.large]} 
                        width="600px"
                        name={name}
                        value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                    />
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
                <TitleSection text={title} asterik={asterik} />
                <DescriptionSection text={description} />
            </SystemComponent>

            <SystemComponent>
                {renderInputField(type)}
            </SystemComponent>
        </SystemComponent>
    )
}
export default FieldSection;