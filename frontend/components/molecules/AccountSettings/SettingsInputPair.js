import React from "react";
import { SystemComponent } from "../../atoms/SystemComponents";
import Header5 from "../../atoms/Header5";
import Select from "../../atoms/Select";
import Creatable from 'react-select/creatable';

const SettingsInputPair = ({title, onChange, value, options, isMulti=true, allowCustomInput=false}) => (
    <SystemComponent flex={1}>
        <Header5 mb={1}>{title}</Header5>
        {
            {
                true: <Creatable options={options} minWidth={200} isMulti={isMulti} onChange={(val) => onChange(title, val)} value={value}/>,
                false: <Select options={options} minWidth={200} isMulti={isMulti} onChange={(val) => onChange(title, val)} value={value}/>
            }[allowCustomInput]
        }
    </SystemComponent>
);
export default SettingsInputPair;