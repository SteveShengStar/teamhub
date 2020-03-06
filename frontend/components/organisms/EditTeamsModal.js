import {useState} from 'react';
import styled from 'styled-components';
import AutocompleteInput from '../molecules/AutocompleteInput';
import {SystemComponent} from '../atoms/SystemComponents';
import TextArea from '../atoms/TextArea';

import Header5 from '../atoms/Header5';
import ToggleListItem from '../atoms/ToggleListItem';
import EditSettingsModal from '../molecules/EditSettingsModal';

import {filter} from 'lodash';


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

const EditTeamsModal = ({visible, handleCloseModal}) => {
    const [selectedSubteams, setSelectedSubteams] = useState([0, 1]);
    const [project, setProject] = useState('');
    const [selectedProjects, setSelectedProjects] = useState(['Teamhub', 'Motor Control'])
    const [roleDescription, setRoleDescription] = useState('');
    
    let nonMemberSubteams = filter(Object.keys(subteamMapping), 
        subteamId => selectedSubteams.includes(parseInt(subteamId, 10)) === false
    );
    nonMemberSubteams = nonMemberSubteams.map(subteamId => parseInt(subteamId, 10));

    const handleSave = () => {

    }

    const handleInputChange = (newProject) => {
        setProject(newProject);
    }

    return (
        <EditSettingsModal 
            visible={visible} 
            title="Edit Teams &amp; Responsibilities" 
            handleCloseModal={handleCloseModal}
            handleSave={handleSave}
        >
            <SystemComponent display="grid" 
                gridTemplateColumns="100%"
                gridAutoRows='minmax(70px, auto)'
                gridRowGap={4}
            >
                <SystemComponent mr>
                    <Header5>Which Subteams are you in ?</Header5>
                    <SystemComponent display='grid' 
                        gridTemplateColumns='1fr 1fr'
                        gridRowGap={3}
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
                    <AutocompleteInput 
                        title="What Projects are you Working on?"
                        listOfSelected={selectedProjects}
                        updateList={(projList) => setSelectedProjects(projList)}
                        placeholder="Add Project"   
                        value={project}
                        handleInputChange={handleInputChange}
                    />
                </SystemComponent>
                <SystemComponent>
                    <Header5>What do you do on Waterloop ?</Header5>  
                    <TextArea value={roleDescription} onChange={(evt) => {setRoleDescription(evt.target.value)}} />
                </SystemComponent>
            </SystemComponent>            
        </EditSettingsModal>
    );
}
export default EditTeamsModal;

// TODO: Maximum length for role description
// Give suggestions for Projects -- Fetch from backend