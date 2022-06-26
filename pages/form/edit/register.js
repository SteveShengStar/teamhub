import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from 'styled-components';

import {useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PageTemplate from "../../../frontend/components/templates/PageTemplate";
import { SystemComponent } from "../../../frontend/components/atoms/SystemComponents";

import { useFormDetails } from '../../../frontend/store/api/forms';
import Section from "../../../frontend/components/organisms/formsection/Section";

const RegFormEditor = () => {
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const router = useRouter();
    const [formSections, setFormSections] = useState([
        {
            name: 'personalEmail',
            display: 'Personal Email Address',
            description: '',
            type: "email",
        },
        {
            name: 'termStatus',
            display: 'Which describes you best ?',
            options: ["Academic term, active on Waterloop in-person","Academic term, active on Waterloop remotely","Co-op term, working on Waterloop remotely","Co-op term, active on Waterloop in-person","Not active on Waterloop this term","Other"],
            type: "radio",
        },
        {
            name: 'previousTerms',
            display: 'Previous Terms I worked on Waterloop',
            options: ["F22","S22","W22"],
            type: "checkbox",
        }
    ]);

    useEffect(() => {
        useFormDetails('629c13c59d0c0a6b357b4e0f', dispatch, router)
            .then(res => {
                console.log("res.body");
                console.log(res.body);
            })
            .catch(e => console.error(e));
    })

    const onTypeChange = (sectionName, newType) => {
        const idx = formSections.findIndex(section => section.name === sectionName)
        if (idx === -1) {
            throw new Error("register.js: Could not find the appropriate form section by section name.");
        }
        console.log('sectionName')
        console.log(sectionName)
        console.log('newType')
        console.log(newType)

        const newFormSections = [...formSections];
        newFormSections[idx] = {
            ...newFormSections[idx],
            type: newType,
        };
        setFormSections(newFormSections);
    }

    return (
        <PageTemplate>
            <SystemComponent 
            display='grid'
                gridRowGap={theme.space[7]}
                overflow="auto"
            >
                {
                    formSections.map(section => 
                        <Section 
                            key={section.name}
                            name={section.name}
                            type={section.type} 
                            question={section.display} 
                            helpText={section.description} 
                            handleTypeChange={onTypeChange} 
                        />
                    )
                }
            </SystemComponent>
        </PageTemplate>
    );
}
export default RegFormEditor
