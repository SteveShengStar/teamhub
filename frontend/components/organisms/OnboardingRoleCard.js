import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../atoms/Card";
import Subtitle from "../atoms/Subtitle";
import { SystemComponent } from "../atoms/SystemComponents";
import Header4 from "../atoms/Header4";
import Select, { CreatableSelect } from "../atoms/Select";
import SubteamPicker from "../molecules/SubteamPicker";
import Button from "../atoms/Button";

const OnboardingRoleCard = ({
    selectedProjects,
    selectedSubteams,
    setSelectedProjects,
    setSelectedSubteams,
    selectedRole, setSelectedRole,
    submit, subteamOptions, roleOptions
}) => {
    const { projects } = useSelector(state => state.membersState.filters);
    return (
        <>
            <FormCard>
                <Subtitle>Tell us more about yourself</Subtitle>
                <div css={`display: grid; grid-template-rows: 1fr auto; height: calc(100% - 50px);`}>
                    <FlexColumn>
                        <SystemComponent>
                            <FormTitleHeader required>What's your main role?</FormTitleHeader>
                            <Select
                                value={{ value: selectedRole.value, label: selectedRole.label }}
                                onChange={val => setSelectedRole(val)}
                                options={roleOptions.map(val => ({ value: val._id, label: val.name }))}
                            />
                        </SystemComponent>

                        <SystemComponent>
                            <FormTitleHeader required>What subteam are you on?</FormTitleHeader>
                            <SubteamPicker
                                selected={selectedSubteams}
                                options={subteamOptions}
                                updateSelected={(i) => {
                                    setSelectedSubteams(
                                        selectedSubteams.find(index => index == i) != undefined ?
                                            selectedSubteams.filter(index => index != i)
                                            :
                                            [...selectedSubteams, i]
                                    )
                                }}
                            />
                        </SystemComponent>

                        <SystemComponent>
                            <FormTitleHeader>What project(s) are you working on?</FormTitleHeader>
                            <CreatableSelect
                                isMulti
                                options={projects ? projects.map(project => ({ value: project.name, label: project.name })) : []}
                                onChange={items => {
                                    const difference = items ? items.filter(item => !selectedProjects.find(proj => proj == item.value)).map(item => item.value) : [];
                                    const intersection = selectedProjects.filter(project => items && items.find(it => it.value == project))
                                    setSelectedProjects([...intersection, ...difference])
                                }}
                                value={selectedProjects.map(item => ({ value: item, label: item }))}
                            />
                        </SystemComponent>
                    </FlexColumn>
                    <ContinueButton onClick={submit}>Continue</ContinueButton>
                </div>
            </FormCard>
        </>
    )
}
export default OnboardingRoleCard;

const FormTitleHeader = styled(Header4)`
    margin: 25px 0 3px 0;

    ${props => props.required && 
        `&:after {
            content: \' *\';
        }`
    }
`

const FormCard = styled(Card)`
    position: relative;
    max-width: 800px;
    margin: 0 0 100px 0;
    min-height: 70vh;
    ${props => props.theme.mediaQueries.tablet} {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        max-width: 800px;
        min-height: 0;
        height: 70%;
        margin: 0;
    }
    
`

const FlexColumn = styled(SystemComponent)`
    display: flex;
    flex-direction: column;
    ${props => props.theme.mediaQueries.tablet} {
        padding: 0 0 20px 0;
    }
`

const ContinueButton = styled(Button)`
    display: none;
    ${props => props.theme.mediaQueries.tablet} {
        display: block;
        justify-self: end;
        position: relative;
    }
`
