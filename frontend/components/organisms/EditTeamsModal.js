import {useState} from 'react';
import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';
import TextArea from '../atoms/TextArea';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import ToggleListItem from '../atoms/ToggleListItem';
import {filter} from 'lodash';

// TODO: make this an atom. It's used by many modals.
const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

// Subteam ID to String Mapping
const subteamMapping = {
    0: "software",
    1: "electrical",
    2: "mechanical",
    3: "executive",
    4: "infrastructure",
    5: "admin"
};
const subteamThemeMapping = {
    0: "software",
    1: "electrical",
    2: "mechanical",
    3: "exec",
    4: "infrastructure",
    5: "admin"
};

// The top-level component needs to know which are selected in order to sort the selected ones to the front
// selected should be a state owned by the parent

// go through only selected subteams first
const EditTeamsModal = () => {
    const [selectedSubteams, setSelectedSubteams] = useState([0, 1]);
    
    let nonMemberSubteams = filter(Object.keys(subteamMapping), 
        subteamId => selectedSubteams.includes(parseInt(subteamId, 10)) === false
    );
    nonMemberSubteams = nonMemberSubteams.map(subteamId => parseInt(subteamId, 10));

    return (
        <>
            <SystemComponent display="grid" 
                gridTemplateColumns="100%"
                gridAutoRows='minmax(70px, auto)'
            >
                <SystemComponent>
                    <Header5>Which Subteams are you in ?</Header5>
                    <SystemComponent display='grid' 
                        gridTemplateColumns='1fr 1fr'
                        gridRowGap={10}
                    >
                        {
                            selectedSubteams.map((subteam, i) => 
                                <SystemComponent 
                                    key={subteam}   
                                    gridRow={(i+1).toString().concat(' / span 1')}
                                    gridColumn="1 / 2"
                                >
                                    <ToggleListItem 
                                        id={subteam}
                                        variant={subteamThemeMapping[subteam]}
                                        selected={true}
                                        onSelect={(subteamId) => {
                                            setSelectedSubteams(
                                                filter(selectedSubteams, 
                                                    e => e != subteamId
                                                )
                                            );
                                        }}
                                    >
                                        {subteamMapping[subteam]}
                                    </ToggleListItem>
                                </SystemComponent>
                            )
                        }
                        {
                            nonMemberSubteams.map((subteam, i) => 
                                <SystemComponent 
                                    key={subteam}  
                                    gridRow={(i+1).toString().concat(' / span 1')}
                                    gridColumn="2 / 3"
                                >
                                    <ToggleListItem 
                                        id={subteam}
                                        variant="cancel"
                                        selected={false}
                                        onSelect={(subteamId) => {
                                            setSelectedSubteams(selectedSubteams.concat(subteamId));
                                        }}
                                    >
                                        {subteamMapping[subteam]}
                                    </ToggleListItem>
                                </SystemComponent>
                            )
                        }
                    </SystemComponent>
                </SystemComponent>  
                <SystemComponent>
                    <Header5>What Projects are you Working on ?</Header5>   
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
                <SystemComponent>
                    <Header5>What do you do on Waterloop ?</Header5>  
                    <TextArea/>
                </SystemComponent>
            </SystemComponent>            
        </>
    );
}
export default EditTeamsModal;