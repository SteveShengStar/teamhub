import styled from 'styled-components';
import { SystemComponent } from '../atoms/SystemComponents';
import TextArea from '../atoms/TextArea';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeDuplicates } from '../../util';
import { useRouter } from 'next/router';
import EditSettingsModal from '../molecules/EditSettingsModal';
import SettingsInputPair from '../molecules/AccountSettings/SettingsInputPair';
import MultiSelectInput from '../molecules/MultiSelectInput';
import { getFilters } from '../../store/reducers/membersReducer';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import { updateProfileInfo, UserTypes } from '../../store/reducers/userReducer';
import useLoadingScreen from '../../hooks/useLoadingScreen';

import { isEmpty, capitalize } from 'lodash';
import theme from '../theme';

export const PROGRAM_OPTS = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'computer science', label: 'Computer Science' },
    { value: 'math', label: 'Math' },
];

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

const InputSegment = ({
    label,
    name,
    placeholder,
    value,
    handleChange,
    error = false,
    errorText = '',
}) => {
    return (
        <>
            <Header5>{label}</Header5>
            <CustomInput
                name={name}
                placeholder={placeholder}
                variant='text'
                value={value}
                onChange={(evt) => handleChange(name, evt.target.value)}
            />
            {error && (
                <SystemComponent color={theme.colors.alertAction}>
                    {errorText}
                </SystemComponent>
            )}
        </>
    );
};

const SelectSegment = ({
    title,
    name,
    handleChange,
    value,
    options,
    allowCustomInput = false,
    error = false,
    errorText = '',
    helpMessage,
}) => {
    const handleOptChange = (title, val) => {
        handleChange(name, val);
    };

    return (
        <SystemComponent>
            <SettingsInputPair
                title={title}
                value={value}
                options={options}
                onChange={handleOptChange}
                isMulti={false}
                allowCustomInput={allowCustomInput}
                helpMessage={helpMessage}
            />
            {error && (
                <SystemComponent color={theme.colors.alertAction}>
                    {errorText}
                </SystemComponent>
            )}
        </SystemComponent>
    );
};

const validProgramPattern = /^[A-Za-z,'-\s]*$/;
const EditProfileModal = ({ handleCloseModal, visible }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, hydrated } = useSelector((state) => state.userState);
    const { filters } = useSelector((state) => state.membersState);
    const { interests: interestOpts, skills: skillOpts } = filters;

    const [formValues, setFormValues] = useState({
        firstName: !isEmpty(user.name) ? user.name.first : '',
        lastName: !isEmpty(user.name) ? user.name.last : '',
        program: PROGRAM_OPTS.find((opt) => opt.value === user.program)
            ? {
                  label: PROGRAM_OPTS.find((opt) => opt.value === user.program)
                      .label,
                  value: user.program,
              }
            : { label: '', value: '' },
        bio: user.bio,
    });
    const [interests, setInterests] = useState(
        user.interests ? user.interests.map((i) => i.name) : []
    );
    const [skills, setSkills] = useState(
        user.skills ? user.skills.map((s) => s.name) : []
    );
    const [hasError, setHasError] = useState({
        firstName: false,
        program: false,
    });

    const [loader, showLoader, hideLoader] = useLoadingScreen(false);

    useEffect(() => {
        if (hydrated && isEmpty(filters)) {
            getFilters(dispatch, router);
        }
    }, [hydrated]);

    useEffect(() => {
        setFormValues({
            ...formValues,
            firstName: !isEmpty(user.name) ? user.name.first : '',
            lastName: !isEmpty(user.name) ? user.name.last : '',
            program: PROGRAM_OPTS.find((opt) => opt.value === user.program)
                ? {
                      label: PROGRAM_OPTS.find(
                          (opt) => opt.value == user.program
                      ).label,
                      value: user.program,
                  }
                : { label: '', value: '' },
            bio: user.bio ? user.bio : '',
        });

        setInterests(
            user.interests
                ? user.interests.map((i) => {
                      return {
                          label: capitalize(i.name),
                          value: i.name,
                      };
                  })
                : []
        );
        setSkills(
            user.skills
                ? user.skills.map((i) => {
                      return {
                          label: capitalize(i.name),
                          value: i.name,
                      };
                  })
                : []
        );

        setHasError({
            firstName: false,
            program: false,
        });
    }, []);

    const handleSave = () => {
        const updatedErrorList = { ...hasError };

        if (!formValues['firstName']) {
            updatedErrorList['firstName'] = true;
        }
        updatedErrorList['program'] =
            !formValues['program'].value ||
            !validProgramPattern.test(formValues['program'].value.trim());
        setHasError(updatedErrorList);

        if (!Object.values(updatedErrorList).includes(true)) {
            showLoader();
            updateProfileInfo(
                dispatch,
                {
                    name: {
                        first: formValues.firstName.trim(),
                        last: formValues.lastName.trim(),
                    },
                    program: formValues.program.value.trim(),
                    interests: removeDuplicates(interests.map((i) => i.value)),
                    skills: removeDuplicates(skills.map((i) => i.value)),
                    bio: formValues.bio.trim(),
                },
                user._id,
                router,
                false
            )
                .then((res) => {
                    if (res.success) {
                        dispatch({
                            type: UserTypes.UPDATE_INFO,
                            payload: res.body[0],
                        });
                    }
                    handleCloseModal();
                })
                .catch((err) => {
                    console.error(err);
                    alert(
                        'Save not successful. Please contact Waterloop Web Team for assistance.'
                    );
                })
                .finally(() => {
                    hideLoader();
                });
        }
    };

    const handleInputChange = (name, value) => {
        if (hasError[name]) {
            hasError[name] = false;
        }
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <>
            <EditSettingsModal
                visible={visible}
                title='Edit Profile Information'
                handleCloseModal={handleCloseModal}
                handleSave={handleSave}
            >
                <SystemComponent
                    display='grid'
                    gridTemplateColumns={['100%', 'repeat(2, 1fr)']}
                    gridColumnGap={[20, 30, 40]}
                    gridAutoRows='minmax(70px, auto)'
                >
                    <SystemComponent>
                        <InputSegment
                            label='First Name'
                            name='firstName'
                            placeholder='First Name'
                            value={formValues['firstName']}
                            handleChange={handleInputChange}
                            error={hasError['firstName']}
                            errorText='Please enter your First Name.'
                        />
                    </SystemComponent>
                    <SystemComponent>
                        <InputSegment
                            label='Last Name'
                            name='lastName'
                            placeholder='Last Name'
                            value={formValues['lastName']}
                            handleChange={handleInputChange}
                        />
                    </SystemComponent>
                    <SelectSegment
                        title='Academic Program'
                        name='program'
                        value={formValues['program']}
                        options={PROGRAM_OPTS}
                        handleChange={handleInputChange}
                        allowCustomInput={true}
                        error={hasError['program']}
                        errorText="Please enter valid Program Name. Special characters allowed are  - ' ,"
                        helpMessage='Type below to create a custom entry.'
                    />
                </SystemComponent>

                <SystemComponent
                    display='grid'
                    gridAutoRows='minmax(70px, auto)'
                >
                    <SystemComponent pb={4}>
                        <MultiSelectInput
                            title='Skills'
                            setSelectedItems={setSkills}
                            selectedItems={skills}
                            options={
                                skillOpts
                                    ? skillOpts.map((skill) => ({
                                          value: skill?.name?.toLowerCase(),
                                          label: skill.name,
                                      }))
                                    : []
                            }
                            helpMessage='Type below to create new/custom entries.'
                        />
                    </SystemComponent>
                    <SystemComponent pb={4}>
                        <MultiSelectInput
                            title='Interests'
                            setSelectedItems={setInterests}
                            selectedItems={interests}
                            options={
                                interestOpts
                                    ? interestOpts.map((interest) => ({
                                          value: interest?.name?.toLowerCase(),
                                          label: interest.name,
                                      }))
                                    : []
                            }
                            helpMessage='Type below to create new/custom entries.'
                        />
                    </SystemComponent>
                    <SystemComponent>
                        <Header5>Short Bio</Header5>
                        <TextArea
                            value={formValues['bio']}
                            onChange={(e) =>
                                handleInputChange('bio', e.target.value)
                            }
                        ></TextArea>
                    </SystemComponent>
                </SystemComponent>
                {loader}
            </EditSettingsModal>
        </>
    );
};
export default EditProfileModal;
