import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import Header2 from '../atoms/Header2';
import Input from '../atoms/Input';

const NameFormGroup = ({ nameValue, handleChange }) => (
  <>
    <FormHeader>Hello!</FormHeader>
    <FormLabel htmlFor="name">What's your preferred name?</FormLabel>
    <CustomInput
      name="name"
      id="name"
      type="text"
      variant="text"
      placeholder="Enter name"
      value={nameValue}
      onChange={handleChange}
    />
  </>
);

const FormHeader = styled(Header2)`
  text-align: left;
  margin-bottom: 25px;
`;

const FormLabel = styled(Label)`
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
`;

const CustomInput = styled(Input)`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  font-size: 28px;
  &:focus {
    border-bottom: 1px solid black;
    outline: none;
  }
`;

export default NameFormGroup;
