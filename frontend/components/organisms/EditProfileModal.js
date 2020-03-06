import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';
import {useState} from 'react';
import EditSettingsModal from '../molecules/EditSettingsModal';
import SettingsInputPair from '../molecules/AccountSettings/SettingsInputPair';
import AutocompleteInput from '../molecules/AutocompleteInput'; // TODO: rename

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';

import {isEmail} from 'validator';
import theme from '../theme';


const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

// TODO: make into a molecule
const InputSegment = ({label, name, placeholder, value, onHandleChange, error = false, errorText = ""}) => {
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
const SelectSegment = ({title,
    name,
    handleChange,
    value,
    options,
    allowCustomInput = false,
    error = false, 
    errorText = ""}) => {

        // TODO: refactor this
        const handleOptChange = (title, val) => {
            handleChange(name, val);
        };

        return (
            <SystemComponent>
                <SettingsInputPair title={title}
                    value={value}
                    options={options}
                    onChange={handleOptChange} // TODO: extra parameter passed up.
                    isMulti={false}
                    allowCustomInput={allowCustomInput}
                />
                {error && <SystemComponent color={theme.colors.alertAction}>{errorText}</SystemComponent>}
            </SystemComponent>
        );
}

const validProgramPattern = /^[A-Za-z,'-\s]*$/;
const EditProfileModal = ({visible, handleCloseModal}) => {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        program: "",
        term: "",
        sequence: "",
        interest: "",
        skill: ""
    });
    const [interests, setInterests] = useState([]);
    const [skills, setSkills] = useState([]);
    const [hasError, setHasError] = useState({ // TODO: Think about different locales later
        firstName: false,
        email: false,
        program: false
    });

    const handleSave = () => {
        const updatedErrorList = {...hasError};
        if (!formValues['firstName']) {
            updatedErrorList['firstName'] = true;
        }
        updatedErrorList['email'] = !isEmail(formValues['email']);
        updatedErrorList['program'] = 
            !formValues['program'].value ||
            !validProgramPattern.test(formValues['program'].value.trim());

        setHasError(updatedErrorList);
    } 

    const handleInputChange = (name, value) => {
        if (hasError[name]) {
            hasError[name] = false;
        }
        setFormValues({...formValues, [name]: value});
    }
    
    return (
        <EditSettingsModal 
            visible={visible} 
            title="Edit Profile Information" 
            handleCloseModal={handleCloseModal}
            handleSave={handleSave}
        >
            <SystemComponent display="grid" 
                gridTemplateColumns={["100%", "repeat(2, 1fr)"]}
                gridColumnGap={[20, 30, 40]}
                gridAutoRows='minmax(70px, auto)'
            >
                <SystemComponent>
                    <InputSegment
                        label="First Name" // TODO: think about different locales and name validation 
                        name="firstName"
                        placeholder="First Name" 
                        value={formValues['firstName']}
                        onHandleChange={handleInputChange}
                        error={hasError['firstName']}
                        errorText="Please enter your First Name." />
                </SystemComponent>
                <SystemComponent>
                    <InputSegment
                        label="Last Name" 
                        name="lastName"
                        placeholder="Last Name" 
                        value={formValues['lastName']}
                        onHandleChange={handleInputChange} />
                </SystemComponent>
                <SystemComponent>
                    <InputSegment
                        label="Birth Date" 
                        name="birthDate"
                        placeholder="Birth Date" 
                        value={formValues['birthDate']}
                        onHandleChange={handleInputChange} />
                </SystemComponent>
                <SystemComponent>
                    <InputSegment
                        label="Email" 
                        name="email"
                        placeholder="Email" 
                        value={formValues['email']}
                        onHandleChange={handleInputChange} 
                        error={hasError['email']}
                        errorText="Please Enter a valid Email Address" />
                </SystemComponent>
                <SelectSegment title="Academic Program"
                    name="program"
                    value={formValues['program']}
                    options={[
                        {value: 'eng', label: 'Engineering'},
                        {value: 'cs', label: 'Computer Science'},
                        {value: 'math', label: 'Math'}
                    ]}
                    handleChange={handleInputChange}
                    allowCustomInput={true}
                    error={hasError['program']}
                    errorText={"Please Enter Valid Program Name. All letters and these special characters { - ' , } are allowed."}
                />
                <SelectSegment title="School Term"
                    name="term"
                    value={formValues['term']}
                    options={[
                        {value: '1a', label: '1A'},
                        {value: '1b', label: '1B'},
                        {value: '2a', label: '2A'},
                        {value: '2b', label: '2B'},
                        {value: '3a', label: '3A'},
                        {value: '3b', label: '3B'},
                        {value: '4a', label: '4A'},
                        {value: '4b', label: '4B'},
                        {value: '0', label: 'Other'}
                    ]}
                    handleChange={handleInputChange}
                />
                <SelectSegment title="Work-Study Sequence"
                    name="sequence"
                    value={formValues['sequence']}
                    options={[
                        {value: '4', label: '4 Stream'}, // TODO: Verify these values
                        {value: '8', label: '8 Stream'},
                        {value: '0', label: 'other'}
                    ]}
                    handleChange={handleInputChange}
                />
            </SystemComponent>

            <SystemComponent display="grid" 
                gridAutoRows='minmax(70px, auto)'
            >
                <SystemComponent pb={4}>
                    <AutocompleteInput
                        title="Skills"
                        placeholder="Add Skills"
                        listOfSelected={skills}
                        updateList={setSkills}
                        value={formValues['skill']}
                        handleInputChange={(value) => handleInputChange('skill', value)}
                    />
                </SystemComponent>
                
                <SystemComponent>
                    <AutocompleteInput
                        title="Interests"
                        placeholder="Add Interests"
                        listOfSelected={interests}
                        updateList={setInterests}
                        value={formValues['interest']}
                        handleInputChange={(value) => handleInputChange('interest', value)}
                    />
                </SystemComponent>
            </SystemComponent>
            
        </EditSettingsModal>
    );
}
// TODO: for skills section, allow suggestions to pop up.
export default EditProfileModal;