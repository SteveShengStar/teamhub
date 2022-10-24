import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PageTemplate from '../../../frontend/components/templates/PageTemplate';
import { SystemComponent } from '../../../frontend/components/atoms/SystemComponents';

import useLoadingScreen from '../../../frontend/hooks/useLoadingScreen';
import {
    useFormDetails,
    updateFormDetails,
} from '../../../frontend/hooks/forms';
import Section from '../../../frontend/components/organisms/formsection/Section';
import Button from '../../../frontend/components/atoms/Button';
import ActionButton from '../../../frontend/components/atoms/Form/ActionButton';

const SaveButton = styled(ActionButton)`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
`;

const CancelButton = styled(ActionButton)`
    background-color: ${(props) => props.theme.colors.greys[1]};
    color: ${(props) => props.theme.colors.black};
`;

// import {validateCorrectNumberOfOptions} from '../../../util/validate';

const validateCorrectNumberOfOptions = (sections) => {
    return sections.every((s) => {
        switch (s.type) {
            case 'checkbox':
            case 'radio':
            case 'menu_single':
            case 'menu_multi':
                return s.options && s.options.length > 1;
        }
        return true;
    });
};

const Container = styled(SystemComponent)`
    display: flex;
    flex-direction: column;
    overflow: auto;
    position: relative;

    ${Section}:last-child {
        margin-bottom: 0;
    }
`;

const SidebarContainer = styled(SystemComponent)`
    position: fixed;
    display: grid;
    grid-auto-rows: 60px;
    grid-template-columns: 60px;
    top: 250px;
    right: 0;

    z-index: 100;
`;

const SidebarButtonIcon = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const SidebarButtonText = styled(SystemComponent)`
    overflow: hidden;
    position: absolute;
    right: 55px;
    top: 0;
    width: 0;
    white-space: nowrap;
    background-color: ${(props) => props.theme.colors.black};
    height: 60px;
    line-height: 60px;
    font-size: ${(props) => props.theme.fontSizes.header3}pt;
    color: ${(props) => props.theme.colors.white};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

    -webkit-transition: width 0.2s ease-in-out;
    -moz-transition: width 0.2s ease-in-out;
    -o-transition: width 0.2s ease-in-out;
    transition: width 0.2s ease-in-out;
`;

const SidebarButton = styled(Button)`
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    cursor: ${(props) => (props.disabled ? `default` : `pointer`)};

    &:hover {
        transform: scale(
            1
        ); /* override the default behaviour of expanding the button */
    }
    &:hover ${SidebarButtonText} {
        width: ${(props) =>
            props.disabled
                ? `0`
                : `185px`}; /* do not pop out the text when button is disabled */
    }
`;

const Sidebar = ({ data }) => {
    return (
        <SidebarContainer>
            {data.map((opt, i) => (
                <SidebarButton
                    key={i}
                    variant='neutral'
                    onClick={(e) => opt.callback(e)}
                    disabled={opt.disabled}
                >
                    <SystemComponent mt='auto' mb='auto'>
                        <SidebarButtonIcon
                            src={'/static/' + opt.iconFileName}
                        />
                    </SystemComponent>
                    <SidebarButtonText>{opt.label}</SidebarButtonText>
                </SidebarButton>
            ))}
        </SidebarContainer>
    );
};

const ButtonRow = ({ saveDisabled, handleSave, handleCancel }) => {
    const theme = useContext(ThemeContext);

    return (
        <SystemComponent
            id='submitSection'
            display='flex'
            justifyContent='center'
        >
            <SaveButton
                mr={theme.space[2]}
                onClick={(e) => handleSave(e)}
                disabled={saveDisabled}
            >
                Save
            </SaveButton>
            <CancelButton onClick={(e) => handleCancel(e)}>Cancel</CancelButton>
        </SystemComponent>
    );
};

const handleExit = (e, router) => {
    e.preventDefault();
    router.push('/form/admin/');
};

const FormEditor = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loader, showLoader, hideLoader] = useLoadingScreen(false);
    const [fromTitle, setFormTitle] = useState('');
    const [fromDescription, setFormDescription] = useState('');
    const [formSections, setFormSections] = useState([]);

    const loadFormSections = () => {
        showLoader();
        useFormDetails(router.query.formName, dispatch, router)
            .then((res) => {
                if (res.success) {
                    setFormTitle(res.body.title);
                    setFormDescription(res.body.description);
                    setFormSections(
                        res.body.sections
                            .map((obj) => {
                                const sectionDetails = obj.section;
                                return {
                                    ...obj,
                                    section: undefined,
                                    ...sectionDetails,
                                };
                            })
                            .sort((a, b) => a.position - b.position)
                    );
                } else {
                    alert(
                        'An error occurred when loading form sections !' + res
                    );
                    // TODO: handle error more appropriately
                }
            })
            .catch((e) => {
                console.error(e);
                throw e;
            })
            .finally(() => {
                hideLoader();
            });
    };

    useEffect(() => {
        loadFormSections();
    }, []);

    const onTypeChange = (sectionName, newType) => {
        const idx = formSections.findIndex(
            (section) => section.name === sectionName
        );
        if (idx === -1) {
            throw new Error(
                router.asPath +
                    ': Could not find the appropriate form section by section name.'
            );
        }

        const newFormSections = [...formSections];
        newFormSections[idx] = {
            ...newFormSections[idx],
            type: newType,
        };
        setFormSections(newFormSections);
    };

    const onInputChange = (sectionName, inputFieldName, newValue) => {
        const idx = formSections.findIndex(
            (section) => section.name === sectionName
        );
        if (idx === -1) {
            throw new Error(
                router.asPath +
                    ': Could not find the appropriate form section by section name.'
            );
        }

        const newFormSections = [...formSections];
        newFormSections[idx] = {
            ...newFormSections[idx],
            [inputFieldName]: newValue,
        };
        setFormSections(newFormSections);
    };

    const onOptionChange = (sectionName, optionIdx, newValue) => {
        const idx = formSections.findIndex(
            (section) => section.name === sectionName
        );
        if (idx === -1) {
            throw new Error(
                router.asPath +
                    ': Could not find the appropriate form section by section name.'
            );
        }

        const newFormSections = [...formSections];
        newFormSections[idx] = {
            ...newFormSections[idx],
            options: [
                ...newFormSections[idx].options.slice(0, optionIdx),
                newValue,
                ...newFormSections[idx].options.slice(
                    optionIdx + 1,
                    newFormSections[idx].options.length
                ),
            ],
        };
        setFormSections(newFormSections);
    };

    const onOptionAdd = (sectionName) => {
        const idx = formSections.findIndex(
            (section) => section.name === sectionName
        );
        if (idx === -1) {
            throw new Error(
                router.asPath +
                    ': Could not find the appropriate form section by section name.'
            );
        }

        const newFormSections = [...formSections];
        newFormSections[idx].options.push('');
        setFormSections(newFormSections);
    };

    const onOptionDelete = (sectionName, optionIdx) => {
        const idx = formSections.findIndex(
            (section) => section.name === sectionName
        );
        if (idx === -1) {
            throw new Error(
                router.asPath +
                    ': Could not find the appropriate form section by section name.'
            );
        }

        const newFormSections = [...formSections];
        newFormSections[idx].options.splice(optionIdx, 1);
        setFormSections(newFormSections);
    };

    const onSectionDelete = (sectionName) => {
        const idx = formSections.findIndex(
            (section) => section.name === sectionName
        );
        if (idx === -1) {
            throw new Error(
                router.asPath +
                    ': Could not find the appropriate form section by section name.'
            );
        }

        const newFormSections = [...formSections];
        newFormSections.splice(idx, 1);
        setFormSections(newFormSections);
    };

    const onSectionAdd = (e) => {
        e.preventDefault();
        const newSection = {
            name: uuidv4(),
            description: '',
            display: '',
            type: 'text',
            customizable: 'delete',
            options: [],
        };
        setFormSections([...formSections, newSection]);

        const element = document.getElementById('submitSection');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'center',
            });
        }
    };

    const onSectionDuplicate = (sectionName) => {
        const idx = formSections.findIndex(
            (section) => section.name === sectionName
        );
        if (idx === -1) {
            throw new Error(
                router.asPath +
                    ': Could not find the appropriate form section by section name.'
            );
        }

        const newSection = {
            ...formSections[idx],
            customizable: 'delete',
            name: uuidv4(),
        };
        const newFormSections = [...formSections];
        newFormSections.splice(idx + 1, 0, newSection);
        setFormSections(newFormSections);
    };

    const onToggleRequired = (sectionName, newRequiredState) => {
        const idx = formSections.findIndex(
            (section) => section.name === sectionName
        );
        if (idx === -1) {
            throw new Error(
                router.asPath +
                    ': Could not find the appropriate form section by section name.'
            );
        }

        const newFormSections = [...formSections];
        newFormSections[idx].required = newRequiredState;
        setFormSections(newFormSections);
    };

    const validateFormSections = () => {
        if (!formSections || formSections.length === 0) {
            alert('Please + Add at least 1 section before saving.');
            return false;
        }
        if (
            formSections.some((s) => !s.name) ||
            formSections.some((s) => !s.display)
        ) {
            alert(
                'You must fill in the "Question" part of every section. Right now, one of them is blank.'
            );
            return false;
        }
        if (!validateCorrectNumberOfOptions(formSections)) {
            alert(
                'One of the Multiple Choice or Dropdown Menu sections has less than 2 options. Please add more options before saving.'
            );
            return false;
        }
        return true;
    };

    const handleSave = (e, exitEditorView = false) => {
        e.preventDefault();
        if (!validateFormSections()) {
            return;
        }

        const reqBody = {
            title: fromTitle,
            description: fromDescription,
            sections: formSections.map((s, i) => {
                return {
                    ...s,
                    position: i,
                };
            }),
        };

        console.log('Saving form sections ...');
        showLoader();
        updateFormDetails(router.query.formName, dispatch, router, reqBody)
            .then((res) => {
                if (!res.success) {
                    // TODO: handle error case
                    console.error(
                        'Error occurred when updating form sections.'
                    );
                    return;
                }

                if (exitEditorView) {
                    hideLoader();
                    router.push('/form/admin/');
                    return;
                }

                loadFormSections();
                console.log('Finished loading form sections.');
            })
            .catch((e) => {
                console.error(e);
                hideLoader();
                throw new Error(
                    'An Error occurred when saving the form sections' + e
                );
            });
    };

    return (
        <PageTemplate>
            <Container>
                {loader}
                <Sidebar
                    data={[
                        {
                            label: 'Add Question',
                            iconFileName: 'plus-solid.png',
                            callback: onSectionAdd,
                            disabled: loader,
                        },
                        {
                            label: 'Save',
                            iconFileName: 'floppy-disk-solid.png',
                            callback: handleSave,
                            disabled: loader,
                        },
                        {
                            label: 'Exit',
                            iconFileName: 'backward-solid.png',
                            callback: (e) => handleExit(e, router),
                            disabled: false,
                        },
                    ]}
                />
                {formSections.map((section) => (
                    <Section
                        key={section.name}
                        name={section.name}
                        type={section.type}
                        question={section.display}
                        helpText={section.description}
                        options={section.options}
                        required={section.required}
                        canDelete={section.customizable === 'delete'}
                        handleTypeChange={onTypeChange}
                        handleInputChange={onInputChange}
                        handleOptionChange={onOptionChange}
                        handleOptionAdd={onOptionAdd}
                        handleOptionDelete={onOptionDelete}
                        handleSectionDelete={onSectionDelete}
                        handleSectionDuplicate={onSectionDuplicate}
                        handleToggleRequired={onToggleRequired}
                    />
                ))}
                <ButtonRow
                    saveDisabled={loader}
                    handleSave={(e) => handleSave(e, true)}
                    handleCancel={(e) => handleExit(e, router)}
                />
            </Container>
        </PageTemplate>
    );
};
export default FormEditor;
