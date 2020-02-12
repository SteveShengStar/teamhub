import {useState} from 'react';
import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';
import TextArea from '../atoms/TextArea';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import ToggleListItem from '../atoms/ToggleListItem';

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
}
const subteamThemeMapping = {
    0: "software",
    1: "electrical",
    2: "mechanical",
    3: "exec",
    4: "infrastructure",
    5: "admin"
}
 
// The top-level component needs to know which are selected in order to sort the selected ones to the front
// selected should be a state owned by the parent

// go through only selected subteams first
const EditTeamsModal = () => {
    const [selectedSubteams, setSelectedSubteams] = useState([0, 1]);

    return (
        <>
            <SystemComponent display="grid" 
                gridTemplateColumns={"100%"}
                gridAutoRows='minmax(70px, auto)'
            >
                <SystemComponent>
                    <Header5>Which Subteams are you in ?</Header5>
                    {
                        selectedSubteams.map(selectedSubteams => 
                            <ToggleListItem variant={subteamThemeMapping[selectedSubteams]}>
                                {subteamMapping[selectedSubteams]}
                            </ToggleListItem>
                        )
                    }
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