import React from "react";
import styled from "styled-components";

import { SystemComponent } from "../atoms/SystemComponents";
import MemberPreviewComponent from "./MemberPreviewComponent";

const MemberListGrid = ({members, onSelect}) => {
    return (
        <Container gridGap={4} overflowY="scroll">
            {
                members && members.map((member, i) => 
                    <MemberPreviewComponent key={i}
                        name={`${member.name.first} ${member.name.last}`}
                        subteam={member.subteam.name} 
                        role={member.memberType.name}
                        onClick={() => onSelect(member._id)}
                    />                        
                )
            }
            <SystemComponent height="10px" />
        </Container>
    );
}

export default MemberListGrid;

/**
 * Styled component definitions
 */


const Container = styled(SystemComponent)`
    margin: 0 -${props => props.theme.space.cardPadding}px;
    mask-image: linear-gradient(transparent,rgba(0,0,0,1.0) 15px,rgba(0,0,0,1.0) calc(100% - 15px),transparent);
    padding: 10px ${props => props.theme.space.cardPadding}px 0;
    height: calc(100% - ${props => props.theme.space.cardPadding * 2}px - 10px);
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    align-items: start;
`;