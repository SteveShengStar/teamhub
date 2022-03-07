import React from 'react';
import SubmitButton from '../../atoms/SubmitButton';
import { SystemComponent } from '../../atoms/SystemComponents';

const FormFooter = ({handleSubmit, submitDisabled}) => {
    return (
        <SystemComponent mt={5} textAlign='center'>
            <SubmitButton handleClick={(e) => handleSubmit(e)} disabled={submitDisabled}>Submit</SubmitButton>
        </SystemComponent>
    );
}
export default FormFooter;