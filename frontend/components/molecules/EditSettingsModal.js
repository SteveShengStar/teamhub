import React from 'react';
import styled from 'styled-components';
import { SystemComponent } from '../atoms/SystemComponents';
import Header3 from '../atoms/Header3';
import { Background, ContentContainer } from '../atoms/ModalSubComponents';
import Button from '../atoms/Button';
import LargeButton from '../atoms/LargeButton';

import theme from '../theme';

const CustomContentContainer = styled(ContentContainer)`
    box-sizing: border-box;
    width: 86vw;
    min-width: 300px;
    max-height: 90vh;
    overflow: auto;
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
const EditSettingsModal = ({
    className,
    children,
    visible,
    title,
    handleCloseModal,
    handleSave = () => {},
}) => {
    return (
        <Background visible={visible}>
            <CustomContentContainer className={className} visible={visible}>
                <SystemComponent>
                    <Header3>{title}</Header3>
                </SystemComponent>
                <SystemComponent overflowY='auto'>{children}</SystemComponent>
                <SystemComponent
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    mt={20}
                >
                    <LargeButton variant='primary' handleClick={handleSave}>
                        Save
                    </LargeButton>
                    <Button
                        variant='cancel'
                        display='block'
                        ml={theme.space[5]}
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </Button>
                </SystemComponent>
            </CustomContentContainer>
        </Background>
    );
};
export default EditSettingsModal;
