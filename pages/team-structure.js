import React, { useState, useEffect } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import PageTemplate from '../components/templates/PageTemplate';
import Card from '../components/atoms/Card';
import TeamHierFormWrapper from '../components/molecules/TeamHierFormWrapper';
import Header3 from '../components/atoms/Header3';
import TeamHierMemberListGrid from '../components/molecules/TeamHierMemberListGrid';
import NextSetButton from '../components/atoms/NextSetButton';

import theme from "../components/theme";

import { SystemComponent } from '../components/atoms/SystemComponents';

// TODO: slowly move away from using static data
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

// TODO: use this later
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

const teamHierCustomTheme = {
    ...theme,
    breakpoints: ["810px","1090px", "1200px"]
};


// TODO: this component should own the "Selected Member state field"
const TeamHierParentContainer = styled(Card)`
    border-radius: 0;
    overflow-x: hidden;

    flex-grow: 1;
`;

const HierSubSection = styled(SystemComponent)`
    overflow: hidden;
    margin-bottom: ${props => props.theme.space[5]}px;
`;

// This should be a molecule
// state : not owned --> the particular level we are at 
// previous and current selections ie) SW team, team hub
const TeamStructSideNav = styled(SystemComponent)`
    background-color: #FFFFFF;
    margin: ${props => props.theme.space[4]}px;
`;

class GridListParentContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: 0
        }
    }

    onDeterminePage = (e) => {
        if ((this.state.page+1) * 4 >= this.props.roleCards.length) {
            this.setState({page: 0})
        } else {
            this.setState({page: this.state.page + 1})
        }
    }

    render() {
        const {selectedTeam, tierId, roleCards, onSelect} = this.props;
        if (selectedTeam !== undefined) {
            if (roleCards.length > 4){
                return(
                <SystemComponent position="relative">
                    <TeamHierMemberListGrid 
                        tierId={tierId}
                        roleCards={roleCards.slice(this.state.page * 4, Math.min( (this.state.page+1) * 4, roleCards.length))}
                        currentPage={this.state.page}
                        onSelect={(cardId, tierId) => onSelect(cardId, tierId)}>
                    </TeamHierMemberListGrid>
                    <NextSetButton onSelect={this.onDeterminePage}></NextSetButton>
                </SystemComponent>)
            } else {
                return(
                    <SystemComponent position="relative">
                        <TeamHierMemberListGrid 
                            tierId={tierId}
                            roleCards={roleCards} 
                            currentPage={this.state.page}
                            onSelect={(cardId, tierId) => onSelect(cardId, tierId)}>
                        </TeamHierMemberListGrid>
                    </SystemComponent>
                )
            }
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

    onSelectMember = (cardId, tierId) => {
        // TODO: put a condition ??
        if (tierId === 2) {
            const selectedSubTeamCard = subteam_json.filter(function(subTeamCard){return subTeamCard._id === cardId})[0]
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
        return (
            <PageTemplate title="Team Structure">
                <React.Fragment>
                <ThemeProvider theme={teamHierCustomTheme}>
                    <SystemComponent 
                        display="flex"
                        overflow="hidden"
                        height="100%"
                        border="3px solid black"
                    >
                        <SystemComponent 
                            width="240px"
                            height="100%"
                            bg="#D6D6D6"
                        >
                            <TeamStructSideNav></TeamStructSideNav>
                        </SystemComponent>
                        
                        <TeamHierParentContainer pl={28} pr={28}>
                            <TeamHierFormWrapper></TeamHierFormWrapper>
                                
                            <SystemComponent display="flex" flexDirection="column" overflowX="hidden">
                                
                                <HierSubSection>
                                    <Header3>Directors</Header3>
                                    <TeamHierMemberListGrid tierId={1} roleCards={director_json} onSelect={this.onSelectMember}></TeamHierMemberListGrid>
                                </HierSubSection>

                                <HierSubSection>
                                    <Header3>Team Leads</Header3>
                                    <TeamHierMemberListGrid tierId={2} roleCards={subteam_json} onSelect={this.onSelectMember}></TeamHierMemberListGrid>
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
                    </SystemComponent>
                    <style jsx>{`
                        * {
                            box-sizing: border-box;
                        }
                    `}</style>
                </ThemeProvider>
                </React.Fragment>
            </PageTemplate>
        )
    };
};
export default TeamHierarchy;