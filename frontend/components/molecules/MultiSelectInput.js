import PropTypes from 'prop-types';
import Header5 from '../atoms/Header5';
import {SystemComponent} from '../atoms/SystemComponents';

import Creatable from 'react-select/creatable';


const MultiSelectInput = ({title,
                            setSelectedItems,
                            options}) => {

    const handleSelectItems = (selectedItems) => {
        if (!selectedItems) {
            setSelectedItems([]);
            return;
        }
        setSelectedItems(selectedItems.map(selectedItem => 
            selectedItem.value));
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
                    onChange={
                        handleSelectItems
                    }
                    options={options}
                />
            </SystemComponent>
        </SystemComponent>
    );
}

export default MultiSelectInput;

