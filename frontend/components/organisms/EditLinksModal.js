import {useState} from 'react';
import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import EditSettingsModal from '../molecules/EditSettingsModal';

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;
// Handle error display here
// Pass flags up to the parent

// How about value
// validation happens here, so just store the value here.
const URLField = ({label, name, placeholder, value, onHandleChange}) => {
    return (
        <>
            <Header5>{label}</Header5>
            <CustomInput 
                name={name}
                placeholder={placeholder}
                variant="text"
                value={value}
                onChange={(evt) => onHandleChange(name, evt.target.value)} 
            />
            <SystemComponent></SystemComponent>
        </>
    )
}

const EditLinksModal = ({visible, handleCloseModal}) => {
    
    const [formValues, setFormValues] = useState({
        facebookUrl: '',
        linkedInUrl: '',
        githubUrl: '',
        websiteUrl: ''
    });
    const [hasError, setHasError] = useState({
        facebookUrl: '',
        linkedInUrl: '',
        githubUrl: '',
        websiteUrl: ''
    });

    const validateUrl = (errorList, fieldName, fieldValue, allowedHostsList = false) => {
        if (!isUrl(fieldValue, {host_whitelist: allowedHostsList})) {
            errorList[fieldName] = false;
        } else {
            errorList[fieldName] = true;
        }
    }

    const handleSave = (evt) => {
        evt.preventDefault();

        const errors = {};
        validateUrl(errors, 'facebookUrl', formValues['facebookUrl'], ['facebook.com']);
        validateUrl(errors, 'githubUrl', formValues['githubUrl'], ['github.com']);
        validateUrl(errors, 'linkedInUrl', formValues['linkedInUrl'], ['linkedin.com']);
        validateUrl(errors, 'websiteUrl', formValues['websiteUrl']);

        // TODO: remove error as soon as typing begins
        setHasError(errors);
    }

    const handleChange = (name, value) => {
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    return (
        <EditSettingsModal 
            visible={visible} 
            title="Edit External Accounts" 
            handleCloseModal={handleCloseModal}
            handleSave={handleSave}
        >
            <SystemComponent display="grid" 
                gridTemplateColumns={["100%", "repeat(2, 1fr)"]}
                gridColumnGap={[20, 30, 40]}
                gridAutoRows='minmax(70px, auto)'
            >
                <SystemComponent>
                    <URLField
                        label="Personal Website"
                        name="websiteUrl"
                        placeholder="Search" 
                        value={formValues["websiteUrl"]}
                        errorText={"Please Enter Valid Facebook Profile Url."}
                        onHandleChange={handleChange}
                    />
                </SystemComponent>
                <SystemComponent>
                    <Header5>Github</Header5>   
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
                <SystemComponent>
                    <Header5>LinkedIn</Header5>  
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
                <SystemComponent>   
                    <Header5>Facebook</Header5>  
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
            </SystemComponent>
        </EditSettingsModal>
    )
}
export default EditLinksModal;
