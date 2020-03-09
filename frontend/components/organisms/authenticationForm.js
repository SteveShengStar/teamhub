import React, { useState } from 'react';

import MultiStepFormTemplate from '../templates/MultiStepFormTemplate';
import NameFormGroup from '../molecules/nameFormGroup';
import RoleFormGroup from '../molecules/roleFormGroup';

const AuthenticationForm = () => {
  const blankForm = {
    name: '',
    termJoined: '',
    subteam: '',
    projects: [],
    role: ''
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState(blankForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const isFirstState = () => {
    return currentStep <= 1;
  };

  const isLastState = () => {
    return currentStep >= 2;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <MultiStepFormTemplate
      handleNext={!isLastState() ? handleNext : undefined}
      handlePrevious={!isFirstState() ? handlePrevious : undefined}
      handleSubmit={isLastState() ? handleSubmit : undefined}
    >
      <>
        <p>CurrentStep : {currentStep} </p>
        {currentStep == 1 && (
          <NameFormGroup
            nameValue={formState.name}
            handleChange={handleChange}
          />
        )}
        {currentStep == 2 && (
          <RoleFormGroup
            nameValue={formState.name}
            handleChange={handleChange}
          />
        )}
      </>
    </MultiStepFormTemplate>
  );
};
export default AuthenticationForm;
