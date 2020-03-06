import React from 'react';
import styled from 'styled-components';

import { SystemComponent } from '../atoms/SystemComponents';
import MemberPreviewComponent from './MemberPreviewComponent';

const MemberListGrid = ({members, onSelect, className, animRef}) => {
    return (
        <Container gridGap={4} overflowY={["auto", "auto", "scroll"]} className={className} ref={animRef}>
            {
                members && members.map((member, i) => 
                    <MemberPreviewComponent 
                        key={i}
                        name={`${member.name.display}`}
                        subteam={member.subteam ? member.subteam.name : ''} 
                        role={member.memberType ? member.memberType.name : ''}
                        onClick={() => onSelect(member._id)}
                        imageUrl={member.imageUrl}
                    />
                )
            }
            <SystemComponent height="10px" />
        </Container>
    );
};

export default MemberListGrid;

/**
 * Styled component definitions
 */

const Container = styled(SystemComponent)`
    margin: 0 -${props => props.theme.space.cardPaddingSmall}px;
    padding: 10px ${props => props.theme.space.cardPaddingSmall}px 0;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, auto));
    grid-auto-rows: min-content;
    align-items: start;

    ${props => props.theme.mediaQueries.tablet} {
        margin: 0 -${props => props.theme.space.cardPadding}px;
        mask-image: linear-gradient(transparent,rgba(0,0,0,1.0) 10px,rgba(0,0,0,1.0) calc(100% - 10px),transparent);
        padding: 10px ${props => props.theme.space.cardPadding}px 0;
    }
`;