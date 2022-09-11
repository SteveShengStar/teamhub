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

import { useFormAndUserDetails } from '../../frontend/hooks/forms';
import {validateField, clearErrorMessages, isInvalidPhoneNumber, isInvalidStudentId, getCustomFields, getCustomFieldDefaults} from '../../frontend/util'
import _ from 'lodash';

const FORM_NAME_KEY = 'register';

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
        clearErrorMessages(formErrors);

        validateField(formValues, formErrors, 'fullName');
        validateField(formValues, formErrors, 'phoneNumber');
        validateField(formValues, formErrors, 'personalEmail');
        validateField(formValues, formErrors, 'program');
        validateField(formValues, formErrors, 'studentId');
        validateField(formValues, formErrors, 'termStatus');
        validateField(formValues, formErrors, 'memberType');
        validateField(formValues, formErrors, 'subteams');
        validateField(formValues, formErrors, 'designCentreSafety');
        validateField(formValues, formErrors, 'whmis');
        validateField(formValues, formErrors, 'machineShop');
        
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
        clearErrorMessageIfExists(name, hasError, setHasError);

        // Prevent user from typing in non-numeric characters.
        if (name === "phoneNumber") {
            if (value && isInvalidPhoneNumber(value)) {
                return;
            }
        } else if (name === "studentId") {
            if (value && isInvalidStudentId(value)) {
                return
            };
        }

        setFormValues({...formValues, [name]: value});
    }

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
                                {
                                    formSections.map(s => 
                                        <FieldSection 
                                            key={s.name}
                                            type={s.type} 
                                            title={s.display}
                                            required={s.required}                     
                                            name={s.name}
                                            value={formValues[s.name]}
                                            onChange={
                                                ['text', 'longtext', 'phone', 'numbers', 'email'].includes(s.type) ?
                                                handleInputChange :
                                                handleFieldChange
                                            }
                                            hasError={hasError[s.name]}
                                            errorText={s.errorText}
                                            options={s.options}
                                        />
                                    )
                                }
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