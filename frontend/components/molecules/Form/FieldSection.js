import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from 'styled-components';
import { SystemComponent } from '../../atoms/SystemComponents';
import Header4 from '../../atoms/Header4';
import Input from '../../atoms/Input';
import RadioSection from '../../molecules/Form/RadioSection';
import BooleanRadioSection from '../../molecules/Form/BooleanRadioSection';
import CheckboxSection from '../../molecules/Form/CheckboxSection';


const TitleSection = ({text, required}) => {
    return (
        <SystemComponent>
            <Header4>
                {text}
                {required && <span style={{color: 'red'}}> * </span>}
            </Header4>
        </SystemComponent>
    )
} 

const DescriptionSection = ({text}) => { // TODO: incorporate form-section descriptions later.
    return (
        <SystemComponent>
            <Header4>
                {text}
            </Header4>
        </SystemComponent>
    )
}

const FieldSection = ({title, description='', type="textbox", required, onChange, name, value, hasError=false, errorText, options=[] }) => {
    const theme = useContext(ThemeContext);
    const renderInputField = (type) => {

        switch (type) {
            case 'textbox':
                return (
                    <Input height={[
                        theme.textInputHeight.small, 
                        theme.textInputHeight.medium, 
                        theme.textInputHeight.large]} 
                        width={"600px"}
                        name={name}
                        value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                    />
                )
            case 'checkbox':
                return (
                   <CheckboxSection 
                        options={options} 
                        name={name} 
                        selectedOptions={value}  
                        setSelectedOptions={onChange}/>
                )
            case 'radio':
                return (
                    <RadioSection options={options}
                        selectedOption={value}
                        name={name}
                        setSelectedOption={onChange}
                    />
                )
            case 'boolean':
                return (
                    <BooleanRadioSection
                        selectedOption={value}
                        name={name}
                        setSelectedOption={onChange}
                    />
                )
            default:
                return <></>;
        }
    }

    return (
        <SystemComponent
            fontSize={theme.fontSizes.header3}
            id={name}
            textAlign='left'
            width={["98%", "100%", "100%", "600px"]}
        >
            <SystemComponent textAlign='left' mb={["10px", "15px"]}>
                <TitleSection text={title} required={required} />
            </SystemComponent>

            <SystemComponent>
                {renderInputField(type)}
            </SystemComponent>
            {hasError && <SystemComponent textAlign="left" color="red">{errorText}</SystemComponent>}
        </SystemComponent>
    )
}
export default FieldSection;