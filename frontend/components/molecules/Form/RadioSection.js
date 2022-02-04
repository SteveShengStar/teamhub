import React, { useState, useContext, useEffect, useRef } from 'react';
import { SystemComponent, SystemSpan } from '../../atoms/SystemComponents';
import RadioButton from '../../atoms/Radio';

const RadioSection = ({options}) => {
    const [selectedOption, setSelectedOption] = useState(undefined);

    return (
        <>
            {
                options.map(opt => 
                    <SystemComponent onClick={() => setSelectedOption(opt)} height="40px" >
                        <RadioButton selected={opt === selectedOption} />
                        <SystemComponent ml="45px" fontSize="16px" pt="2px">{opt}</SystemComponent>
                    </SystemComponent>
                )
            }
        </>
    );
}
export default RadioSection;