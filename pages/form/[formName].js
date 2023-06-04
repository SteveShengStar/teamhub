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
    validateFields,
    initHasErrorsToFalse,
    isInvalidPhoneNumber,
    isInvalidStudentId,
    getFieldDefaultValues,
    clearErrorMessageIfExists,
    scrollToFirstError,
    formatFormValues,
} from '../../frontend/util';
import { updateUser } from '../../frontend/store/reducers/userReducer';
import _ from 'lodash';

const SUBMIT_SUCCESS_MSG = 'Form successfully completed.';
const SUBMIT_ERROR_MSG =
    'Error occurred. Please contact Waterloop Web Team for assistance.';

const Form = () => {
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, hydrated } = useSelector((state) => state.userState);
    const [loader, showLoader, hideLoader] = useLoadingScreen(true);
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formValues, setFormValues] = useState({});
    const [hasError, setHasError] = useState({});
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
            useFormAndUserDetails(
                router.query.formName,
                dispatch,
                router,
                user._id
            )
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

                        setFormTitle(res.body.form.title);
                        setFormDescription(res.body.form.description);
                        setFormSections(sections);
                        setFormValues(getFieldDefaultValues(sections));
                        setHasError(initHasErrorsToFalse(sections));
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

    const setErrorMessages = () => {
        const sectionMetadataByName = {};
        formSections.map((section) => {
            sectionMetadataByName[section.name] = {
                type: section.type,
                required: section.required,
                name: section.name,
            };
        });
        const hasValidationPassed = validateFields(
            formValues,
            sectionMetadataByName
        );
        const formErrorsList = {};
        Object.keys(hasValidationPassed).map((key) => {
            formErrorsList[key] = !hasValidationPassed[key];
        });
        setHasError(formErrorsList);
        return formErrorsList;
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formErrorsList = setErrorMessages();
        const formHasErrors = Object.values(formErrorsList).some((err) => err);

        if (!formHasErrors) {
            showLoader();
            updateUser(dispatch, formatFormValues(formValues), user._id, router)
                .then(() => {
                    showSuccessBanner(() => router.push('/form/admin/')); // Redirect to form page.
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
            scrollToFirstError(formSections, formErrorsList);
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
                        title={formTitle}
                        description={formDescription}
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

export default Form;
