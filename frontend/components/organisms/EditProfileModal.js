import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';
import TextArea from "../atoms/TextArea";
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeBadValuesAndDuplicates} from '../../helpers'
import { useRouter } from "next/router";
import EditSettingsModal from '../molecules/EditSettingsModal';
import SettingsInputPair from '../molecules/AccountSettings/SettingsInputPair';
import MultiSelectInput from '../molecules/MultiSelectInput';
import { getFilters } from '../../store/reducers/membersReducer';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import { updateProfileInfo, UserTypes } from "../../store/reducers/userReducer";

import isBefore from 'validator/lib/isBefore';
import {isEmpty} from 'lodash';
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
export const PROGRAM_OPTS = [
    {value: 'engineering', label: 'Engineering'},
    {value: 'computer science', label: 'Computer Science'},
    {value: 'math', label: 'Math'}
]

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

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
    errorText = "",
    helpMessage}) => {

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
                    helpMessage={helpMessage}
                />
                {error && <SystemComponent color={theme.colors.alertAction}>{errorText}</SystemComponent>}
            </SystemComponent>
        );
}

const validProgramPattern = /^[A-Za-z,'-\s]*$/;
const EditProfileModal = ({dataLoaded, visible, handleCloseModal}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, hydrated } = useSelector(state => state.userState);
    const { filters } = useSelector(state => state.membersState);
    const { interests: interestOpts, skills: skillOpts } = filters;

    const [formValues, setFormValues] = useState({
        firstName: dataLoaded && !isEmpty(user) ? user.name.first : "",
        lastName: dataLoaded && !isEmpty(user) ? user.name.last : "",
        program: (dataLoaded && PROGRAM_OPTS.find(opt => opt.value === user.program)) ? {label: PROGRAM_OPTS.find(opt => opt.value === user.program).label, value: user.program} : {label: "", value: ""},
        bio: dataLoaded ? user.bio : ""
    });
    const [interests, setInterests] = useState(dataLoaded && user.interests ? user.interests.map(i => i.name) : []);
    const [skills, setSkills] = useState(dataLoaded && user.skills ? user.skills.map(s => s.name) : []);
    const [hasError, setHasError] = useState({
        firstName: false,
        program: false
    });

    useEffect(() => {
        if (isEmpty(filters)) {
            getFilters(dispatch, router);
        }
    }, [hydrated]);

    useEffect(() => {
        setFormValues({
            ...formValues, 
            firstName: dataLoaded && !isEmpty(user) ? user.name.first : "",
            lastName: dataLoaded && !isEmpty(user) ? user.name.last : "",
            program: (dataLoaded && PROGRAM_OPTS.find(opt => opt.value === user.program)) ? {label: PROGRAM_OPTS.find(opt => opt.value == user.program).label, value: user.program} : {label: "", value: ""},
            bio: dataLoaded ? user.bio : ""
        });

        setInterests(dataLoaded && user.interests ? user.interests.map(i => i.name) : []);
        setSkills(dataLoaded && user.skills ? user.skills.map(s => s.name) : []);

        setHasError({
            firstName: false,
            program: false
        });
    }, [dataLoaded]);

    const handleSave = () => {
        const updatedErrorList = {...hasError};

        if (!formValues['firstName']) {
            updatedErrorList['firstName'] = true;
        }
        updatedErrorList['program'] = 
            !formValues['program'].value ||
            !validProgramPattern.test(formValues['program'].value.trim());
        setHasError(updatedErrorList);

        if (!Object.values(updatedErrorList).includes(true)) {
            updateProfileInfo(dispatch, {
                "name": {
                    "first": formValues.firstName.trim(),
                    "last": formValues.lastName.trim()
                },
                "program": formValues.program.value.trim(),
                "interests": removeBadValuesAndDuplicates(interests),
                "skills": removeBadValuesAndDuplicates(skills),
                "bio": formValues.bio.trim()              
            }, user._id, router, false)
            .then(res => {
                if (res.success) {
                    dispatch({ type: UserTypes.UPDATE_INFO, payload: res.body[0] });
                }
                handleCloseModal();
            }).catch(() => {
                alert("An error occured when updating your profile information.");
            });
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

    return (
        <>
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
                            label="First Name"
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
                    <SelectSegment 
                        title="Academic Program"
                        name="program"
                        value={formValues['program']}
                        options={PROGRAM_OPTS}
                        handleChange={handleInputChange}
                        allowCustomInput={true}
                        error={hasError['program']}
                        errorText="Please enter valid Program Name. Special characters allowed are  - ' ,"
                        helpMessage="Type below to create a custom entry."
                    />
                </SystemComponent>

                <SystemComponent display="grid" 
                    gridAutoRows='minmax(70px, auto)'
                >
                    <SystemComponent pb={4}>
                        <MultiSelectInput
                            title="Skills"
                            setSelectedItems={setSkills}
                            options={
                                skillOpts ? 
                                skillOpts.map(skill => 
                                ({value: skill?.name?.toLowerCase(), label: skill.name}))
                                : 
                                []
                            }
                            helpMessage="Type below to create new/custom entries."
                        />
                    </SystemComponent>
                    <SystemComponent pb={4}>
                        <MultiSelectInput
                            title="Interests"
                            setSelectedItems={setInterests}
                            options={
                                interestOpts ? 
                                interestOpts.map(interest => 
                                ({value: interest?.name?.toLowerCase(), label: interest.name}))
                                : 
                                []
                            }
                            helpMessage="Type below to create new/custom entries."
                        />
                    </SystemComponent>
                    <SystemComponent>
                        <Header5>Short Bio</Header5>
                        <TextArea value={formValues['bio']} onChange={e => handleInputChange('bio', e.target.value)}></TextArea>
                    </SystemComponent>
                </SystemComponent>
            </EditSettingsModal>
        </>
    );
}
export default EditProfileModal;