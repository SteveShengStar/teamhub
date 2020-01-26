import React from "react";
import Modal from "../molecules/Modal";
import { SystemComponent } from "../atoms/SystemComponents";
import Header3 from "../atoms/Header3";
import useMembersFilters from "../../hooks/useMembersFilters";
import InputPair from "../molecules/InputPair";

const MembersFilterModal = ({className, visible, filters}) => {
    const membersFilters = useMembersFilters(filters);
    return (
        <Modal className={className} visible={visible}>
            <SystemComponent>
                <Header3>
                    Filters
                </Header3>
                <SystemComponent display="flex" flexWrap="wrap" mt={1} mb={3} ml={-3}>
                    {
                        membersFilters.names.map((name, key) => 
                            <InputPair 
                                key={key}
                                title={name} 
                                options={membersFilters.options[name.toLowerCase()]} 
                                onChange={membersFilters.handleFilterChange} 
                                value={membersFilters.states[name]}
                            />
                        )
                    }
                </SystemComponent>
            </SystemComponent>
        </Modal>
    );
}

export default MembersFilterModal;