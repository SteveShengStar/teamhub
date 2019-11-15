import React from "react";
import styled from "styled-components";

import { SystemComponent } from "../atoms/SystemComponents";
import MemberPreviewComponent from "./MemberPreviewComponent";

const Container = styled(SystemComponent)`
    margin: 0 -${props => props.theme.space.cardPadding}px;
    mask-image: linear-gradient(transparent,rgba(0,0,0,1.0) 5%,rgba(0,0,0,1.0) 95%,transparent);
    padding: 10px ${props => props.theme.space.cardPadding}px 0;
    height: calc(100% - ${props => props.theme.space.cardPadding * 2}px - 10px);
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    align-items: start;
`;

const MemberListGrid = ({members}) => {
    return (
        <Container gridGap={4} overflowY="scroll">
            {
                members && members.map((member, i) => 
                    <>
                        <MemberPreviewComponent key={i}
                            name={`${member.name.first} ${member.name.last}`}
                            subteam={member.subteam.name} 
                            role={member.memberType.name} 
                        />
                        {
                            i === members.length - 1 && <SystemComponent height="10px" key={i + 1}/>
                        }
                    </>
                )
            }
        </Container>
    );
}

export default MemberListGrid;