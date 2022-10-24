import React from 'react';
import Select from '../../atoms/Select';

const getNormalizedValue = (isMulti, value) => {
    if (isMulti) {
        if (value) {
            return value.map((v) => {
                return {
                    value: v,
                    label: v,
                };
            });
        }
        return [];
    }

    if (value) {
        return {
            value: value,
            label: value,
        };
    }
    return {};
};

const MenuSection = ({
    options,
    name,
    isMulti,
    selectedValue,
    setSelectedValue,
}) => {
    const handleSelect = (newSelection) => {
        const newValue = isMulti
            ? newSelection.map((s) => s.value)
            : newSelection.value;
        setSelectedValue(name, newValue);
    };

    const value = getNormalizedValue(isMulti, selectedValue);

    return (
        <>
            <Select
                name={name}
                options={options}
                isMulti={isMulti}
                isClearable={isMulti}
                value={value}
                onChange={handleSelect}
            />
        </>
    );
};
export default MenuSection;
