import React, { useState, useContext, useLayoutEffect } from 'react';
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

import {validateField, clearErrorMessages, isInvalidPhoneNumber, isInvalidStudentId, clearErrorMessageIfExists} from '../../frontend/util'

import { updateUser } from "../../frontend/store/reducers/userReducer";

const SCHOOL_TERMS = [
  '1A Co-op',
  '1B Study',
  '1B Co-op',
  '2A Study',
  '2A Co-op',
  '2B Study',
  '2B Co-op',
  '3A Study',
  '3A Co-op',
  '3B Study',
  '3B Co-op',
  '4A Study',
  '4A Co-op',
  '4B Study',
  '4B Co-op',
  'Graduate Student',
  'Not currently enrolled at the University of Waterloo',
  'Alumni',
];

const PREV_TERMS = [
  'F22',
  'S22',
  'W22',
  'F21',
  'S21',
  'W21',
  'F20',
  'S20',
  'W20',
  'F19',
  'S19',
  'W19',
  'F18',
  'S18',
  'W18',
];

const FUTURE_TERMS = [
  'W22',
  'S22',
  'F22',
  'W23',
  'S23',
  'F23',
  'None of the above',
];

const SUBTEAMS = [
  'Business',
  'LIM',
  'Mechanical',
  'MC',
  'BMS',
  'Embedded',
  'Infrastructure',
  'Web',
  'Team Hub',
];

const NEXT_TERM_ACTIVITY = [
  'Yes, I will continue on the team, and I will be on campus (or working locally)',
  'Yes, I will continue on the team remotely and can come to campus if needed/possible',
  'Yes, I will continue on the team remotely only',
  'Undecided or unsure',
  'No, taking the term off',
];

const NEXT_TERM_ROLE = [
  'Continue with my sub-team',
  'Transfer to another sub-team (please specify)',
  'Want to take on a leadership role - lead',
  'Want to take on a leadership role - co-op supervisor',
  'Want to become a co-op',
  "I'm undecided or not continuing",
];

const fieldIDs = [
  'fullName',
  'nextSchoolTerm',
  'subteam',
  'nextTermActivity',
  'nextTermRole',
  'email'
];

const ReturningMembersForm = () => {
  const theme = useContext(ThemeContext);

  const dispatch = useDispatch();
  const router = useRouter();
  const { user, hydrated } = useSelector(state => state.userState);

  const [formValues, setFormValues] = useState({
    fullName: '',
    nextSchoolTerm: '',
    previousTerms: [],
    futureTerms: [],
    subteam: '',
    nextTermActivity: '',
    nextTermRole: '',
    email: '',
    termComments: '',
    desiredWork: '',
  });

  const [hasError, setHasError] = useState({
    fullName: false,
    nextSchoolTerm: false,
    nextTermActivity: false,
    subteam: false,
    nextTermRole: false,
    email: false,
  });

  const setErrorMessages = (formErrors) => {
    validateField(formValues, formErrors, 'fullName');
    validateField(formValues, formErrors, 'email');
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
              nextTermRole, email, termComments, desiredWork} = formValues;

      const fullNameParts = fullName.split(/\s+/);
      updateUser(dispatch, {
          name: {
              first: fullNameParts[0].trim(),
              last: fullNameParts[fullNameParts.length - 1].trim()
          },
          personalEmail: email.trim(),
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

  useLayoutEffect(()=> {
    for (var i=0; i < fieldIDs.length; i++) {
        if (hasError[fieldIDs[i]]) {
            const element = document.getElementById(fieldIDs[i]);
            if (element) {
                element.scrollIntoView({behavior: 'smooth'});
                break;
            }
        }
    };
}, [hasError]);

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
            <FieldSection
              title="Full Name"
              required={true}
              name="fullName"
              value={formValues['fullName']}
              onChange={handleInputChange}
              hasError={hasError['fullName']}
              errorText="Please enter your full name."
            />
            <FieldSection
              title="This upcoming term, I will be in my"
              type="radio"
              name="nextSchoolTerm"
              required={true}
              options={SCHOOL_TERMS}
              onChange={handleFieldChange}
              value={formValues.nextSchoolTerm}
              hasError={hasError['nextSchoolTerm']}
              errorText="Please select an option above."
            />
            <FieldSection
              title="Previous Terms I worked on Waterloop"
              type="checkbox"
              name="previousTerms"
              value={formValues['previousTerms']}
              options={PREV_TERMS}
              onChange={handleFieldChange}
            />
            <FieldSection
              title="I will be on Waterloop during"
              type="checkbox"
              name="futureTerms"
              value={formValues['futureTerms']}
              options={FUTURE_TERMS}
              onChange={handleFieldChange}
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
              errorText="Please select an option above."
            />
            <FieldSection
              title="Will you be active on the team this upcoming term?"
              name="nextTermActivity"
              type="radio"
              required={true}
              options={NEXT_TERM_ACTIVITY}
              value={formValues.nextTermActivity}
              onChange={handleFieldChange}
              hasError={hasError['nextTermActivity']}
              errorText="Please select an option above."
            />
            <FieldSection
              title="If you're continuing, what are you planning to do?"
              name="nextTermRole"
              type="radio"
              required={true}
              options={NEXT_TERM_ROLE}
              value={formValues.nextTermRole}
              onChange={handleFieldChange}
              hasError={hasError['nextTermRole']}
              errorText="Please select an option above."
            />
            <FieldSection
              title="Please provide your personal email address"
              name="email"
              required={true}
              value={formValues['email']}
              onChange={handleInputChange}
              hasError={hasError['email']}
              errorText="Please enter a valid email."
            />
            <FieldSection
              title="Any additional comments or thoughts on the term?"
              name="termComments"
              value={formValues['termComments']}
              onChange={handleInputChange}
            />
            <FieldSection
              title="Is there anything specific you want to work on next term?"
              name="desiredWork"
              value={formValues['desiredWork']}
              onChange={handleInputChange}
            />
          </SystemComponent>
          <FormFooter handleSubmit={handleSubmit} submitDisabled={!hydrated}/>
        </Card>
      </SystemComponent>
    </PageTemplate>
  );
};

export default ReturningMembersForm;
