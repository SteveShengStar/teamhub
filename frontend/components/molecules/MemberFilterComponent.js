import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import BorderlessButton from '../atoms/BorderlessButton';
import { SystemComponent } from '../atoms/SystemComponents';
import InputPair from './InputPair';
import useMembersFilters from '../../hooks/useMembersFilters';
import { useSelector } from 'react-redux';

const MemberFilterComponent = ({animRef, filterOptions, updateSearchQuery}) => {
    const [ onState, setOnState ] = useState(false);
    const [ searchInput, setSearchInput ] = useState("");
    const membersFilters = useMembersFilters(filterOptions);

    function toggle() {
        setOnState(!onState);
    }

    useEffect(() => {
        // on change, update query
        updateSearchQuery && updateSearchQuery(searchInput)
    }, [searchInput]);
    return (
        <SystemComponent ref={animRef}>
            <Search variant="text" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            <SystemComponent mt={2} display="flex" flexDirection="row-reverse" display={["none", "none", "flex"]}>
                {/*<BorderlessButton onClick={toggle}>{onState ? 'Hide Filters' : 'Show Filters'}</BorderlessButton> */}
                {/*<BorderlessButton mr={5}>Show Sort</BorderlessButton>*/}
            </SystemComponent>
            {
                onState && (
                    <SystemComponent display="flex" flexWrap="wrap" mt={1} mb={3} ml={-3}>
                        {
                            membersFilters.names.map((name, key) => 
                                <InputPair 
                                    key={key}
                                    title={name[0].toUpperCase() + name.slice(1)} 
                                    options={membersFilters.options[name].map(option => {
                                        if (typeof(option) == "string") {
                                            return {value: option, label: option};
                                        }
                                        return { value: option._id, label: option.name }
                                    })}
                                    onChange={membersFilters.handleFilterChange} 
                                    value={membersFilters.states[name]}
                                />
                            )
                        }
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