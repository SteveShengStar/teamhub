import React from 'react';
import RadioSection from './RadioSection';

const BooleanRadioSection = ({name, selectedOption, setSelectedOption}) => {

    const setSelected = (name, value) => {
        if (value === "Yes") {
            setSelectedOption(name, true);
        } else if (value === "No") {
            setSelectedOption(name, false);
        }
    }

    const booleanToString = (selectedOption) => {
        if (selectedOption) return "Yes";
        return "No";
    }

    return (
        <RadioSection
            options={["Yes", "No"]} 
            name={name}
            selectedOption={booleanToString(selectedOption)}
            setSelectedOption={setSelected}
        />
    )
}
export default BooleanRadioSection;