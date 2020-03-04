import styled from 'styled-components';
import SuggestionBox from '../atoms/SuggestionBox';
import theme from '../theme';

import Header5 from '../atoms/Header5';
import {SystemComponent} from '../atoms/SystemComponents';
import Input from '../atoms/Input';
import {filter} from 'lodash';
import PropTypes from 'prop-types';


const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

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

const HorizontalList = ({listItems, handleDeselect}) => {
    return(
        <SystemComponent display="flex"
            flexDirection="row"
            flexWrap="wrap"
            mt={1}
            mb={2}
        >
            {listItems.map(proj => 
                <ProjectListItem projName={proj} handleDeselect={handleDeselect}/>
            )}
        </SystemComponent>
    )
}

// TODO: Make Autocomplete Work
const AutocompleteInput = ({title,
                                listOfSelected,
                                updateList,
                                placeholder,
                                value,
                                handleInputChange}) => {

    const handleKeyDown = (evt) => {
        if (evt.keyCode === 13)
            handleSelect();
    }

    const handleDeselect = (itemToRemove) => {
        const updatedSelectedProjects = filter(listOfSelected, i => i !== itemToRemove)
        updateList(updatedSelectedProjects);
    }

    const handleSelect = () => {
        const newListItem = value.trim();
        if (newListItem && !listOfSelected.includes(newListItem)) {
            updateList(listOfSelected.concat(newListItem));
        }
        handleInputChange('');
    }
    
    return (
        <SystemComponent>
            <SystemComponent>
                <Header5>{title}</Header5>
            </SystemComponent>
            <HorizontalList
                listItems={listOfSelected}
                handleDeselect={handleDeselect}
            />
            <SystemComponent position="relative">
                <SuggestionBox p={theme.space[4]} position="absolute" value={value} handleClick={handleSelect}/>
                <CustomInput 
                    variant="text" 
                    placeholder={placeholder}
                    value={value}
                    onChange={(evt) => handleInputChange(evt.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </SystemComponent>
        </SystemComponent>
    );
}

AutocompleteInput.propTypes = {
    value: PropTypes.string
};

export default AutocompleteInput;

