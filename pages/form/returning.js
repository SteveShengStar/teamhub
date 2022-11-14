import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ThemeContext } from 'styled-components';
import PageTemplate from '../../frontend/components/templates/PageTemplate';
import { SystemComponent } from '../../frontend/components/atoms/SystemComponents';
import Card from '../../frontend/components/atoms/Card';
import FieldSection from '../../frontend/components/molecules/Form/FieldSection';
import FormHeader from '../../frontend/components/molecules/Form/FormHeader';
import FormFooter from '../../frontend/components/molecules/Form/FormFooter';
import useLoadingScreen from '../../frontend/hooks/useLoadingScreen';
import usePopupBanner from '../../frontend/hooks/usePopupBanner';
import { useFormAndUserDetails } from '../../frontend/hooks/forms';
import {
    validateField,
    clearErrorMessages,
    isInvalidPhoneNumber,
    isInvalidStudentId,
    getCustomFields,
    getCustomFieldDefaults,
    clearErrorMessageIfExists,
    scrollToFirstError,
} from '../../frontend/util';
import { updateUser } from '../../frontend/store/reducers/userReducer';
import _ from 'lodash';

const FORM_NAME_KEY = 'returning';
const SUBMIT_SUCCESS_MSG =
    'Form successfully submitted. Taking you back to Home Page in 5 seconds.';
const SUBMIT_ERROR_MSG =
    'Error occurred. Please contact Waterloop Web Team for assistance.';

const ReturningMembersForm = () => {
    const theme = useContext(ThemeContext);

    const dispatch = useDispatch();
    const router = useRouter();
    const { user, hydrated } = useSelector((state) => state.userState);
    const [loader, showLoader, hideLoader] = useLoadingScreen(true);

    const [formValues, setFormValues] = useState({
        nextSchoolTerm: '',
        previousTerms: [],
        futureTerms: [],
        subteams: '',
        nextTermActivity: '',
        nextTermRole: '',
        termComments: '',
        desiredWork: '',
    });

    const [hasError, setHasError] = useState({
        nextSchoolTerm: false,
        nextTermActivity: false,
        subteams: false,
        nextTermRole: false,
    });

    const [formSections, setFormSections] = useState([]);
    const {
        renderSuccessBanner,
        renderErrorBanner,
        showSuccessBanner,
        showErrorBanner,
    } = usePopupBanner(SUBMIT_SUCCESS_MSG, SUBMIT_ERROR_MSG);

    useEffect(() => {
        if (hydrated) {
            showLoader();
            useFormAndUserDetails(FORM_NAME_KEY, dispatch, router, user._id)
                .then((res) => {
                    if (res.success) {
                        const sections = res.body.form.sections
                            .map((s) => {
                                let newObj = {
                                    ...s,
                                    ..._.omit(s.section, ['_id']),
                                };
                                delete newObj._id;
                                delete newObj.section;
                                return newObj;
                            })
                            .sort((a, b) => a.position - b.position);

                        const memberData = res.body.user;
                        setFormSections(sections);
                        setFormValues({
                            ...getCustomFieldDefaults(sections),
                            ...formValues,
                        });
                    }
                })
                .catch((e) => {
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

        validateField(formValues, formErrors, 'nextSchoolTerm');
        validateField(formValues, formErrors, 'subteams');
        validateField(formValues, formErrors, 'nextTermRole');
        validateField(formValues, formErrors, 'nextTermActivity');

        setHasError(formErrors);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formErrors = { ...hasError };

        setErrorMessages(formErrors);

        const formHasErrors = Object.values(formErrors).some((err) => err);
        if (!formHasErrors) {
            showLoader();
            const {
                nextSchoolTerm,
                previousTerms,
                futureTerms,
                subteams,
                nextTermActivity,
                nextTermRole,
                termComments,
                desiredWork,
            } = formValues;
            const customFields = getCustomFields(formValues);

            updateUser(
                dispatch,
                {
                    ...customFields,
                    subteams: [subteams], // NOTE: As of March 2022, members can only select one option for subteam. Before this, members can select multiple subteams. We will keep subteams as an array for now for backwards-compatability and to prevent conflicts with Database data.
                    activeSchoolTerms: [...previousTerms, ...futureTerms],
                    nextSchoolTerm,
                    nextTermActivity,
                    nextTermRole,
                    termComments: termComments?.trim(),
                    desiredWork: desiredWork?.trim(),
                },
                user._id,
                router
            )
                .then(() => {
                    showSuccessBanner(() => router.push('/')); // Redirect to home page.
                    // TODO: redirect somewhere here, maybe also issue a get request to "refresh"
                })
                .catch((e) => {
                    console.error(e);
                    showErrorBanner();
                })
                .finally(() => {
                    hideLoader();
                });
        } else {
            scrollToFirstError(formSections, formErrors);
        }
    };

    const handleInputChange = (name, value) => {
        clearErrorMessageIfExists(name, hasError, setHasError);

        if (name === 'phoneNumber') {
            if (value && isInvalidPhoneNumber(value)) {
                return;
            }
        } else if (name === 'studentId') {
            if (value && isInvalidStudentId(value)) {
                return;
            }
        }
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFieldChange = (name, value) => {
        clearErrorMessageIfExists(name, hasError, setHasError);
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <PageTemplate>
            <SystemComponent>
                {renderSuccessBanner()}
                {renderErrorBanner()}
                <Card
                    width={['100%', '768px']}
                    margin={['cardMarginSmall', 'auto']}
                    padding={[
                        'cardPaddingSmall',
                        'cardPaddingSmall',
                        'cardPadding',
                    ]}
                >
                    <FormHeader
                        title='Tell us more About You'
                        marginBottom={theme.space.titleBottomMargin}
                    />
                    <SystemComponent
                        display='grid'
                        gridTemplateColumns='1fr'
                        gridAutoRows='autofill'
                        gridAutoFlow='row'
                        gridGap={['cardPadding', 'cardMargin', 'cardMargin']}
                        justifyItems='start'
                        overflowY='auto'
                    >
                        {formSections.map((s) => (
                            <FieldSection
                                key={s.name}
                                type={s.type}
                                title={s.display}
                                required={s.required}
                                name={s.name}
                                value={formValues[s.name]}
                                onChange={
                                    [
                                        'text',
                                        'longtext',
                                        'phone',
                                        'numbers',
                                        'email',
                                    ].includes(s.type)
                                        ? handleInputChange
                                        : handleFieldChange
                                }
                                hasError={hasError[s.name]}
                                errorText={s.errorText}
                                options={s.options}
                            />
                        ))}
                    </SystemComponent>
                    <FormFooter
                        handleSubmit={handleSubmit}
                        submitDisabled={!hydrated}
                    />
                </Card>
                {loader}
            </SystemComponent>
        </PageTemplate>
    );
};

export default ReturningMembersForm;
