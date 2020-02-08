import React from "react";
import styled from "styled-components";
import {SystemComponent} from '../atoms/SystemComponents';
import Header3 from '../atoms/Header3';
import {Background, ContentContainer} from '../atoms/ModalSubComponents';
import EditTeamsModal from '../organisms/EditTeamsModal';
import Button from '../atoms/Button';
import LargeButton from '../atoms/LargeButton';

import theme from '../theme';

const CustomContentContainer = styled(ContentContainer)`
    box-sizing: border-box;
    width: 86vw;
    min-width: 300px;
    max-height: 80vh;
    min-height: 30vh;

    padding: 25px;

    @media screen and (min-width: 420px) {
        width: 400px;
    }

    ${theme.mediaQueries.mobile} {
        width: 540px;
    }
    @media screen and (min-width: 675px) {
        width: 650px;
    }
`;
// TODO: pull from theme

const EditSettingsModal = ({className, visible, activeModal, onCloseModal}) => {
    
    let title;
    let visibleModal;
    switch(activeModal) {
        case 0:
            title = "Teams & Responsibilities";
            visibleModal =  <EditTeamsModal/>;
            // TODO: change to separate modal types later
            break;
        case 1:
            title =  "Profile Information";
            visibleModal =  <EditTeamsModal/>;
            break;
        case 2:
            title = "External Profiles";
            visibleModal =  <EditTeamsModal/>;
            break;
        case 3:
            title = "Resume";
            visibleModal =  <EditTeamsModal/>;
            break;
        default:
            title="";
            visibleModal = <></>;
    }

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
                    {visibleModal}
                </SystemComponent>
                <SystemComponent display='flex' 
                    justifyContent='center' 
                    alignItems='center'
                    mt={20}
                >
                    <LargeButton variant="primary" >Save</LargeButton>
                    <Button variant="cancel" display="block" ml={theme.space[5]} onClick={() => onCloseModal()}>Cancel</Button>
                </SystemComponent>
            </CustomContentContainer>
        </Background>
    )
}
export default EditSettingsModal;

