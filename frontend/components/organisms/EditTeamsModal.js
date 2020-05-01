import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import styled from 'styled-components';
import AutocompleteInput from '../molecules/AutocompleteInput';
import {SystemComponent} from '../atoms/SystemComponents';
import TextArea from '../atoms/TextArea';

import Header5 from '../atoms/Header5';
import ToggleListItem from '../atoms/ToggleListItem';
import EditSettingsModal from '../molecules/EditSettingsModal';

import {filter} from 'lodash';

// Subteam ID to String Mapping
const subteamDisplayNames = {
    "Software": "software",
    "Electrical": "electrical",
    "Mechanical": "mechanical",
    "Exec": "executive",
    "Infrastructure": "infrastructure",
    "Admin": "admin"
};

const EditTeamsModal = ({dataLoaded, visible, handleCloseModal}) => {
    const { token, user } = useSelector(state => state.userState);

    const persistedSelectedTeams = dataLoaded && user.subteams ? user.subteams.map(s => s.name) : [];
    let persistedNonSelectedteams = filter(Object.keys(subteamDisplayNames), 
        team => persistedSelectedTeams.includes(team) === false
    );

    const [localSelectedTeams, setLocalSelectedTeams] = useState(persistedSelectedTeams);
    const [project, setProject] = useState('');
    const [selectedProjects, setSelectedProjects] = useState(dataLoaded && user.projects ? user.projects.map(p => p.description[0]) : []);
    const [roleDescription, setRoleDescription] = useState('');
    
    useEffect(() => {
        if (visible) {
            setLocalSelectedTeams(persistedSelectedTeams);
            setSelectedProjects(dataLoaded && user.projects ? user.projects.map(p => p.description[0]) : []);
            setRoleDescription('');
        }
    }, [dataLoaded, visible]);

    const handleSave = () => {
        /* TODO: implement this */
    }

    const handleInputChange = (newProject) => {
        setProject(newProject);
    }

    const toggleSelectItem = (team) => {
        if (localSelectedTeams.includes(team)) {
            setLocalSelectedTeams(
                filter(localSelectedTeams, i => i != team)
            );       
        } else {
            setLocalSelectedTeams(localSelectedTeams.concat(team));
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
                                        text={subteamDisplayNames[team]}
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
                                        text={subteamDisplayNames[team]}
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