import {useRef, useState} from 'react';
import styled from 'styled-components';
import SuggestionBox from '../atoms/SuggestionBox';
import theme from '../theme';

import Header5 from '../atoms/Header5';
import {SystemComponent, SystemSpan} from '../atoms/SystemComponents';
import Input from '../atoms/Input';
import {filter} from 'lodash';
import PropTypes from 'prop-types';


const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;


const CrossIcon = styled(SystemSpan)`
    display: inline-block;
    vertical-align: middle;
`;

const CrossContainer = styled(SystemComponent)`
    text-align: center;    
    cursor: pointer;
    width: 30px;
    -webkit-border-top-right-radius: inherit;
    -webkit-border-bottom-right-radius: inherit;
    -moz-border-radius-topright: inherit;
    -moz-border-radius-bottomright: inherit;
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
    

    &:hover {
        ${CrossIcon} {
            color: ${props => props.theme.colors.alertAction};
        }

        background-color: ${props => props.theme.colors.greys[2]};
    }
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
            paddingY={0}
            pr={0}
            pl={4}
            borderRadius={theme.radii[2]}
            backgroundColor={theme.colors.listBackgroundBlue}
        >
            <SystemComponent pr={1} paddingY={1}>{projName}</SystemComponent>
            <CrossContainer onClick={() => handleDeselect(projName)}>
                <CrossIcon><span className="fas fa fa-times"></span></CrossIcon>
            </CrossContainer>
        </SystemComponent>
    )
}

const HorizontalList = ({listItems, handleDeselect}) => {
    return(
        (listItems && listItems.length > 0) && 
            (<SystemComponent 
                display="flex"
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
    )
}

// TODO: Make Autocomplete Work
const AutocompleteInput = ({title,
                                listOfSelected,
                                updateList,
                                placeholder,
                                value,
                                handleInputChange}) => {
    const suggestionBox = useRef(null);
    const [suggestionVisible, setSuggestionVisible] = useState(true);

    const handleKeyDown = (evt) => {
        // If tab or enter are pressed, add item to the selected items list.
        if (evt.keyCode === 13 || evt.keyCode === 9)
            handleSelect();
    }

    const handleDeselect = (itemToRemove) => {
        const updatedSelectedProjects = filter(listOfSelected, i => i !== itemToRemove)
        updateList(updatedSelectedProjects);
    }

    const handleSelect = () => {
        console.log("Handle Select Called.");
        const newListItem = value.trim();
        if (newListItem && !listOfSelected.includes(newListItem)) {
            updateList(listOfSelected.concat(newListItem));
        }
        handleInputChange('');
    }
    
    console.log(suggestionBox.current);
    
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
                <SuggestionBox p={theme.space[4]} 
                    position="absolute" 
                    visible={suggestionVisible}
                    value={value} 
                    handleClick={handleSelect}
                    ref={suggestionBox}
                />
                <CustomInput 
                    variant="text" 
                    placeholder={placeholder}
                    value={value}
                    onChange={(evt) => handleInputChange(evt.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {setSuggestionVisible(true);}}
                    onBlur={() => {
                        handleSelect(); 
                        setSuggestionVisible(false);
                    }}
                />
            </SystemComponent>
        </SystemComponent>
    );
}

AutocompleteInput.propTypes = {
    value: PropTypes.string
};

export default AutocompleteInput;

