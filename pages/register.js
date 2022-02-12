import React, { useState, useContext, useEffect, useRef } from 'react';
import { isEmail } from "validator";
import { ThemeContext } from "styled-components";
import PageTemplate from '../frontend/components/templates/PageTemplate';
import { SystemComponent, SystemSpan } from '../frontend/components/atoms/SystemComponents';
import Subtitle from "../frontend/components/atoms/Subtitle";
import Card from '../frontend/components/atoms/Card';
import FieldSection from "../frontend/components/molecules/Form/FieldSection";
import Button from '../frontend/components/atoms/Button';
const FormHeader = ({title, marginBottom}) => {
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
}

const RegistrationForm = () => {
    const theme = useContext(ThemeContext);

    const [formValues, setFormValues] = useState({
        fullName:  "",
        phoneNumber: null, 
        email: "", 
        program: "", 
        studentId:null,  
    });

    const [hasError, setHasError] = useState({
        fullName: false,
        phoneNumber: false,
        email: false, 
        program: false, 
        studentId: false
    });

    const handleSave = () => {
        console.log('clicked button')
        console.log(formValues)
        const updatedErrorList = {...hasError};

        for (const [name, value] of Object.entries(updatedErrorList)) {
            updatedErrorList[name] = false;
        }

        if (!formValues.fullName || formValues.fullName.split(' ').length !== 2) {
            updatedErrorList['fullName'] = true;
        }
        if (!formValues.phoneNumber || formValues.phoneNumber.length !== 10) {
            updatedErrorList['phoneNumber'] = true;
        }
        if (!formValues.email || !isEmail(formValues.email)) {
            updatedErrorList['email'] = true;
        }
        if (!formValues.program) {
            updatedErrorList['program'] = true;
        }
        if (!formValues.studentId || formValues.studentId.length !== 8) {
            updatedErrorList['studentId'] = true;
        }

        setHasError(updatedErrorList);

        if (Object.values(updatedErrorList).some(hasError => hasError === true)) {
            return;
        }
        // call onSubmit API route here
    }

    const handleInputChange = (name, value) => {
        
        if (name === "phoneNumber") {
            if (value && (!value.match(/^[0-9]*$/) || value.length > 10)) return;
        } else if (name === "studentId") {
            if (value && (!value.match(/^[0-9]*$/) || value.length > 8)) {
                return
            };
        }
        setFormValues({...formValues, [name]: value});
    }

    return (
        <PageTemplate>
            <SystemComponent>
                <Card
                    width={["100%", "768px"]}
                    margin={["cardMarginSmall", "auto"]}
                    padding={["cardPaddingSmall", "cardPaddingSmall", "cardPadding"]}
                >
                    <FormHeader
                        title="Tell us more About You"
                        marginBottom={theme.space.titleBottomMargin}
                    />
                    <SystemComponent
                        display="grid"
                        gridTemplateColumns="1fr"
                        gridAutoRows="autofill"
                        gridAutoFlow="row"
                        gridGap={["cardPadding", "cardMargin", "cardMargin"]}
                        justifyItems="start"
                        overflowY="auto"
                    >
                        <FieldSection 
                            title='Full Name'
                            required={true}                     
                            name="fullName"
                            required={true}
                            value={formValues['fullName']}
                            onChange={handleInputChange}
                            hasError={hasError['fullName']}
                            errorText="Please enter your full name."
                            />
                        <FieldSection 
                            title='Phone Number'      
                            name="phoneNumber"
                            required={true}
                            value={formValues['phoneNumber']} 
                            onChange={handleInputChange}
                            hasError={hasError['phoneNumber']}
                            errorText="Please enter a valid 10 digit phone number."
                            />
                        <FieldSection 
                            title='Personal Email Address'                             
                            name="email"
                            required={true}
                            value={formValues['email']}
                            onChange={handleInputChange}
                            hasError={hasError['email']}
                            errorText="Please enter a valid email."
                            />
                        <FieldSection 
                            title='Program'
                            required={true}                     
                            name="program"
                            value={formValues['program']}
                            onChange={handleInputChange}
                            hasError={hasError['program']} 
                            errorText="Please enter your program."       
                            />
                        <FieldSection 
                            title='Student ID #' 
                            required={true}
                            name="studentId"
                            value={formValues['studentId']}
                            onChange={handleInputChange}
                            hasError={hasError['studentId']} 
                            errorText="Student ID must be an 8 digit number."   
                            /> 
                            <FieldSection title='First Name' />
                            <FieldSection title="Checkbox" type="checkbox" />
                            <FieldSection title="Radio Button" type="radio" />
                        <SystemComponent><Button onClick={handleSave}>Submit</Button></SystemComponent>
                    </SystemComponent> 
                </Card>
            </SystemComponent>
        </PageTemplate>
    );
};

export default RegistrationForm;