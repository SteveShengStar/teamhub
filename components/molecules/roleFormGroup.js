import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import Header2 from '../atoms/Header2';
import Select from '../atoms/Select';
import Input from '../atoms/Input';

const RoleFormGroup = ({ termValue, subteamValue, handleChange }) => (
  <>
    <FormHeader>Tell us about your role on the team</FormHeader>
    <FormLabel htmlFor="termJoined">When did you join the team?</FormLabel>
    <CustomInput
      name="termJoined"
      id="termJoined"
      type="text"
      variant="text"
      placeholder="Select Term"
      value={termValue}
      onChange={handleChange}
    />
    <FormLabel htmlFor="subteam">What subteam(s) are you on?</FormLabel>
    <CustomInput
      name="subteam"
      id="subteam"
      type="text"
      variant="text"
      placeholder="Select Subteam"
      value={subteamValue}
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

export default RoleFormGroup;
