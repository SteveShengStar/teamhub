import {useState} from 'react';
import styled from 'styled-components';
import {filter} from 'lodash';
import PropTypes from 'prop-types';
import theme from '../theme';

import SuggestionBox from '../atoms/SuggestionBox';
import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import {SystemComponent} from '../atoms/SystemComponents';
import SelectedItemContainer from '../atoms/SelectedItemContainer';

import Creatable from 'react-select/creatable';

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

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
                {listItems.map(projName => 
                    <SelectedItemContainer itemName={projName} handleDeselect={handleDeselect}/>
                )}
            </SystemComponent>
            )
    )
}

// TODO: Load suggestions from backend.
const MultiSelectInput = ({title,
                                listOfSelected,
                                updateList,
                                value,
                                handleInputChange,
                                options}) => {
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
            <SystemComponent position="relative">
                <Creatable
                    isClearable
                    isMulti
                    handleInputChange={e => handleInputChange(e.value)}
                    options={options}
                />
            </SystemComponent>
        </SystemComponent>
    );
}

MultiSelectInput.propTypes = {
    value: PropTypes.string
};

export default MultiSelectInput;

