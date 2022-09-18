import { useState } from 'react';

const useMembersFilters = (options) => {
    const asObj = {};
    const names = Object.keys(options);
    names.forEach((value) => (asObj[value] = []));

    const [states, setStates] = useState(asObj);
    const [searchInput, setSearchInput] = useState('');

    function handleFilterChange(title, values) {
        setStates({ ...states, [title.toLowerCase()]: values });
    }

    return {
        names,
        options,
        states,
        searchInput,
        setSearchInput,
        handleFilterChange,
    };
};
export default useMembersFilters;
