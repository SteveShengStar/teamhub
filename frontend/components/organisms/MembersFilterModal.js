import React from "react";
import Modal from "../molecules/Modal";
import { SystemComponent } from "../atoms/SystemComponents";
import Header3 from "../atoms/Header3";
import useMembersFilters from "../../hooks/useMembersFilters";
import InputPair from "../molecules/InputPair";
import Button from "../atoms/Button";

const MembersFilterModal = ({className, visible, filters, updateSearchQuery}) => {
    const membersFilters = useMembersFilters(filters);
    return (
        <Modal className={className} visible={visible}>
            <SystemComponent display="flex" flexDirection="column" overflowY="scroll" height="auto">
                <Header3>
                    Filters
                </Header3>
                <SystemComponent display="grid" 
                    gridTemplateColumns={
                        ["repeat(auto-fill, minmax(1fr, auto))",
                         "repeat(auto-fill, minmax(1fr, auto))",
                         "repeat(auto-fill, minmax(20%, 30%))"]
                    }
                    gridGap={[3, 3, 6]}
                    mt={1} mb={3} ml={-3}
                >
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
                                onChange={() => {
                                    membersFilters.handleFilterChange
                                    updateSearchQuery && updateSearchQuery(membersFilters.states);
                                }} 
                                value={membersFilters.states[name]}
                            />
                        )
                    }
                </SystemComponent>
                <Button alignSelf="flex-end">Done</Button>
            </SystemComponent>
        </Modal>
    );
}

export default MembersFilterModal;