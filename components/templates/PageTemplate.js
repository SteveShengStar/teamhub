import React from 'react';
import Image from '../atoms/Image';
import { SystemComponent } from '../atoms/SystemComponents';
import Subtitle from '../atoms/Subtitle';
import MyHub from '../organisms/MyHub';
import styled from 'styled-components';

export const PageTemplateGridLayout = styled(SystemComponent)`
    display: grid;
    grid-template-rows: 100px 1fr;
    grid-template-columns: inherit;
    grid-gap: ${props => props.theme.space.titleBottomMargin}px;
`;

const PageTemplate = ({className, title, children}) => (
    <>
        <Image variant="background" src="/static/background.png" alt="background"/>
        <SystemComponent display="flex" position="absolute" top={0} left={0} right={0} bottom={0} overflow="hidden" alignItems={'stretch'}>
            <MyHub />
            <PageTemplateGridLayout
                className={className}
                height="inherit"
                p="cardMargin"
                width="inherit"
                flex={1}
                alignItems={'stretch'}
            >
                <Subtitle as="h1" alignSelf="end" fontSize={['smallSubtitle','subtitle']}>{title}</Subtitle>
                {React.Children.only(children)}
            </PageTemplateGridLayout>
        </SystemComponent>
    </>
);

export default PageTemplate;