import {useState} from 'react';
import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import EditSettingsModal from '../molecules/EditSettingsModal';
import theme from '../theme';
import {isURL} from 'validator';

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;
// Handle error display here
// Pass flags up to the parent

// How about value
// validation happens here, so just store the value here.
const URLField = ({label, name, placeholder, value, onHandleChange, error, errorText}) => {
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
            {error && <SystemComponent color={theme.colors.alertAction}>{errorText}</SystemComponent>}
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
        facebookUrl: false,
        linkedInUrl: false,
        githubUrl: false,
        websiteUrl: false
    });

    const validateUrl = (errorList, fieldName, fieldValue, allowedHosts = false) => {
        if(!fieldValue) return;

        if (allowedHosts) {
            allowedHosts = 
                allowedHosts.concat(allowedHosts.map(host => 'www.'.concat(host)));
        }
        if (!isURL(fieldValue, {require_host: true, 
                                allow_underscores: true,
                                host_whitelist: allowedHosts})) {
            errorList[fieldName] = true;
        } else {
            errorList[fieldName] = false;
        }
    }

    const handleSave = (evt) => {
        evt.preventDefault();

        const errors = {...hasError};
        validateUrl(errors, 'facebookUrl', formValues['facebookUrl'], ['facebook.com']);
        validateUrl(errors, 'githubUrl', formValues['githubUrl'], ['github.com']);
        validateUrl(errors, 'linkedInUrl', formValues['linkedInUrl'], ['linkedin.com']);
        validateUrl(errors, 'websiteUrl', formValues['websiteUrl']);

        setHasError(errors);
    }

    const handleChange = (name, value) => {
        setHasError({
            ...hasError,
            [name]: false
        })
        
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
                        error={hasError['websiteUrl']}
                        errorText={"Please Enter Valid Url."}
                        onHandleChange={handleChange}
                    />
                </SystemComponent>
                <SystemComponent>
                    <URLField
                        label="Github"
                        name="githubUrl"
                        placeholder="Search" 
                        value={formValues["githubUrl"]}
                        error={hasError['githubUrl']}
                        errorText={"Please Enter Valid Github Profile Url."}
                        onHandleChange={handleChange}
                    />
                </SystemComponent>
                <SystemComponent>
                    <URLField
                        label="LinkedIn"
                        name="linkedInUrl"
                        placeholder="Search"
                        value={formValues["linkedInUrl"]}
                        error={hasError['linkedInUrl']} 
                        errorText={"Please Enter Valid LinkedIn Profile Url."}
                        onHandleChange={handleChange}
                    />
                </SystemComponent>
                <SystemComponent>   
                    <URLField
                        label="Facebook"
                        name="facebookUrl"
                        placeholder="Search" 
                        value={formValues["facebookUrl"]}
                        error={hasError.facebookUrl}
                        errorText={"Please Enter Valid Facebook Profile Url."}
                        onHandleChange={handleChange}
                    />
                </SystemComponent>
            </SystemComponent>
        </EditSettingsModal>
    )
}
export default EditLinksModal;
