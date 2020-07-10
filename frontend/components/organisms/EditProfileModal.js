import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useRouter } from "next/router";
import EditSettingsModal from '../molecules/EditSettingsModal';
import SettingsInputPair from '../molecules/AccountSettings/SettingsInputPair';
import MultiSelectInput from '../molecules/MultiSelectInput'; // TODO: rename

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import { updateUser } from "../../store/reducers/userReducer";

import isBefore from 'validator/lib/isBefore';
import theme from '../theme';

export const SCHOOL_TERM_OPTS = [
    {value: '1A', label: '1A'},
    {value: '1B', label: '1B'},
    {value: '2A', label: '2A'},
    {value: '2B', label: '2B'},
    {value: '3A', label: '3A'},
    {value: '3B', label: '3B'},
    {value: '4A', label: '4A'},
    {value: '4B', label: '4B'},
    {value: '0', label: 'Unspecified'}
];
export const COOP_SEQ_OPTS = [
    {value: '4', label: '4 Stream'}, // TODO: Verify these values
    {value: '8', label: '8 Stream'},
    {value: '0', label: 'other'}
];
export const PROGRAM_OPTS = [
    {value: 'eng', label: 'Engineering'},
    {value: 'cs', label: 'Computer Science'},
    {value: 'math', label: 'Math'}
]

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

// TODO: make into a molecule
const InputSegment = ({label, name, placeholder, value, handleChange, error = false, errorText = ""}) => {
    return (
        <>
            <Header5>{label}</Header5>
            <CustomInput 
                name={name}
                placeholder={placeholder}
                variant="text"
                value={value}
                onChange={(evt) => handleChange(name, evt.target.value)}
            />
            {error && <SystemComponent color={theme.colors.alertAction}>{errorText}</SystemComponent>}
        </>
    )
}

const DateInputSegment = ({label, name, value, handleChange, error = false, errorText = ""}) => {
    
    const handleDateChange = (datePart, datePartValue) => {
        if (!datePartValue) datePartValue = "";
        if (datePartValue.match(/^[0-9]*$/)) {
            let fragmentedDate = value.split('-');
            
            switch(datePart) {
                case 'year':
                    if (datePartValue.length <= 4) fragmentedDate[0] = datePartValue;
                    break;
                case 'month':
                    if (datePartValue.length <= 2) fragmentedDate[1] = datePartValue;
                    break;
                case 'day':
                    if (datePartValue.length <= 2) fragmentedDate[2] = datePartValue;
                    break;
            }
            handleChange(name, fragmentedDate.join('-'));
        }
    }
    
    return (
        <>
            <Header5>{label}</Header5>
            <SystemComponent display="grid" gridTemplateColumns='1fr 1fr 2fr'>
                <SystemComponent gridColumn="1 / span 1">
                    <CustomInput 
                        placeholder="MM"
                        maxlength="2"
                        variant="text"
                        value={value.split('-')[1]}
                        onChange={(evt) => handleDateChange('month', evt.target.value) }
                    />
                </SystemComponent>
                <SystemComponent gridColumn="2 / span 1">
                    <CustomInput 
                        placeholder="DD"
                        maxlength="2"
                        variant="text"
                        value={value.split('-')[2]}
                        onChange={(evt) => handleDateChange('day', evt.target.value)} 
                    />
                </SystemComponent>
                <SystemComponent gridColumn="3 / span 1">
                    <CustomInput 
                        placeholder="YYYY"
                        maxlength="4"
                        variant="text"
                        value={value.split('-')[0]}
                        onChange={(evt) => handleDateChange('year', evt.target.value)} 
                    />
                </SystemComponent>
            </SystemComponent>
            {error && <SystemComponent color={theme.colors.alertAction}>{errorText}</SystemComponent>}
        </>
    )
};

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
const EditProfileModal = ({dataLoaded, visible, handleCloseModal}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { token, user } = useSelector(state => state.userState);
    
    //let birthday = (dataLoaded && birthday) ? new Date(birthday.year, birthday.month, birthday.day) : new Date();
    //birthday = birthday.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

    const [formValues, setFormValues] = useState({
        firstName: dataLoaded ? user.name.first : "",
        lastName: dataLoaded ? user.name.last : "",
        display: dataLoaded ? user.name.display : "",
        birthDate: dataLoaded ? user.birthday.year.toString().concat("-", user.birthday.month.toString(), "-", user.birthday.day.toString()) : "--",
        program: (dataLoaded && PROGRAM_OPTS.find(opt => opt.value === user.program)) ? {label: PROGRAM_OPTS.find(opt => opt.value === user.program).label, value: user.program} : {label: "", value: ""},
        term: (dataLoaded && SCHOOL_TERM_OPTS.find(opt => opt.value === user.stream.currentSchoolTerm)) ? {label: SCHOOL_TERM_OPTS.find(opt => opt.value === user.stream.currentSchoolTerm).label, value: user.stream.currentSchoolTerm} : {label: "", value: ""},
        sequence: "",                           // TODO: eliminate this later.
        interest: "",
        skill: ""
    });
    const [interests, setInterests] = useState(dataLoaded && user.interests ? user.interests.map(i => i.name) : []);
    const [skills, setSkills] = useState(dataLoaded && user.skills ? user.skills.map(s => s.name) : []);
    const [hasError, setHasError] = useState({ // TODO: Think about different locales later
        firstName: false,
        program: false,
        birthDate: false
    });

    useEffect(() => {
        if (visible) {
            setFormValues({
                ...formValues, 
                firstName: dataLoaded ? user.name.first : "",
                lastName: dataLoaded ? user.name.last : "",
                display: dataLoaded ? user.name.display : "",
                birthDate: dataLoaded ? user.birthday.year.toString().concat("-", user.birthday.month.toString(), "-", user.birthday.day.toString()) : "--",
                program: (dataLoaded && PROGRAM_OPTS.find(opt => opt.value === user.program)) ? {label: PROGRAM_OPTS.find(opt => opt.value == user.program).label, value: user.program} : {label: "", value: ""},
                term: (dataLoaded && SCHOOL_TERM_OPTS.find(opt => opt.value === user.stream.currentSchoolTerm)) ? {label: SCHOOL_TERM_OPTS.find(opt => opt.value == user.stream.currentSchoolTerm).label, value: user.stream.currentSchoolTerm} : {label: "", value: ""},
                sequence: "", // TODO: eliminate this later.
            });

            setInterests(dataLoaded && user.interests ? user.interests.map(i => i.name) : []);
            setSkills(dataLoaded && user.skills ? user.skills.map(s => s.name) : []);

            setHasError({
                firstName: false,
                program: false,
                birthDate: false
            });
        }
    }, [dataLoaded, visible]);

    const handleSave = () => {
        const updatedErrorList = {...hasError};
        if (!formValues['firstName']) {
            updatedErrorList['firstName'] = true;
        }
        updatedErrorList['program'] = 
            !formValues['program'].value ||
            !validProgramPattern.test(formValues['program'].value.trim());

        if ( !isBefore(formValues['birthDate'], Date(Date.now())) ) updatedErrorList['birthDate'] = true;
        setHasError(updatedErrorList);

        if (!Object.values(updatedErrorList).includes(true)) {
            updateUser(dispatch, {
                "name": {
                    "first": formValues.firstName,
                    "last": formValues.lastName,
                    "display": formValues.display
                },
                "birthday": {
                    "year": formValues.birthDate.split("-")[0],
                    "month": formValues.birthDate.split("-")[1],
                    "day": formValues.birthDate.split("-")[2]
                },
                "program": formValues.program.value,
                "interests": interests,
                "skills": skills,
                "stream": {
                    ...user.stream,
                    "currentSchoolTerm": formValues.term.value, 
                }                 // TODO: change stream field later
            }, token, user._id, router, false);
            handleCloseModal();
        }
        
    } 

    const handleInputChange = (name, value) => {
        if (hasError[name]) {
            hasError[name] = false;
        }
        setFormValues({...formValues, [name]: value});
    }

    let schoolTerm = SCHOOL_TERM_OPTS.find(opt => opt.value === formValues['term']);
    if (!schoolTerm) schoolTerm = formValues['term'];
    let coopSeq = COOP_SEQ_OPTS.find(opt => opt.value === formValues['sequence']);
    if (!coopSeq) coopSeq = formValues['sequence'];

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
                        handleChange={handleInputChange}
                        error={hasError['firstName']}
                        errorText="Please enter your First Name." />
                </SystemComponent>
                <SystemComponent>
                    <InputSegment
                        label="Last Name" 
                        name="lastName"
                        placeholder="Last Name" 
                        value={formValues['lastName']}
                        handleChange={handleInputChange} />
                </SystemComponent>
                <SystemComponent>
                    <InputSegment
                        label="Display Name" 
                        name="display"
                        placeholder="Display Name" 
                        value={formValues['display']}
                        handleChange={handleInputChange} />
                </SystemComponent>
                <SystemComponent>
                    <DateInputSegment
                        label="Birth Date" 
                        name="birthDate"
                        value={formValues['birthDate']}
                        handleChange={handleInputChange}
                        error={hasError['birthDate']}
                        errorText="Birth date must be earlier than today." />
                </SystemComponent>
                <SelectSegment 
                    title="Academic Program"
                    name="program"
                    value={formValues['program']}
                    options={PROGRAM_OPTS}
                    handleChange={handleInputChange}
                    allowCustomInput={true}
                    error={hasError['program']}
                    errorText="Please enter valid Program Name. Special characters allowed: - ' ,"
                />
                <SelectSegment 
                    title="School Term"
                    name="term"
                    value={schoolTerm}
                    options={SCHOOL_TERM_OPTS}
                    handleChange={handleInputChange}
                />
                <SelectSegment 
                    title="Work-Study Sequence"
                    name="sequence"
                    value={coopSeq}
                    options={COOP_SEQ_OPTS}
                    handleChange={handleInputChange}
                />
            </SystemComponent>

            <SystemComponent display="grid" 
                gridAutoRows='minmax(70px, auto)'
            >
                <SystemComponent pb={4}>
                    <MultiSelectInput
                        title="Skills"
                        listOfSelected={skills}
                        updateList={setSkills}
                        value={formValues['skill']}
                        handleInputChange={(value) => handleInputChange('skill', value)}
                        options={[ { value: 'java', label: 'Java' },
                            { value: 'autocad', label: 'AutoCAD' }]}
                    />
                </SystemComponent>
                
                <SystemComponent>
                    <MultiSelectInput
                        title="Interests"
                        listOfSelected={interests}
                        updateList={setInterests}
                        value={formValues['interest']}
                        handleInputChange={(value) => handleInputChange('interest', value)}
                        options={[ { value: 'wa', label: 'Watch Anime' },
                            { value: 'sdc', label: 'Self-Driving Cars' }]}
                    />
                </SystemComponent>
            </SystemComponent>
            
        </EditSettingsModal>
    );
}
// TODO: for skills section, allow suggestions to pop up.
export default EditProfileModal;