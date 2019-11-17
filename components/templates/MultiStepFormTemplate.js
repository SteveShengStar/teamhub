import React from 'react';
import styled from 'styled-components';

import Card from '../atoms/Card';
import Button from '../atoms/Button';

const FormCardTemplate = ({
  handlePrevious,
  handleNext,
  handleSubmit,
  children
}) => (
  <Card
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    <form onSubmit={handleSubmit}>
      <FormContent>
        {React.Children.only(children)}
        <ButtonContainer>
          {handlePrevious && (
            <Button
              type="button"
              onClick={handlePrevious}
              style={{
                marginRight: 'auto'
              }}
            >
              Back
            </Button>
          )}
          {handleNext && (
            <Button
              type="button"
              onClick={handleNext}
              style={{
                marginLeft: 'auto'
              }}
            >
              Continue
            </Button>
          )}
          {handleSubmit && (
            <Button
              type="submit"
              onClick={handleSubmit}
              style={{
                marginLeft: 'auto'
              }}
            >
              Finish
            </Button>
          )}
        </ButtonContainer>
      </FormContent>
    </form>
  </Card>
);

const FormContent = styled.div`
  text-align: left;
  margin: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`;

export default FormCardTemplate;
