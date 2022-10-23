import Header5 from '../atoms/Header5';
import { SystemComponent } from '../atoms/SystemComponents';

import Creatable from 'react-select/creatable';

const MultiSelectInput = ({
    title,
    setSelectedItems,
    selectedItems,
    options,
    helpMessage,
}) => {
    const handleSelectItems = (items) => {
        if (!items) {
            setSelectedItems([]);
            return;
        }
        setSelectedItems(items);
    };

    return (
        <SystemComponent>
            <SystemComponent>
                <Header5>{title}</Header5>
            </SystemComponent>
            {helpMessage && <SystemComponent>{helpMessage}</SystemComponent>}
            <SystemComponent position='relative'>
                <Creatable
                    isClearable
                    isMulti
                    onChange={handleSelectItems}
                    options={options}
                    value={selectedItems}
                />
            </SystemComponent>
        </SystemComponent>
    );
};

export default MultiSelectInput;
