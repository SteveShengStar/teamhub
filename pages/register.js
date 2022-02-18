import React, { useState, useContext, useEffect, useRef } from 'react';
import { isEmail } from "validator";
import { ThemeContext } from "styled-components";
import PageTemplate from '../frontend/components/templates/PageTemplate';
import { SystemComponent, SystemSpan } from '../frontend/components/atoms/SystemComponents';
import Subtitle from "../frontend/components/atoms/Subtitle";
import Card from '../frontend/components/atoms/Card';
import FieldSection from "../frontend/components/molecules/Form/FieldSection";
import SubmitButton from '../frontend/components/atoms/SubmitButton';

const TERMDESCRIPTIONS = [
    'Academic term, active on Waterloop in-person', 
    'Academic term, active on Waterloop remotely', 
    'Co-op term, working on Waterloop remotely', 
    'Co-op term, active on Waterloop in-person', 
    'Not active on Waterloop this term', 
    'Other',
];

const PREVTERMS = ['F21', 'S21', 'W21', 'F20', "S20",'W20',];

const FUTURETERMS = ['W22', 'S22', 'F22', 'W23', "S23",'F23',];

const MEMBERSHIP = [
    'Member', 
    'Exec/lead/advisor', 
    'Coop', 
    'Not active on Waterloop this term',
];

const FormHeader = ({title, marginBottom}) => {
    const theme = useContext(ThemeContext);
    return (
        <SystemComponent
            textAlign='center'
            mb={marginBottom}
        >
            <SystemSpan>
                <Subtitle fontSize={[theme.fontSizes.smallSubtitle, theme.fontSizes.subtitle]}>{title}</Subtitle>
            </SystemSpan>
        </SystemComponent>
    );
}

const FormFooter = ({handleSave}) => {
    return (
        <SystemComponent mt={5} textAlign='center'>
            <SubmitButton onClick={handleSave}>Submit</SubmitButton>
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
        studentId: null,  
        termDescription: "", 
        membership: "", 
        previousTerms: [], 
        futureTerms: [], 
        safetyReq: false,
        whmis: false, 
        machineShopOrientation: false,

    });

    const [hasError, setHasError] = useState({
        fullName: false,
        phoneNumber: false, 
        email: false, 
        program: false, 
        studentId: false,  
        termDescription: false, 
        membership: false, 
        previousTerms: false, 
        futureTerms: false, 
        safetyReq: false,
        whmis: false, 
        machineShopOrientation: false,
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
        if (!formValues.termDescription) {
            updatedErrorList['termDescription'] = true;
        }
        if (!formValues.membership) {
            updatedErrorList['membership'] = true;
        }
        if (formValues.safetyReq === null || formValues.safetyReq === undefined) {
            updatedErrorList['safetyReq'] = true;
        }
        if (formValues.whmis === null || formValues.whmis === undefined) {
            updatedErrorList['whmis'] = true;
        }
        if (formValues.machineShopOrientation === null || formValues.machineShopOrientation === undefined) {
            updatedErrorList['machineShopOrientation'] = true;
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

    const handleFieldChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    return (
        <PageTemplate>
            <SystemComponent>
                <Card
                    css={{
                        boxSizing: 'border-box'
                    }}
                    width={["98%", "500px", "700px", "768px"]}
                    margin={["cardMarginSmall", "auto"]}
                    padding={["cardPaddingSmall", "cardPadding", "cardPadding"]}
                >
                    <FormHeader
                        title="Tell us More About You"
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
                            errorText="Student ID must have 8 digits."   
                            /> 
                        <FieldSection 
                            title="Which describes you best?" 
                            type="radio" 
                            name="termDescription"
                            required={true} 
                            options={TERMDESCRIPTIONS}
                            onChange={handleFieldChange}
                            value={formValues.termDescription}
                            hasError={hasError['termDescription']}
                            errorText="Please select an option."
                            />
                        <FieldSection
                            title="Membership Type" 
                            name="membership"
                            type="radio" 
                            required={true}
                            options={MEMBERSHIP}
                            value={formValues.membership}
                            onChange={handleFieldChange}
                            hasError={hasError['membership']}
                            errorText="Please select an option."
                            />
                        <FieldSection 
                            title="Previous Terms" 
                            type="checkbox" 
                            name="previousTerms"
                            value={formValues['previousTerms']}
                            options={PREVTERMS}
                            onChange={handleFieldChange}
                            hasError={hasError['previousTerms']}
                            />
                        <FieldSection 
                            title="Future Terms" 
                            type="checkbox" 
                            name="futureTerms"
                            value={formValues['futureTerms']}
                            options={FUTURETERMS}
                            onChange={handleFieldChange}
                            hasError={hasError['futureTerms']}
                            />
                        <FieldSection 
                            title="Student Design Center Safety Requirements" 
                            name="safetyReq"
                            type="boolean" 
                            required={true}
                            onChange={handleFieldChange}
                            value={formValues.safetyReq}
                            hasError={hasError['safetyReq']}
                            errorText="Please select an option."
                            />
                        <FieldSection 
                            title="WHMIS 2015" 
                            name="whmis"
                            type="boolean" 
                            required={true}
                            onChange={handleFieldChange}
                            value={formValues.whmis}
                            hasError={hasError['whmis']}
                            errorText="Please select an option."
                            />
                        <FieldSection 
                            title="Machine Shop Orientation" 
                            name="machineShopOrientation"
                            type="boolean" 
                            required={true}
                            onChange={handleFieldChange}
                            value={formValues.machineShopOrientation}
                            hasError={hasError['machineShopOrientation']}
                            errorText="Please select an option."
                            />
                    </SystemComponent> 
                    <FormFooter handleSave={handleSave}/>
                </Card>
            </SystemComponent>
        </PageTemplate>
    );
};

export default RegistrationForm;