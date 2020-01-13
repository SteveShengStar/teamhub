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
    grid-template-columns: auto 1fr auto;
    grid-column-gap: ${props => props.theme.space[4]}px;
    padding: ${props => props.theme.space[3]}px;
    box-shadow: ${props => props.theme.shadows.default};
    cursor: pointer;
    transition: ${props => props.theme.transitions.default};
    &:hover {
        transform: scale(1.01);
        background-color: white;
        box-shadow: ${props => props.theme.shadows.default};
    }
    &:active {
        box-shadow: ${props => props.theme.shadows.dark};
        transform: scale(1.025);
    }
`;

const RowFlexLayout = styled(SystemComponent)`
    display: flex;
    justify-content: space-between;
`;

const MemberPreviewComponent = ({name, subteam, role, onClick, imageUrl}) => {
    return (
        <GridLayout 
            backgroundColor="greys.0" 
            borderRadius="small" 
            height={36} 
            onClick={onClick}
        >
            <Image 
                height="36px" 
                key={0}
                src={imageUrl || "/static/default-headshot.png"}
                gridRow="1/3"
                borderRadius="18px"
                overflow="visible"
            />

            <Header5>{name}</Header5>

            <RowFlexLayout gridRow="2/3" gridColumn="2/3">
                <BorderlessButton variant={'software'}>{subteam}</BorderlessButton>
                <Body>{role}</Body>
            </RowFlexLayout>
        </GridLayout>
    );
};

export default MemberPreviewComponent;