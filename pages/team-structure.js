import React, { useState, useEffect } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import PageTemplate from '../components/templates/PageTemplate';
import Card from '../components/atoms/Card';
import Input from "../components/atoms/Input";
import Header3 from '../components/atoms/Header3';
import MemberListGridTS from '../components/molecules/MemberListGridTS';

import theme from "../components/theme";

import { SystemComponent, SystemSpan } from '../components/atoms/SystemComponents';
import { HttpVerb, executeRequest, BASE_API } from '../data/api/baseApi';

import $ from "jquery";



// static data
const director_json = [
    {
        _id: 1,
        name: "Technical Director",
        leader: {
            _id: 1,
            name: {
                first: "Clive",
                last: "Chan"
            },
        }
    }
];

const subteam_json = [
    {
        _id: 1,
        name: "Electrical Lead", 
        leader: {
            _id: 2,
            name: {
                first: "Steven",
                last: "Xiong"
            }
        }
    },{
        _id: 2,
        name: "Software Lead", 
        leader: {
            _id: 3,
            name: {
                first: "Ken",
                last: "Livington"
            }
        }
    }
];

const subteam_project_relationships = [
    {
        _id: 1, // Electrical 
        projects: [
            {
                _id: 1,
                name: "Motor Control",
                leader: {
                    _id: 4,
                    name: {
                        first: "Jeff",
                        last: "Motor"
                    }
                }
            },{
                _id: 2,
                name: "Embedded Software",
                leader: {
                    _id: 5,
                    name: {
                        first: "Jenny",
                        last: "Ma"
                    }
                }
            },{
                _id: 3,
                name: "Batteries",
                leader: {
                    _id: 6,
                    name: {
                        first: "Jenny",
                        last: "Ma"
                    }
                }
            },{
                _id: 4,
                name: "Batteries",
                leader: {
                    _id: 7,
                    name: {
                        first: "Jenny",
                        last: "Ma"
                    }
                }
            }
        ]
    },{ // Software
        _id: 2,
        projects: [
            {
                _id: 1,
                name: "Team Hub",
                leader: {
                    _id: 8,
                    name: {
                        first: "Kevin",
                        last: "Bai"
                    }
                }
            },{
                _id: 2,
                name: "Embedded Software",
                leader: {
                    _id: 3,
                    name: {
                        first: "Ken",
                        last: "Livington"
                    }
                }
            },{
                _id: 3,
                name: "Website",
                leader: {
                    _id: 10,
                    name: {
                        first: "Jenny",
                        last: "Ma"
                    }
                }
            },{
                _id: 4,
                name: "POD Systems",
                leader: {
                    _id: 11,
                    name: {
                        first: "Jenny",
                        last: "Ma"
                    }
                }
            }
        ]
    }
]

const project_json = [
    {
        name: "Electrical Lead", 
        leader: {
            _id: 2,
            name: {
                first: "Steven",
                last: "Xiong"
            }
        }
    },{
        name: "Mechanical Lead", 
        leader: {
            _id: 3,
            name: {
                first: "Ken",
                last: "Livington"
            }
        }
    }
]

const HierSubSection = styled(SystemComponent)`
    overflow-x: hidden;
`;

const teamHierCustomTheme = {
    ...theme,
    breakpoints: ["810px","1090px"]
};

const TeamHierParentContainer = styled(Card)`
    border-radius: 0;
    overflow-x: hidden;
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

const RadioContainer = styled(SystemComponent)`
    input {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
    }

    input:checked ~ .radio-mock {
        background-color: #2196F3;
    }
`

// TODO: use this 
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
        label: "Project Head"
    },
    {
        id: 4,
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
    
    // TODO: incorporate redux later
    componentDidMount() {
        const request = {
            method: HttpVerb.POST,
            url: `${BASE_API}/members`
        };
        this.setState({members:  executeRequest(request)});
    }
    onClick = (e) => {
        //TODO: fill this in once React is incorporated
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
                                        <RadioContainer>
                                            <label>
                                                <input type="radio" name="filter-by" value="name" defaultChecked/>
                                                <CustomRadio className="radio-mock" onClick={this.onClick}><SystemSpan width="6px" height="6px" position="relative" bottom="4px" left="4px" display="inline-block" backgroundColor="#ffffff" borderRadius="4px"></SystemSpan></CustomRadio>
                                                <SystemSpan display="inline-block" ml={theme.space[4]}>Filter By Name</SystemSpan>
                                            </label>
                                        </RadioContainer>
                                        <RadioContainer>
                                            <label>
                                                <input type="radio" name="filter-by" value="role"/>
                                                <CustomRadio className="radio-mock" onClick={this.onClick}><SystemSpan width="6px" height="6px" position="relative" bottom="4px" left="4px" display="inline-block" backgroundColor="#ffffff" borderRadius="4px"></SystemSpan></CustomRadio>
                                                <SystemSpan display="inline-block" ml={theme.space[4]}>Filter By Role</SystemSpan>
                                            </label>
                                        </RadioContainer>
                                    </form>
                                </RadioFormContainer>
                                <SearchFormContainer>
                                    <form>
                                        <TeamHierSearchBar variant="text" placeholder="Search"/>
                                    </form>
                                </SearchFormContainer>
                            </FormWrapper>

                            <SystemComponent display="flex" flexDirection="column" overflowX="hidden">
                                
                                <HierSubSection>
                                    <Header3>Directors</Header3>
                                    <MemberListGridTS roleCards={director_json} onSelect={this.onSelectMember}></MemberListGridTS>
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
                            height: 100%;
                            border: 5px solid black;

                            display: flex;
                            overflow: hidden;
                        }
                    `}</style>
                </ThemeProvider>
                </React.Fragment>
            </PageTemplate>
        )
    };
};
export default TeamHierarchy;