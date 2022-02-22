import React, { useState, useContext, useEffect, useRef } from 'react';
import { isEmail } from "validator";
import { ThemeContext } from "styled-components";
import PageTemplate from '../frontend/components/templates/PageTemplate';
import { SystemComponent, SystemSpan } from '../frontend/components/atoms/SystemComponents';
import Subtitle from "../frontend/components/atoms/Subtitle";
import Card from '../frontend/components/atoms/Card';
import FieldSection from "../frontend/components/molecules/Form/FieldSection";
import Button from '../frontend/components/atoms/Button';

const TERMDESCRIPTIONS = [
"1A Co-op", 
"1B Study", 
"1B Co-op", 
"2A Study", 
"2A Co-op", 
"2B Study", 
'2B Co-op',
"3A Study", 
"3A Co-op",
"3B Study", 
"3B Co-op", 
"4A Study",
"4A Co-op", 
"4B Study", 
"4B Co-op", 
"Graduate Student", 
"Not currently enrolled at the University of Waterloo", 
"Alumni",
];

const PREVTERMS = ['F22', 'S22', 'W22','F21', 'S21', 'W21', 'F20', "S20",'W20', 'F19', 'S19', 'W19', 'F18', 'S18', 'W18'];

const FUTURETERMS = ['W22', 'S22', 'F22', 'W23', "S23",'F23', 'None of the above'];

const SUBTEAMS = ["Business", "LIM", "Mechanical", "MC", "BMS", "Embedded","Infrastructure", "Web", "Team Hub"]

const ACTIVESTATUS = [
    "Yes, I will continue on the team, and I will be on campus (or working locally)", 
    "Yes, I will continue on the team remotely and can come to campus if needed/possible", 
    "Yes, I will continue on the team remotely only",
    "Undecided or unsure", 
    "No, taking the term off" 
]

const MEMBERSHIP = [
    'Member', 
    'Exec/lead/advisor', 
    'Coop', 
    'Not active on Waterloop this term',
];

const CONTINUINGSTATUS = [
    'Continue with my sub-team', 
    'Transfer to another sub-team (please specify)', 
    'Want to take on a leadership role - lead', 
    'Want to take on a leadership role - co-op supervisor', 
    'Want to become a co-op', 
    'I\'m undecided or not continuing',
]

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
        termDescription: "", 
        previousTerms: [], 
        futureTerms: [], 
        subteam: "",
        activeStatus: "", 
        continuingStatus: "", 
        email: "", 
        comments: "",
        futureTasks: "", 
    });

    const [hasError, setHasError] = useState({
        fullName: false,
        termDescription: false, 
        membership: false, 
        previousTerms: false, 
        futureTerms: false,
        activeStatus: false, 
        subteam: false,
        activeStatus: false,
        continuingStatus: false,
        email: false, 
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
        if (!formValues.email || !isEmail(formValues.email)) {
            updatedErrorList['email'] = true;
        }
        if (!formValues.termDescription) {
            updatedErrorList['termDescription'] = true;
        }
        if (!formValues.subteam) {
            updatedErrorList['subteam'] = true;
        }
        if (!formValues.continuingStatus) {
            updatedErrorList['continuingStatus'] = true;
        }
        if (!formValues.activeStatus) {
            updatedErrorList['activeStatus'] = true;
        }
        if (!formValues.futureTerms) {
            updatedErrorList['futureTerms'] = true;
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
                            value={formValues['fullName']}
                            onChange={handleInputChange}
                            hasError={hasError['fullName']}
                            errorText="Please enter your full name."
                            />
                        <FieldSection 
                            title="This upcoming term, I will be on my" 
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
                            title="Previous Terms" 
                            type="checkbox" 
                            name="previousTerms"
                            value={formValues['previousTerms']}
                            options={PREVTERMS}
                            onChange={handleFieldChange}
                            hasError={hasError['previousTerms']}
                            />
                        <FieldSection 
                            title="I will be in Waterloo during" 
                            type="checkbox" 
                            name="futureTerms"
                            value={formValues['futureTerms']}
                            options={FUTURETERMS}
                            onChange={handleFieldChange}
                            hasError={hasError['futureTerms']}
                            />
                        <FieldSection
                            title="Your subteam" 
                            name="subteam"
                            type="radio" 
                            required={true}
                            options={SUBTEAMS}
                            value={formValues.subteam}
                            onChange={handleFieldChange}
                            hasError={hasError['subteam']}
                            errorText="Please select an option."
                            />
                        <FieldSection
                            title="Will you be active on the team this upcoming term?" 
                            name="activeStatus"
                            type="radio" 
                            required={true}
                            options={ACTIVESTATUS}
                            value={formValues.activeStatus}
                            onChange={handleFieldChange}
                            hasError={hasError['activeStatus']}
                            errorText="Please select an option."
                            />
                        <FieldSection
                            title="If you're continuing, what are you planning to do?" 
                            name="continuingStatus"
                            type="radio" 
                            required={true}
                            options={CONTINUINGSTATUS}
                            value={formValues.continuingStatus}
                            onChange={handleFieldChange}
                            hasError={hasError['continuingStatus']}
                            errorText="Please select an option."
                            />
                        <FieldSection 
                            title='Please provide your personal email address'                             
                            name="email"
                            required={true}
                            value={formValues['email']}
                            onChange={handleInputChange}
                            hasError={hasError['email']}
                            errorText="Please enter a valid email."
                            />
                        <FieldSection 
                            title='Any additional comments or thoughts on the term?'
                            name="comments"
                            value={formValues['comments']}
                            onChange={handleInputChange}
                            />
                        <FieldSection 
                            title='Is there anything specific you want to work on next term?'
                            name="futureTasks"
                            value={formValues['futureTasks']}
                            onChange={handleInputChange}
                            />
                        <SystemComponent><Button onClick={handleSave}>Submit</Button></SystemComponent>
                    </SystemComponent> 
                </Card>
            </SystemComponent>
        </PageTemplate>
    );
};

export default RegistrationForm;