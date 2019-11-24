import React, { useState, useEffect } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import PageTemplate from '../components/templates/PageTemplate';
import Card from '../components/atoms/Card';
import Input from "../components/atoms/Input";
import Header3 from '../components/atoms/Header3';
import MemberListGridTS from '../components/molecules/MemberListGridTS';
import NextButtonTS from '../components/atoms/NextButtonTS';

import theme from "../components/theme";

import { SystemComponent, SystemSpan } from '../components/atoms/SystemComponents';

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
            },{
                _id: 5,
                name: "Team 1",
                leader: {
                    _id: 21,
                    name: {
                        first: "Jeff",
                        last: "Motor"
                    }
                }
            },{
                _id: 6,
                name: "Team 2",
                leader: {
                    _id: 22,
                    name: {
                        first: "Jenny",
                        last: "Ma"
                    }
                }
            },{
                _id: 7,
                name: "Team 3",
                leader: {
                    _id: 23,
                    name: {
                        first: "Jenny",
                        last: "Ma"
                    }
                }
            },{
                _id: 8,
                name: "Team 4",
                leader: {
                    _id: 24,
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
    margin-bottom: ${props => props.theme.space[5]}px;
`;

const teamHierCustomTheme = {
    ...theme,
    breakpoints: ["810px","1090px"]
};

// TODO: this component should own the "Selected Member state field"
const TeamHierParentContainer = styled(Card)`
    border-radius: 0;
    overflow-x: hidden;
`;

const SearchFormContainer = styled(SystemComponent)`
    width: 100%;
    margin-top: ${props => props.theme.space[4]}px;

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
    margin: ${props => props.theme.space[4]}px;
`;

const FormWrapper = styled(SystemComponent)`
    display: flex;
    flex-direction: column;
    margin: ${props => props.theme.space[2]}px 0 ${props => props.theme.space[5]}px;

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
    margin-right: ${props => props.theme.space[4]};
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

class GridListParentContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: 0
        }
    }

    render() {
        const {selectedTeam, tierId, roleCards, onSelect} = this.props;
        if (selectedTeam !== undefined) {
            return(
                <React.Fragment>
                    <MemberListGridTS 
                        tierId={tierId}
                        roleCards={roleCards} 
                        currentPage={this.state.page}
                        onSelect={(cardId, tierId) => onSelect(cardId, tierId)}>
                    </MemberListGridTS>
                    <NextButtonTS onClick={() => this.setState({page: this.state.page + 1})}></NextButtonTS>
                </React.Fragment>
            )
        } else{
            return(<React.Fragment></React.Fragment>)
        }
    }
}


class TeamHierarchy extends React.Component {

    constructor(props){
        super(props)
        // NOTE: selectedMemberId -- each tier's card has a unique id
        // selectedTier -- each tier has a unique ID
        this.state = {
            memberSelected: false,
            selectedMemberId: undefined,
            selectedTierId: 1,
            selectedTeam: undefined,
        };
    }
    
    onRadioClick = (e) => {
        //TODO: fill this in once React is incorporated
    }

    onSelectMember = (cardId, tierId) => {
        // TODO: put a condition ??
        if (tierId === 2) {
            const selectedSubTeamCard = subteam_json.filter(function(subTeamCard){return subTeamCard._id === cardId})[0]
            //console.log(selectedSubTeamCard); 
            this.setState({
                selectedTierId: tierId, 
                selectedMemberId: selectedSubTeamCard._id, 
                memberSelected: true, 
                selectedTeam: selectedSubTeamCard._id
            })
        } else {
            this.setState({
                selectedTierId: tierId, 
                selectedMemberId: cardId, 
                memberSelected: true, 
                selectedTeam: undefined
            })
        }
    }

    render() {
        //console.log("Selected tier ", this.state.selectedTierId)
        //console.log("selectedMemberId ", this.state.selectedMemberId)
        //console.log("Selected Team ", this.state.selectedTeam)
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
                                                <CustomRadio className="radio-mock" onClick={this.onRadioClick}><SystemSpan width="6px" height="6px" position="relative" bottom="4px" left="4px" display="inline-block" backgroundColor="#ffffff" borderRadius="4px"></SystemSpan></CustomRadio>
                                                <SystemSpan display="inline-block" ml={theme.space[4]}>Filter By Name</SystemSpan>
                                            </label>
                                        </RadioContainer>
                                        <RadioContainer>
                                            <label>
                                                <input type="radio" name="filter-by" value="role"/>
                                                <CustomRadio className="radio-mock" onClick={this.onRadioClick}><SystemSpan width="6px" height="6px" position="relative" bottom="4px" left="4px" display="inline-block" backgroundColor="#ffffff" borderRadius="4px"></SystemSpan></CustomRadio>
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
                                    <MemberListGridTS tierId={1} roleCards={director_json} onSelect={this.onSelectMember}></MemberListGridTS>
                                </HierSubSection>

                                <HierSubSection>
                                    <Header3>Team Leads</Header3>
                                    <MemberListGridTS tierId={2} roleCards={subteam_json} onSelect={this.onSelectMember}></MemberListGridTS>
                                </HierSubSection>

                                <HierSubSection>
                                    <Header3>Project Heads</Header3>
                                    <GridListParentContainer 
                                        selectedTeam={this.state.selectedTeam}
                                        tierId={3}
                                        roleCards={this.state.selectedTeam && subteam_project_relationships[this.state.selectedTeam - 1].projects} 
                                        onSelect={this.onSelectMember}
                                    >
                                    </GridListParentContainer>
                                </HierSubSection>

                                <HierSubSection>
                                    <Header3>Subordinates</Header3>
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