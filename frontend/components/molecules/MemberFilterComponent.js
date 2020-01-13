import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import BorderlessButton from '../atoms/BorderlessButton';
import { SystemComponent } from '../atoms/SystemComponents';
import Header5 from '../atoms/Header5';
import Select from '../atoms/Select';

const MemberFilterComponent = ({animRef, filterOptions, updateSearchQuery}) => {
    const [ onState, setOnState ] = useState(false);
    const [ searchInput, setSearchInput ] = useState("");
    const [ filterStates, setFilterStates ] = useState({
        program: [],
        subteam: [],
        year: [],
        skills: [],
        roles: [],
        interests: []
    });

    function toggle() {
        setOnState(!onState);
    }

    function handleFilterChange(title, values) {
        setFilterStates({...filterStates, [title.toLowerCase()]: values});
    }

    useEffect(() => {
        // on change, update query
        updateSearchQuery && updateSearchQuery(searchInput, filterStates);
    }, [searchInput, filterStates]);

    return (
        <SystemComponent ref={animRef}>
            <Search variant="text" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            <SystemComponent mt={2} display="flex" flexDirection="row-reverse">
                <BorderlessButton onClick={toggle}>{onState ? 'Hide Filters' : 'Show Filters'}</BorderlessButton>
                <BorderlessButton mr={5}>Show Sort</BorderlessButton>
            </SystemComponent>
            {
                onState && (
                    <SystemComponent display="flex" flexWrap="wrap" mt={1} mb={3} ml={-3}>
                        <InputPair title="Program" options={filterOptions["program"]} onChange={handleFilterChange} value={filterStates["program"]}/>
                        <InputPair title="Subteam" options={filterOptions["subteam"]} onChange={handleFilterChange} value={filterStates["subteam"]}/>
                        <InputPair title="Roles" options={filterOptions["roles"]} onChange={handleFilterChange} value={filterStates["roles"]}/>
                        <InputPair title="Year" options={filterOptions["year"]} onChange={handleFilterChange} value={filterStates["year"]}/>                        
                        <InputPair title="Skills" options={filterOptions["skills"]} onChange={handleFilterChange} value={filterStates["skills"]}/>
                        <InputPair title="Interests" options={filterOptions["interests"]} onChange={handleFilterChange} value={filterStates["interests"]}/>
                    </SystemComponent>
                )
            }
        </SystemComponent>
    );
};

export default MemberFilterComponent;

const Search = styled(Input)`
    width: calc(100% - ${props => props.theme.space.cardPadding}px);
`;

const InputPair = ({title, onChange, value, options}) => (
    <SystemComponent flex={1} ml={3} mt={3}>
        <Header5 mb={1}>{title}</Header5>
        <Select options={options} minWidth={200} isMulti onChange={(val) => onChange(title, val)} value={value}/>
    </SystemComponent>
);

