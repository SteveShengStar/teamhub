import React, { useState } from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
import BorderlessButton from "../atoms/BorderlessButton";
import { SystemComponent } from "../atoms/SystemComponents";
import Header5 from "../atoms/Header5";
import Select from "../atoms/Select";

const MemberFilterComponent = () => {
    const [ onState, setOnState ] = useState(false);

    function toggle() {
        setOnState(!onState);
    }

    return (
        <SystemComponent>
            <Search variant="text" placeholder="Search"/>
            <SystemComponent mt={2} display="flex" flexDirection="row-reverse">
                <BorderlessButton onClick={toggle}>{onState ? "Hide Filters" : "Show Filters"}</BorderlessButton>
                <BorderlessButton mr={5}>Show Sort</BorderlessButton>
            </SystemComponent>
            {
                onState && (
                    <SystemComponent display="flex" flexWrap="wrap" mt={1} mb={3} ml={-3}>
                        <InputPair title="Program"/>
                        <InputPair title="Subteam"/>
                        <InputPair title="Roles"/>
                        <InputPair title="Year"/>                        
                        <InputPair title="Skills"/>
                        <InputPair title="Interests"/>
                    </SystemComponent>
                )
            }
        </SystemComponent>
    );
}

export default MemberFilterComponent;

// TODO: Dummy variable replace later
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

const Search = styled(Input)`
    width: calc(100% - ${props => props.theme.space.cardPadding}px);
`;

const InputPair = ({title}) => (
    <SystemComponent flex={1} ml={3} mt={3}>
        <Header5 mb={1}>{title}</Header5>
        <Select options={options} minWidth={150} isMulti/>
    </SystemComponent>
);

