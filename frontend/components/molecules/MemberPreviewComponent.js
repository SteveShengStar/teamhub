import React from 'react';
import styled from 'styled-components';

import { SystemComponent } from '../atoms/SystemComponents';
import Header5 from '../atoms/Header5';
import Body from '../atoms/Body';
import BorderlessButton from '../atoms/BorderlessButton';
import Image from '../atoms/Image';

const GridLayout = styled(SystemComponent)`
    display: grid;
    grid-template-rows: 18px 18px;
    grid-template-columns: auto 1fr;
    grid-column-gap: ${props => props.theme.space[4]}px;
    padding: ${props => props.theme.space[3]}px;
    cursor: pointer;
    transition: ${props => props.theme.transitions.default};
    &:hover {
        transform: scale(1.01);
        background-color: ${props => props.theme.colors.greys[1]};
    }
    &:active {
        transform: scale(1.025);
    }
`;

const RowFlexLayout = styled(SystemComponent)`
    display: flex;
    justify-content: space-between;
`;

const MemberPreviewComponent = ({name, subteam, role, onClick, imageUrl, term, isOnStream, isSelected}) => {
    return (
        <GridLayout 
            backgroundColor={isSelected ? "greys.2" : "greys.0"}
            borderRadius="small" 
            height={36} 
            onClick={onClick}
        >
            <Image 
                height={36} 
                key={0}
                src={imageUrl || "/static/default-headshot.png"}
                gridRow="1/3"
                borderRadius="18px"
                overflow="visible"
            />

            <RowFlexLayout>
                <Header5>{name}</Header5>
                <Body>{term}</Body>
            </RowFlexLayout>

            <RowFlexLayout gridRow="2/3" gridColumn="2/3">
                <BorderlessButton variant='software'>{subteam && subteam.name || ""}</BorderlessButton>
                <Body>{role}</Body>
            </RowFlexLayout>
        </GridLayout>
    );
};

export default MemberPreviewComponent;