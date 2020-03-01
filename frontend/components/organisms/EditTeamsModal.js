import {useState} from 'react';
import styled from 'styled-components';
import {SystemComponent, SystemSpan} from '../atoms/SystemComponents';
import TextArea from '../atoms/TextArea';

import SuggestionBox from '../atoms/SuggestionBox';
import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import ToggleListItem from '../atoms/ToggleListItem';
import EditSettingsModal from '../molecules/EditSettingsModal';

import {filter} from 'lodash';

import theme from '../theme';

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

const CrossIcon = styled(SystemComponent)`
    cursor: pointer;
`;

const ProjectListItem = ({projName, handleDeselect}) => {
    return (
        <SystemComponent 
            display='flex' 
            flexDirection='row'
            mt={0}
            mr={4}
            mb={2}
            ml={0}
            pt={1}
            pr={4}  
            pb={1}
            pl={4}
            borderRadius={theme.radii[2]}
            backgroundColor={theme.colors.listBackgroundBlue}
        >
            <SystemComponent mr={3}>{projName}</SystemComponent>
            <CrossIcon onClick={() => handleDeselect(projName)}><span className="fas fa fa-times"></span></CrossIcon>
        </SystemComponent>
    )
}

const HorizontalList = ({projects, handleDeselectItem}) => {
    console.log(projects);
    return(
        <SystemComponent display="flex"
            flexDirection="row"
            flexWrap="wrap"
            mt={1}
            mb={2}
        >
            {projects.map(proj => 
                <ProjectListItem projName={proj} handleDeselect={handleDeselectItem}/>
            )}
        </SystemComponent>
    )
}

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

    const handleInputChange = (evt) => {
        setProject(evt.target.value);
    }

    const addProject = () => {
        const newProject = project.trim();
        if (newProject && !selectedProjects.includes(newProject)) setSelectedProjects(selectedProjects.concat(newProject));
        setProject('');
    }

    const removeProject = (projectToRemove) => {
        console.log(projectToRemove);
        const updatedSelectedProjects = filter(selectedProjects, p => p !== projectToRemove)
        setSelectedProjects(updatedSelectedProjects);
    }

    const handleKeyPressed = (evt) => {
        if (evt.keyCode === 13) addProject();
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
                    <HorizontalList
                        projects={selectedProjects}
                        handleDeselectItem={removeProject}
                    />
                    <SystemComponent position="relative">
                        <SuggestionBox p={theme.space[4]} position="absolute" value={project.trim()} handleClick={addProject}/>
                        <CustomInput variant="text" 
                            placeholder="Add Project" 
                            value={project} 
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPressed}
                        />
                    </SystemComponent>
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