import React from 'react';
import styled from 'styled-components';
import PageTemplate from '../components/templates/PageTemplate';
import Card from '../components/atoms/Card';
import Input from "../components/atoms/Input";

import { SystemComponent } from '../components/atoms/SystemComponents';

import $ from "jquery";

const TeamHierParentContainer = styled(Card)`
    border-radius: 0;
    width: 100%;
`;

const SearchFormContainer = styled(SystemComponent)`
    width: 100%;
    margin-top: ${props => props.theme.space[4]}px;

    @media screen and (min-width: 810px) {
        width: 66.66%;
        margin-top: 0;
    }
    @media screen and (min-width: 1090px) {
        width: auto;
    }
`;

const RadioFormContainer = styled(SystemComponent)`
    width: 100%;

    @media screen and (min-width: 810px) {
        width: 33.33%;
    }
    @media screen and (min-width: 1090px) {
        width: 312px;
    }
`;

// This should be a molecule
// state : not owned --> the particular level we are at 
// previous and current selections ie) SW team, team hub
const TeamStructSideNav = styled(SystemComponent)`
    background-color: #FFFFFF;
    margin: ${props => props.theme.space[4]}px;
`;

const FormWrapper = styled(SystemComponent)`
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 810px) {
        flex-direction: row;
    }
`;

// static data
const selectionTiers = [
    {
        id: 1,
        label: "Directors"
    },
    {
        id: 2,
        label: "Team Leads"
    },
    {
        id: 3,
        label: "Subteam Leads"
    },
    {
        id: 4,
        label: "Project Head"
    },
    {
        id: 5,
        label: "Subordinates"
    },
];

class TeamHierarchy extends React.Component {

    onClick = (e) => {
        $(e.target).parent().find("input").checked = true;
    }

    render() {
        return (
            <PageTemplate title="Team Structure">
                <React.Fragment>
                    <div id="ts-container">
                        <SystemComponent 
                        width="337px"
                        height="100%"
                        bg="#D6D6D6"
                        >
                            <TeamStructSideNav></TeamStructSideNav>
                        </SystemComponent>
                        
                        <TeamHierParentContainer pl={28} pr={28}>
                            <FormWrapper display="flex">
                                <RadioFormContainer>
                                    <form>
                                        <div className="radio-container">
                                            <label>
                                                <input type="radio" name="filter-by" value="name" defaultChecked/>
                                                <span className="radio-mock" onClick={this.onClick}></span>
                                                Filter By Name
                                            </label>
                                        </div>
                                        <div className="radio-container">
                                            <label>
                                                <input type="radio" name="filter-by" value="role"/>
                                                <span className="radio-mock" onClick={this.onClick}></span>
                                                Filter By Role
                                            </label>
                                        </div>
                                    </form>
                                </RadioFormContainer>
                                <SearchFormContainer>
                                    <form>
                                        <Input variant="text" placeholder="Search" />
                                    </form>
                                </SearchFormContainer>
                            </FormWrapper>
                        </TeamHierParentContainer>
                    </div>
                    <style jsx>{`
                        * {
                            box-sizing: border-box;
                        }

                        #ts-container {
                            height: 700px;
                            border: 5px solid black;

                            display: flex;
                            flex-grow: 1;
                        }

                        .radio-container input {
                            position: absolute;
                            opacity: 0;
                            height: 0;
                            width: 0;
                        }

                        .radio-mock {
                            height: 12px;
                            width: 12px;
                            background-color: #ffffff;
                            border-radius: 50%;

                            display: inline-block;
                            margin-right: ${props => props.theme.space[4]};
                            cursor: pointer;
                        }

                        .radio-container input:checked ~ .radio-mock {
                            background-color: #2196F3;
                        }
                    `}</style>
                </React.Fragment>
            </PageTemplate>
        )
    };
};
export default TeamHierarchy;