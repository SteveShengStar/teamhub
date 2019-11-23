import React from "react";
import styled from "styled-components";

import { SystemComponent } from "../atoms/SystemComponents";
import MemberPreviewComponentTS from './MemberPreviewComponentTS';

const Container = styled(SystemComponent)`
    margin: 0 -${props => props.theme.space.cardPadding}px;
    mask-image: linear-gradient(transparent,rgba(0,0,0,1.0) 10px,rgba(0,0,0,1.0) calc(100% - 10px),transparent);
    padding: 10px ${props => props.theme.space.cardPadding}px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-auto-rows: min-content;
    grid-auto-columns: min-content;
    align-items: start;
`;


const MemberListGridTS = ({members, onSelect, className}) => {
    return (
        <Container gridGap={4} overflowX="scroll" className={className}>
            {
                members && Object.keys(members).map((key, i) => 
                    <MemberPreviewComponentTS key={i}
                        name={`${members[key].name.first} ${members[key].name.last}`}
                        subteam={members[key].subteam ? members[key].subteam.name : ""} 
                        role={members[key].memberType ? members[key].memberType.name : ""}
                        onClick={() => onSelect(members[key]._id)}
                    />
                )
            }
            <SystemComponent height="10px" />
        </Container>
    );
}
export default MemberListGridTS;