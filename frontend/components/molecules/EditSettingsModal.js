import React from "react";
import styled from "styled-components";
import {SystemComponent} from '../atoms/SystemComponents';
import Header3 from '../atoms/Header3';
import {Background, ContentContainer} from '../atoms/ModalSubComponents';
import Button from '../atoms/Button';
import LargeButton from '../atoms/LargeButton';

import theme from '../theme';

const CustomContentContainer = styled(ContentContainer)`
    box-sizing: border-box;
    width: 650px;
    max-height: 80vh;
    min-height: 30vh;
    height: 800px;

    padding: 25px;
`;
// TODO: pull from theme

const EditSettingsModal = ({children, className, visible, title, onCloseModal}) => {
    return (
        <Background visible={visible}>
            <CustomContentContainer 
                className={className}
                visible={visible}
            >
                <SystemComponent>
                    <Header3>
                        {title}
                    </Header3>
                </SystemComponent>
                <SystemComponent>
                    {React.Children.only(children)}
                </SystemComponent>
                <SystemComponent display='flex' 
                    justifyContent='center' 
                    alignItems='center'
                    gridColumnGap={theme.space[4]}
                >
                    <LargeButton variant="primary">Save</LargeButton>
                    <Button variant="cancel" onClick={() => onCloseModal()}>Cancel</Button>
                </SystemComponent>
            </CustomContentContainer>
        </Background>
    )
}
export default EditSettingsModal;

