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
import {validateField, clearErrorMessages, isInvalidPhoneNumber, isInvalidStudentId} from '../../frontend/util'
import { updateUser } from "../../frontend/store/reducers/userReducer";
import _ from 'lodash';

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
    subteam: '',
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
    subteam: false,
    nextTermRole: false,
    personalEmail: false,
  });

  const [formSections, setFormSections] = useState([]);

  useEffect(() => {
    if (hydrated) {
        useFormAndUserDetails('62cb8828c4064c4a26995246', dispatch, router, user._id)
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
                    }).sort(s => 
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
                    console.log("memberData");
                    console.log(memberData);
                    setFormSections(sections);
                    setFormValues({
                      ...memberData,
                      fullName: "",
                      previousTerms: [],
                      futureTerms: []
                  });
                }
            })
            .catch(e => {
                console.error(e);
                throw new Error(e);
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
    validateField(formValues, formErrors, 'subteam');
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
      const {fullName, nextSchoolTerm, previousTerms, futureTerms, subteam, nextTermActivity,
              nextTermRole, personalEmail, termComments, desiredWork} = formValues;

      const fullNameParts = fullName.split(/\s+/);
      updateUser(dispatch, {
          name: {
              first: fullNameParts[0].trim(),
              last: fullNameParts[fullNameParts.length - 1].trim()
          },
          personalEmail: personalEmail.trim(),
          subteams: [subteam], // NOTE: As of March 2022, members can only select one option for subteam. Before this, members can select multiple subteams. We will keep subteams as an array for now for backwards-compatability and to prevent conflicts with Database data.
          activeSchoolTerms: [...previousTerms, ...futureTerms],
          nextSchoolTerm,
          nextTermActivity,
          nextTermRole,
          termComments: termComments.trim(),
          desiredWork: desiredWork.trim(),
      }, user._id, router).then(res => {
          console.log("Update User Info. Completed.");
          // TODO: redirect somewhere here, maybe also issue a get request to "refresh"
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
