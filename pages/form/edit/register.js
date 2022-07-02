import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import {useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PageTemplate from "../../../frontend/components/templates/PageTemplate";
import { SystemComponent } from "../../../frontend/components/atoms/SystemComponents";

import useLoadingScreen from '../../../frontend/hooks/useLoadingScreen';
import { useFormDetails } from '../../../frontend/hooks/forms';
import Section from "../../../frontend/components/organisms/formsection/Section";
import Button from '../../../frontend/components/atoms/Button';

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
    position: absolute;
    display: grid;
    grid-auto-rows: 60px;
    grid-template-columns: 60px;
    top: 0;
    right: 0;

    z-index: 100;
`;

const SidebarButtonIcon = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const SidebarButtonText = styled(SystemComponent)`
    overflow: hidden;
`;

const SidebarButton = styled(Button)`
    display: flex;
    right: 0;
    flex-direction: row-reverse;
    font-size: 1rem;

    -webkit-transition: width 0.2s ease-in-out;
    -moz-transition: width 0.2s ease-in-out;
    -o-transition: width 0.2s ease-in-out;
    transition: width 0.2s ease-in-out;

    &:hover {
        width: 170px;
    }
`;

const Sidebar = ({options}) => {
    console.log(options)
    return (
        <SidebarContainer>
            {
                options.map((opt, i) => (
                    <SidebarButton key={i} variant='neutral'>
                        <SidebarButtonText>
                            {opt.label}
                        </SidebarButtonText>
                        <SystemComponent mt="auto" mb="auto">
                            <SidebarButtonIcon src={'/static/' + opt.iconFileName}/>
                        </SystemComponent>
                    </SidebarButton>
                ))
            }
        </SidebarContainer>
    );
}


const RegFormEditor = () => {
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const router = useRouter();
    const [loader, showLoader, hideLoader] = useLoadingScreen(true);
    const [formSections, setFormSections] = useState([]);

    useEffect(() => {
        useFormDetails('629c13c59d0c0a6b357b4e0f', dispatch, router)
            .then(res => {
                setFormSections(
                    res.body.sections.map(obj => {
                        const sectionDetails = obj.section;
                        return {
                            ...obj,
                            section: undefined,
                            ...sectionDetails
                        }
                    }).sort(
                        (a, b) => a.position - b.position
                    )
                );
            })
            .catch(e => console.error(e))
            .finally(() => {
                hideLoader();
            });
    }, [])

    const onTypeChange = (sectionName, newType) => {
        const idx = formSections.findIndex(section => section.name === sectionName)
        if (idx === -1) {
            throw new Error("register.js: Could not find the appropriate form section by section name.");
        }

        const newFormSections = [...formSections];
        newFormSections[idx] = {
            ...newFormSections[idx],
            type: newType,
        };
        setFormSections(newFormSections);
    }

    const onInputChange = (sectionName, inputFieldName, newValue) => {
        const idx = formSections.findIndex(section => section.name === sectionName)
        if (idx === -1) {
            throw new Error("register.js: Could not find the appropriate form section by section name.");
        }

        const newFormSections = [...formSections];
        newFormSections[idx] = {
            ...newFormSections[idx],
            [inputFieldName]: newValue,
        };
        setFormSections(newFormSections);
    }

    const onOptionChange = (sectionName, optionIdx, newValue) => {
        const idx = formSections.findIndex(section => section.name === sectionName)
        if (idx === -1) {
            throw new Error("register.js: Could not find the appropriate form section by section name.");
        }

        const newFormSections = [...formSections];
        newFormSections[idx] = {
            ...newFormSections[idx],
            options: 
                [
                    ...newFormSections[idx].options.slice(0, optionIdx), 
                    newValue, 
                    ...newFormSections[idx].options.slice(optionIdx + 1, newFormSections[idx].options.length)
                ],
        };
        setFormSections(newFormSections);
    }

    const onOptionAdd = (sectionName) => {
        const idx = formSections.findIndex(section => section.name === sectionName)
        if (idx === -1) {
            throw new Error("register.js: Could not find the appropriate form section by section name.");
        }

        const newFormSections = [...formSections];
        newFormSections[idx].options.push('');
        setFormSections(newFormSections);
    }

    const onOptionDelete = (sectionName, optionIdx) => {
        const idx = formSections.findIndex(section => section.name === sectionName)
        if (idx === -1) {
            throw new Error("register.js: Could not find the appropriate form section by section name.");
        }

        const newFormSections = [...formSections];
        newFormSections[idx].options.splice(optionIdx, 1);
        setFormSections(newFormSections);
    }

    const onSectionDelete = (sectionName) => {
        const idx = formSections.findIndex(section => section.name === sectionName)
        if (idx === -1) {
            throw new Error("register.js: Could not find the appropriate form section by section name.");
        }

        const newFormSections = [...formSections];
        newFormSections.splice(idx, 1);
        setFormSections(newFormSections);
    }

    const onSectionDuplicate = (sectionName) => {
        const idx = formSections.findIndex(section => section.name === sectionName)
        if (idx === -1) {
            throw new Error("register.js: Could not find the appropriate form section by section name.");
        }

        const newSection = {
            ...formSections[idx],
            name: uuidv4(),
        }
        setFormSections([
            ...formSections,
            newSection
        ]);
    }

    return (
        <PageTemplate>
            <Container>
                {loader}
                <Sidebar options={[{label: "Save", iconFileName: 'floppy-disk-solid.png'}, {label: "Add Question", iconFileName: 'plus-solid.png'}]}/>
                {
                    formSections.map(section => 
                        <Section 
                            key={section.name}
                            name={section.name}
                            type={section.type} 
                            question={section.display} 
                            helpText={section.description} 
                            options={section.options}
                            canDelete={section.customizable === 'delete'}
                            handleTypeChange={onTypeChange}
                            handleInputChange={onInputChange}
                            handleOptionChange={onOptionChange}
                            handleOptionAdd={onOptionAdd}
                            handleOptionDelete={onOptionDelete}
                            handleSectionDelete={onSectionDelete}
                            handleSectionDuplicate={onSectionDuplicate}
                        />
                    )
                }
            </Container>
        </PageTemplate>
    );
}
export default RegFormEditor
