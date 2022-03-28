import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { ThemeContext } from "styled-components";

import useLoginTransition from "../../frontend/hooks/useLoginTransition";
import useLoginController from "../../frontend/hooks/useLoginController";
import { updateUser } from "../../frontend/store/reducers/userReducer";
import useLoadingScreen from '../../frontend/hooks/useLoadingScreen';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import { SystemComponent, SystemSpan } from '../../frontend/components/atoms/SystemComponents';
import Card from '../../frontend/components/atoms/Card';
import FieldSection from "../../frontend/components/molecules/Form/FieldSection";
import FormHeader from '../../frontend/components/molecules/Form/FormHeader';
import FormFooter from '../../frontend/components/molecules/Form/FormFooter';
import LoginTransition from "../../frontend/components/templates/LoginTransition";
import LoadingModal from '../../frontend/components/atoms/LoadingModal';

import {validateField, clearErrorMessages, onInputChange} from '../../frontend/form/util'

const TERM_STATUSES = [
    'Academic term, active on Waterloop in-person', 
    'Academic term, active on Waterloop remotely', 
    'Co-op term, working on Waterloop remotely', 
    'Co-op term, active on Waterloop in-person', 
];

const PREV_TERMS = ['F21', 'S21', 'W21', 'F20', "S20",'W20'];

const FUTURE_TERMS = ['W22', 'S22', 'F22', 'W23', "S23",'F23'];

const MEMBER_TYPES = [
    'Member', 
    'Exec/lead/advisor', 
    'Coop', 
];

const SUBTEAMS = [
    "Software",
    "Electrical",
    "Mechanical",
    "Admin",
    "Infrastructure",
    "Exec",
    "Web",
    "Business"
];

const RegistrationForm = () => {
    const theme = useContext(ThemeContext);

    const dispatch = useDispatch();
    const router = useRouter();
    const [loader, showLoader, hideLoader] = useLoadingScreen(true);
    const { user, hydrated } = useSelector(state => state.userState);
    const loginTransition = useLoginTransition();
    useLoginController(loginTransition, dispatch, router.pathname);

    const [formValues, setFormValues] = useState({
        fullName: "",
        phoneNumber: "", 
        personalEmail: "", 
        program: "", 
        studentId: "",  
        termStatus: "", 
        memberType: "", 
        subteams: "",
        previousTerms: [], 
        futureTerms: [], 
        designCentreSafety: false,
        whmis: false, 
        machineShop: false,
    });

    const [hasError, setHasError] = useState({
        fullName: false,
        phoneNumber: false, 
        personalEmail: false, 
        program: false, 
        studentId: false,  
        termStatus: false, 
        memberType: false, 
        subteams: false,
        designCentreSafety: false,
        whmis: false, 
        machineShop: false,
    });

    const [formSections, setFormSections] = useState([]); // TODO: should not be state, this should be read-only

    useEffect(() => {
        if (hydrated) {
            useFormAndUserDetails(FORM_NAME_KEY, dispatch, router, user._id)
                .then(res => {
                    if (res.success) {
                        const sections = res.body.form.sections.map(s => {
                            let newObj = {
                                ...s,
                                ..._.omit(s.section, ['_id'])
                            }
                            delete newObj._id;
                            delete newObj.section;
                            return newObj;
                        }).sort(
                            (a, b) => a.position - b.position
                        );
                        setFormSections(sections);
                        
                        setFormValues({
                            ...formValues,
                            ...getCustomFieldDefaults(sections)
                        });
                    }
                    // TODO: handle error case
                })
                .catch(e => {
                    console.error(e);
                    throw e;
                })
                .finally(() => {
                    hideLoader();
                });
        }
    }, [hydrated]);

    const setErrorMessages = (formErrors) => {
        Object.keys(formErrors).forEach(key => {
            validateField(formValues, formErrors, key);
        });
        setHasError(formErrors);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formErrors = {...hasError};
        setErrorMessages(formErrors);
        const formHasErrors = Object.values(formErrors).some(err => err);

        if (!formHasErrors) {
            showLoader();
            loginTransition.setVisible(false);

            const {fullName, phoneNumber, personalEmail, program, studentId, termStatus, memberType, 
                subteams, designCentreSafety, whmis, machineShop, previousTerms, futureTerms} = formValues;
            const customFields = getCustomFields(formValues);

            const fullNameParts = fullName.split(/\s+/);
            updateUser(dispatch, {
                ...customFields,
                name: {
                    first: fullNameParts[0].trim(),
                    last: fullNameParts[fullNameParts.length - 1].trim()
                },
                phone: phoneNumber.trim(),
                program: program.trim(),
                personalEmail: personalEmail.trim(),
                studentId: studentId.trim(),
                activeSchoolTerms: [...previousTerms, ...futureTerms],
                termStatus,
                memberType,
                subteams: [subteams], // NOTE: As of March 2022, members can only select one option for subteam. Before this, members can select multiple subteams. We will keep subteams as an array for now for backwards-compatability and to prevent conflicts with Database data.
                designCentreSafety,
                whmis,
                machineShop,
            }, user._id, router).then(res => {
                router.push("/")
            }).finally(() => {
                hideLoader();
            });
        } else {
            scrollToFirstError(formErrors);
        }
    }

    const handleInputChange = (name, value) => {
        onInputChange(formValues, setFormValues, name, value);
    };

    const handleFieldChange = (name, value) => {
        setFormValues({...formValues, [name]: value});
    }

    return (
        <>
            <PageTemplate>
                <LoginTransition transitionRef={loginTransition.ref}>
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
                                    value={formValues['fullName']}
                                    onChange={handleInputChange}
                                    hasError={hasError['fullName']}
                                    errorText="Please enter your full name."
                                    placeholder="First Name and Last Name"
                                    />
                                <FieldSection 
                                    title='Phone Number'      
                                    name="phoneNumber"
                                    required={true}
                                    value={formValues['phoneNumber']} 
                                    onChange={handleInputChange}
                                    hasError={hasError['phoneNumber']}
                                    errorText="Please enter a valid 10 digit phone number."
                                    placeholder="Phone Number"
                                    />
                                <FieldSection 
                                    title='Personal Email Address'                             
                                    name="email"
                                    required={true}
                                    value={formValues['email']}
                                    onChange={handleInputChange}
                                    hasError={hasError['email']}
                                    errorText="Please enter a valid email."
                                    placeholder="Email Address"
                                    />
                                <FieldSection 
                                    title='Program'
                                    required={true}                     
                                    name="program"
                                    value={formValues['program']}
                                    onChange={handleInputChange}
                                    hasError={hasError['program']} 
                                    errorText="Please enter your program."
                                    description="Format:   2A CS,  1B AFM"
                                    placeholder="Term and Program of Study"      
                                    />
                                <FieldSection 
                                    title='Waterloo Student ID' 
                                    required={true}
                                    name="studentId"
                                    value={formValues['studentId']}
                                    onChange={handleInputChange}
                                    hasError={hasError['studentId']} 
                                    errorText="Student ID must have 8 digits."  
                                    placeholder="8-digit Student No." 
                                    /> 
                                <FieldSection 
                                    title="Which describes you best?" 
                                    type="radio" 
                                    name="termStatus"
                                    required={true} 
                                    options={TERM_STATUSES}
                                    onChange={handleFieldChange}
                                    value={formValues.termStatus}
                                    hasError={hasError['termStatus']}
                                    errorText="Please select an option above."
                                    />
                                <FieldSection 
                                    title="Subteam" 
                                    type="radio" 
                                    name="subteam"
                                    required={true}
                                    options={SUBTEAMS}
                                    onChange={handleFieldChange}
                                    value={formValues.subteam}
                                    hasError={hasError['subteam']}
                                    errorText="Please select an option above."
                                    />
                                <FieldSection
                                    title="Membership Type" 
                                    name="memberType"
                                    type="radio" 
                                    required={true}
                                    options={MEMBER_TYPES}
                                    value={formValues.memberType}
                                    onChange={handleFieldChange}
                                    hasError={hasError['memberType']}
                                    errorText="Please select an option above."
                                    />
                                <FieldSection 
                                    title="Previous Terms" 
                                    type="checkbox" 
                                    name="previousTerms"
                                    value={formValues['previousTerms']}
                                    options={PREV_TERMS}
                                    onChange={handleFieldChange}
                                    />
                                <FieldSection 
                                    title="Future Terms" 
                                    type="checkbox" 
                                    name="futureTerms"
                                    value={formValues['futureTerms']}
                                    options={FUTURE_TERMS}
                                    onChange={handleFieldChange}
                                    />
                                <FieldSection 
                                    title="Student Design Center Safety Requirements" 
                                    name="designCentreSafety"
                                    type="boolean" 
                                    required={true}
                                    onChange={handleFieldChange}
                                    value={formValues.designCentreSafety}
                                    hasError={hasError['designCentreSafety']}
                                    errorText="Please select an option above."
                                    />
                                <FieldSection 
                                    title="WHMIS 2015" 
                                    name="whmis"
                                    type="boolean" 
                                    required={true}
                                    onChange={handleFieldChange}
                                    value={formValues.whmis}
                                    hasError={hasError['whmis']}
                                    errorText="Please select an option above."
                                    />
                                <FieldSection 
                                    title="Machine Shop Orientation" 
                                    name="machineShop"
                                    type="boolean" 
                                    required={true}
                                    onChange={handleFieldChange}
                                    value={formValues.machineShop}
                                    hasError={hasError['machineShop']}
                                    errorText="Please select an option above."
                                    />
                            </SystemComponent> 
                            <FormFooter handleSubmit={handleSubmit} submitDisabled={!hydrated}/>
                        </Card>
                        {loader}
                    </SystemComponent>
                </LoginTransition>
            </PageTemplate>
            <LoadingModal visible={!loginTransition.visible}/>
        </>
    );
};

export default RegistrationForm;