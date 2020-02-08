import React from "react";
import { SystemComponent } from "../../atoms/SystemComponents";
import Header5 from "../../atoms/Header5";
import Select from "../../atoms/Select";

const SettingsInputPair = ({title, onChange, value, options}) => (
    <SystemComponent flex={1}>
        <Header5 mb={1}>{title}</Header5>
        <Select options={options} minWidth={200} isMulti onChange={(val) => onChange(title, val)} value={value}/>
    </SystemComponent>
);
export default SettingsInputPair;