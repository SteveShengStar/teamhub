import React, { useState, useEffect } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import PageTemplate from '../components/templates/PageTemplate';
import Card from '../components/atoms/Card';
import Input from "../components/atoms/Input";
import Header3 from '../components/atoms/Header3';
import MemberListGrid from '../components/molecules/MemberListGrid';
import theme from "../components/theme";

import { SystemComponent, SystemSpan } from '../components/atoms/SystemComponents';

import $ from "jquery";

const members_json = 
    [{
        _id: 3,
        name: {
            first: "Steven",
            last: "Xiong"
        },
        subteam: {
            name: "Electrical"
        },
        memberType: {
            name: "Newbie"
        }
    },
    {
        _id: 2,
        name: {
            first: "Kevin",
            last: "Bai"
        },
        subteam: {
            name: "Electrical"
        },
        memberType: {
            name: "Classic"
        }
    }
];

const HierSubSection = styled(SystemComponent)`
`;

const teamHierCustomTheme = {
    ...theme,
    breakpoints: ["810px","1090px"]
};

const TeamHierParentContainer = styled(Card)`
    border-radius: 0;
    width: 100%;
`;

const SearchFormContainer = styled(SystemComponent)`
    width: 100%;
    margin-top: ${theme.space[4]}px;

    @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
        width: 66.66%;
        margin-top: 0;
    }
    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        width: auto;
    }
`;

const RadioFormContainer = styled(SystemComponent)`
    width: 100%;

    @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
        width: 33.33%;
    }
    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        width: 195px;
    }
`;

// This should be a molecule
// state : not owned --> the particular level we are at 
// previous and current selections ie) SW team, team hub
const TeamStructSideNav = styled(SystemComponent)`
    background-color: #FFFFFF;
    margin: ${theme.space[4]}px;
`;

const FormWrapper = styled(SystemComponent)`
    display: flex;
    flex-direction: column;

    @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
        flex-direction: row;
    }
`;

const CustomRadio = styled(SystemSpan)`
    height: 14px;
    width: 14px;
    background-color: #ffffff;
    border-radius: 50%;

    display: inline-block;
    margin-right: ${theme.space[4]};
    cursor: pointer;
}
`

const TeamHierSearchBar = styled(Input)`
    box-sizing: border-box;
    width: 100%;
    
    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        width: 465px;
    }
`

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

    constructor(props){
        super(props)
        this.state = {
            members: [],
            selectedMember: undefined
        };
    }

    /**
     * Refactor to use Redux later, for now, just fetch api directly here
     */
    componentDidMount() {
        fetch("/api/members").then((res) => res.json()).then(json => {
            if (json && json.success) {
                this.setState({members: json.body.slice(0, Math.min(6, json.body.length))});
            }
        });
    }

    onSelectMember = (id) => {
        let member = members.find(member => member._id === id);
        if (member){
            this.setState({selectedMember: member});
        } 
    }

    onClick = (e) => {
        //console.log($(e.target).parent().find("input"));
        $(e.target).parent().find("input").checked = true;
        $("radio-container .radio-mock").css("background-color", "#ffffff");
        $(e.target).css("background-color", "#2196F3");
    }

    render() {
        return (
            <PageTemplate title="Team Structure">
                <React.Fragment>
                <ThemeProvider theme={teamHierCustomTheme}>
                
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
                                                <CustomRadio className="radio-mock" onClick={this.onClick}><SystemSpan width="8px" height="8px" position="relative" top="3px" left="3px"></SystemSpan></CustomRadio>
                                                <SystemSpan display="inline-block" ml={theme.space[4]}>Filter By Name</SystemSpan>
                                            </label>
                                        </div>
                                        <div className="radio-container">
                                            <label>
                                                <input type="radio" name="filter-by" value="role"/>
                                                <CustomRadio className="radio-mock" onClick={this.onClick}><SystemSpan width="8px" height="8px" position="relative" top="3px" left="3px"></SystemSpan></CustomRadio>
                                                <SystemSpan display="inline-block" ml={theme.space[4]}>Filter By Role</SystemSpan>
                                            </label>
                                        </div>
                                    </form>
                                </RadioFormContainer>
                                <SearchFormContainer>
                                    <form>
                                        <TeamHierSearchBar variant="text" placeholder="Search"/>
                                    </form>
                                </SearchFormContainer>
                            </FormWrapper>

                            <SystemComponent display="flex" flexDirection="column">
                                
                                <HierSubSection>
                                    <Header3>Directors</Header3>
                                    <MemberListGrid members={this.state.members} onSelect={this.onSelectMember}></MemberListGrid>
                                </HierSubSection>

                                <HierSubSection>
                                    <Header3>Team Leads</Header3>
                                </HierSubSection>

                                <HierSubSection>
                                    <Header3>Subteam Leads</Header3>
                                </HierSubSection>

                                <HierSubSection>
                                    <Header3>Project Head</Header3>
                                </HierSubSection>

                                <HierSubSection>
                                    <Header3>Subordinates - Tier 1</Header3>
                                </HierSubSection>
                            </SystemComponent>

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
                    `}</style>
                </ThemeProvider>
                </React.Fragment>
            </PageTemplate>
        )
    };
};
export default TeamHierarchy;