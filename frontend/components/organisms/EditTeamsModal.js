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

const EditTeamsModal = ({visible, handleCloseModal}) => {

    const persistedSelectedTeams = [0, 1];
    let persistedNonSelectedteams = filter(Object.keys(subteamMapping), 
        teamId => persistedSelectedTeams.includes(parseInt(teamId, 10)) === false
    );
    persistedNonSelectedteams = persistedNonSelectedteams.map(teamId => parseInt(teamId, 10));

    const [localSelectedTeams, setLocalSelectedTeams] = useState(persistedSelectedTeams);
    const [project, setProject] = useState('');
    const [selectedProjects, setSelectedProjects] = useState(['Teamhub', 'Motor Control']);
    const [roleDescription, setRoleDescription] = useState('');
    
    
    const handleSave = () => {
        /* TODO: implement this */
    }

    const handleInputChange = (newProject) => {
        setProject(newProject);
    }

    const toggleSelectItem = (teamId) => {
        if (localSelectedTeams.includes(teamId)) {
            setLocalSelectedTeams(
                filter(localSelectedTeams, i => i != teamId)
            );       
        } else {
            setLocalSelectedTeams(localSelectedTeams.concat(teamId));
        }
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
                        gridTemplateColumns='1fr'
                        gridRowGap={3}
                    >
                        {
                            persistedSelectedTeams.map((team) => 
                                <SystemComponent key={team}>
                                    <ToggleListItem 
                                        id={team}
                                        text={subteamMapping[team]}
                                        selected={localSelectedTeams.includes(team)}
                                        onSelect={toggleSelectItem}
                                    />
                                </SystemComponent>
                            )
                        }
                        {
                            persistedNonSelectedteams.map((team) => 
                                <SystemComponent key={team}>
                                    <ToggleListItem 
                                        id={team}
                                        text={subteamMapping[team]}
                                        selected={localSelectedTeams.includes(team)}
                                        onSelect={toggleSelectItem}
                                    />
                                </SystemComponent>
                            )
                        }
                    </SystemComponent>
                </SystemComponent>  
                <SystemComponent>
                    <AutocompleteInput 
                        title="What Projects are you Working on ?"
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