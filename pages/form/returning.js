import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { ThemeContext } from 'styled-components';
import PageTemplate from '../../frontend/components/templates/PageTemplate';
import {
  SystemComponent
} from '../../frontend/components/atoms/SystemComponents';
import Card from '../../frontend/components/atoms/Card';
import FieldSection from '../../frontend/components/molecules/Form/FieldSection';
import FormHeader from '../../frontend/components/molecules/Form/FormHeader';
import FormFooter from '../../frontend/components/molecules/Form/FormFooter';
import useLoadingScreen from '../../frontend/hooks/useLoadingScreen';
import { useFormAndUserDetails } from '../../frontend/hooks/forms';
import {validateField, clearErrorMessages, isInvalidPhoneNumber, isInvalidStudentId, getCustomFields, getCustomFieldDefaults} from '../../frontend/util'
import { updateUser } from "../../frontend/store/reducers/userReducer";
import _ from 'lodash';

const FORM_NAME_KEY = 'returning';

const ReturningMembersForm = () => {
  const theme = useContext(ThemeContext);

  const dispatch = useDispatch();
  const router = useRouter();
  const { user, hydrated } = useSelector(state => state.userState);
  const [loader, showLoader, hideLoader] = useLoadingScreen(true);

  const [formValues, setFormValues] = useState({
    fullName: '',
    nextSchoolTerm: '',
    previousTerms: [],
    futureTerms: [],
    subteams: '',
    nextTermActivity: '',
    nextTermRole: '',
    personalEmail: '',
    termComments: '',
    desiredWork: '',
  });

  const [hasError, setHasError] = useState({
    fullName: false,
    nextSchoolTerm: false,
    nextTermActivity: false,
    subteams: false,
    nextTermRole: false,
    personalEmail: false,
  });

  const [formSections, setFormSections] = useState([]);

  useEffect(() => {
    if (hydrated) {
        showLoader();
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
                    let memberData = res.body.user;
                    if (memberData.miscDetails) {
                        memberData = {
                            ...memberData,
                            ..._.omit(memberData.miscDetails, '_id')
                        }
                        delete memberData.miscDetails;
                    }

                    setFormSections(sections);
                    setFormValues({
                      ...getCustomFieldDefaults(sections),
                      ...memberData,
                      fullName: (memberData.name.first ?? '') + ' ' + (memberData.name.last ?? ''),
                      subteams: memberData.subteams && memberData.subteams.length > 0 ? memberData.subteams[0].name : '',
                      previousTerms: [],
                      futureTerms: []
                  });
                }
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
    validateField(formValues, formErrors, 'fullName');
    validateField(formValues, formErrors, 'personalEmail');
    validateField(formValues, formErrors, 'nextSchoolTerm');
    validateField(formValues, formErrors, 'subteams');
    validateField(formValues, formErrors, 'nextTermRole');
    validateField(formValues, formErrors, 'nextTermActivity');

    setHasError(formErrors);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formErrors = { ...hasError };

    clearErrorMessages(formErrors);
    setErrorMessages(formErrors);

    const formHasErrors = Object.values(formErrors).some(err => err);
    if (!formHasErrors) {
      showLoader();
      const {fullName, nextSchoolTerm, previousTerms, futureTerms, subteams, nextTermActivity,
              nextTermRole, personalEmail, termComments, desiredWork} = formValues;
      const customFields = getCustomFields(formValues);

      const fullNameParts = fullName.split(/\s+/);
      updateUser(dispatch, {
          ...customFields,
          name: {
              first: fullNameParts[0].trim(),
              last: fullNameParts[fullNameParts.length - 1].trim(),
              display: fullName
          },
          personalEmail: personalEmail.trim(),
          subteams: [subteams], // NOTE: As of March 2022, members can only select one option for subteam. Before this, members can select multiple subteams. We will keep subteams as an array for now for backwards-compatability and to prevent conflicts with Database data.
          activeSchoolTerms: [...previousTerms, ...futureTerms],
          nextSchoolTerm,
          nextTermActivity,
          nextTermRole,
          termComments: termComments?.trim(),
          desiredWork: desiredWork?.trim(),
      }, user._id, router)
        .then(res => {
            console.log("User Info Update Completed.");
            // TODO: redirect somewhere here, maybe also issue a get request to "refresh"
        }).finally(() => {        
            hideLoader();
        });
    }
  };

  const handleInputChange = (name, value) => {
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
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <PageTemplate>
      <SystemComponent>
        <Card
          width={['100%', '768px']}
          margin={['cardMarginSmall', 'auto']}
          padding={['cardPaddingSmall', 'cardPaddingSmall', 'cardPadding']}
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
            gridGap={['cardPadding', 'cardMargin', 'cardMargin']}
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
    </PageTemplate>
  );
};

export default ReturningMembersForm;
