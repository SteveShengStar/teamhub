import React, { useState, useEffect } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import PageTemplate from '../components/templates/PageTemplate';
import Card from '../components/atoms/Card';
import Header3 from '../components/atoms/Header3';
import TeamHierFormWrapper from '../components/molecules/TeamHierFormWrapper';
import SideNav from '../components/molecules/SideNav';
import GridListParentContainer from '../components/molecules/GridListParentContainer';

import theme from "../components/theme";

import { SystemComponent } from '../components/atoms/SystemComponents';

// TODO: Incorporate Redux and retrieve real data from backend
// TODO: Make this more similar to how the normalized data for index.js currently is
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

const selectionTiers = [
    {
        id: 1,
        label: "Directors",
        roleCards: director_json
    },
    {
        id: 2,
        label: "Team Leads",
        roleCards: subteam_json
    },
    {
        id: 3,
        label: "Project Head",
        roleCards: []
    },
    {
        id: 4,
        label: "Subordinates",
        roleCards: []
    },
];

const teamHierCustomTheme = {
    ...theme,
    breakpoints: ["810px","1090px", "1200px"]
};


// TODO: this component should own the "Selected Member" state field
const TeamHierParentContainer = styled(Card)`
    border-radius: 0;
    overflow-x: hidden;

    flex-grow: 1;
`;

const HierSubSection = styled(SystemComponent)`
    overflow: hidden;
    margin-bottom: ${props => props.theme.space[5]}px;
`;


const TeamHierarchy = () => {

    const [memberSelected, setMemberSelected] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState(undefined);
    const [selectedTierId, setSelectedTierId] = useState(1);
    const [selectedTeam, setSelectedTeam] = useState(undefined);

    useEffect(() => {
        selectionTiers[2].roleCards = selectedTeam ? subteam_project_relationships[selectedTeam - 1].projects : [];
    }, []);

    const onSelectMember = (cardId, tierId) => {
        // TODO: put a condition ??
        setSelectedTierId(tierId)
        setMemberSelected(true)
    
        if (tierId === 2) {
            const selectedSubTeamCard = subteam_json.filter(function(subTeamCard){return subTeamCard._id === cardId})[0]
            selectionTiers[2].roleCards = subteam_project_relationships[selectedSubTeamCard._id - 1].projects;
            
            setSelectedMemberId(selectedSubTeamCard._id)
            setSelectedTeam(selectedSubTeamCard._id)
        } else {
            selectionTiers[2].roleCards = []
            setSelectedMemberId(cardId)
            setSelectedTeam(undefined)
        }
    };

    return (
        <PageTemplate title="Team Structure">
            <>
            <ThemeProvider theme={teamHierCustomTheme}>
                <SystemComponent 
                    display="flex"
                    overflow="hidden"
                    height="100%"
                >
                    <SystemComponent 
                        width="240px"
                        height="100%"
                        bg="#D6D6D6"
                    >
                        <SideNav></SideNav>
                    </SystemComponent>
                    
                    <TeamHierParentContainer pl={28} pr={28}>
                        <TeamHierFormWrapper></TeamHierFormWrapper>
                            
                        <SystemComponent display="flex" flexDirection="column" overflowX="hidden">
                            
                            {
                                selectionTiers.map(tierData => (

                                    <HierSubSection key={tierData.id}>
                                        <Header3>{tierData.label}</Header3>
                                        <GridListParentContainer 
                                            tierId={tierData.id} 
                                            roleCards={tierData.roleCards} 
                                            onSelect={onSelectMember}></GridListParentContainer>
                                    </HierSubSection>
                                ))
                            }
                        </SystemComponent>

                    </TeamHierParentContainer>
                </SystemComponent>
                <style jsx>{`
                    * {
                        box-sizing: border-box;
                    }
                `}</style>
            </ThemeProvider>
            </>
        </PageTemplate>
    )
};
export default TeamHierarchy;