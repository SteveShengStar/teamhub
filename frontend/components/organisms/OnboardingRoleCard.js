import React, { useState } from "react";
import styled from "styled-components";
import Card from "../atoms/Card";
import Subtitle from "../atoms/Subtitle";
import { SystemComponent } from "../atoms/SystemComponents";
import Header4 from "../atoms/Header4";
import Select, { CreatableSelect } from "../atoms/Select";
import SubteamPicker from "../molecules/SubteamPicker";
import Button from "../atoms/Button";

const terms = {
    "F": "Fall",
    "S": "Spring",
    "W": "Winter"
}

export default ({
    selectedProjects, 
    selectedSubteams, 
    setSelectedProjects, 
    setSelectedSubteams,
    selectedYear, setSelectedYear,
    selectedRole, setSelectedRole,
    submit, subteamOptions, roleOptions
}) => {
    const options = ["F16", "W17", "S17", "F17", "W18", "S18", "F18", "W19", "S19", "F19", "W20", "S20"]
        .map(val => {
            const term = terms[val[0]];
            const year = '20' + val.slice(1);
            return {
                label: `${term} ${year}`, value: val
            }
        });
    return (
        <>
            <FormCard>
                <Subtitle>Tell us more about yourself</Subtitle>
                <div css={`display: grid; grid-template-rows: 1fr auto; height: calc(100% - 50px);`}>
                    <FlexColumn mt={3}>
                        <SystemComponent>
                            <FormTitleHeader>When did you join the team?</FormTitleHeader>
                            <Select 
                                options={options} 
                                onChange={val => setSelectedYear(val.value)}
                                value={{value: selectedYear, label: `${terms[selectedYear[0]]} 20${selectedYear.slice(1)}`}}
                            />
                        </SystemComponent>
                            

                        <SystemComponent>
                            <FormTitleHeader>What's your main role?</FormTitleHeader>
                            <Select 
                                value={{value: selectedRole.value, label: selectedRole.label}}
                                onChange={val => setSelectedRole(val)}
                                options={roleOptions.map(val => ({value: val._id, label: val.name}))}
                            />
                        </SystemComponent>

                        <SystemComponent>
                            <FormTitleHeader>What subteam are you on?</FormTitleHeader>
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
                                onChange={items => {
                                    const difference = items ? items.filter(item => !selectedProjects.find(proj => proj[0] == item.value)).map(item => [item.value, []]) : [];
                                    const intersection = selectedProjects.filter(project => items && items.find(it => it.value == project[0]))
                                    setSelectedProjects([...intersection, ...difference])
                                }}
                                value={selectedProjects.map(item => ({value: item[0], label: item[0]}))}
                            />
                        </SystemComponent>
                        
                        {
                            selectedProjects.map((project, i) => {
                                return (
                                    <SystemComponent key={i}>
                                        <FormTitleHeader>What do you do on {project[0]}?</FormTitleHeader>
                                        <CreatableSelect 
                                            isMulti
                                            onChange={value => {
                                                setSelectedProjects(selectedProjects.map((proj, index) => {
                                                    if (i == index) return [proj[0], value ? value.map(val => val.label) : []];
                                                    return proj;
                                                }))
                                            }}
                                            value={selectedProjects[i][1].map(val => ({value: val, label: val}))}
                                        />
                                    </SystemComponent>
                                )
                            })
                        }
                    </FlexColumn>
                    <ContinueButton onClick={submit}>Continue</ContinueButton>
                </div>
            </FormCard>
        </>
    )
}

const FormTitleHeader = styled(Header4)`
    margin: 25px 0 3px 0;
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
        overflow: scroll;
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
