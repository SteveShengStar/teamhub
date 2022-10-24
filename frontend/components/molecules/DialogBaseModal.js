import React from 'react';
import styled from 'styled-components';
import { SystemComponent } from '../atoms/SystemComponents';
import Header2 from '../atoms/Header2';
import Header4 from '../atoms/Header4';
import { Background, ContentContainer } from '../atoms/ModalSubComponents';
import Button from '../atoms/Button';
import LargeButton from '../atoms/LargeButton';

import theme from '../theme';

const CustomContentContainer = styled(ContentContainer)`
    box-sizing: border-box;
    width: 86vw;
    min-width: 50px;
    max-height: 90vh;
    overflow: auto;
    min-height: 0vh;

    padding: 25px;

    @media screen and (min-width: 420px) {
        width: 400px;
    }

    ${theme.mediaQueries.mobile} {
        width: 540px;
    }
    @media screen and (min-width: 675px) {
        width: 450px;
    }
`;
const DialogBaseModal = ({
    className,
    children,
    visible,
    success,
    handleCloseModal,
    handleSave = () => {},
}) => {
    return (
        <Background visible={visible}>
            <CustomContentContainer className={className} visible={visible}>
                <SystemComponent>
                    {success ? (
                        <Header2>
                            <i
                                class='fa-solid fa-circle-check'
                                style={{ color: '#007F00' }}
                            ></i>
                            &nbsp;Success
                        </Header2>
                    ) : (
                        <Header2>
                            <i
                                class='fa-solid fa-circle-xmark'
                                style={{ color: '#b30000' }}
                            ></i>
                            &nbsp;Error
                        </Header2>
                    )}
                </SystemComponent>
                <SystemComponent>
                    <Header4>
                        {success
                            ? 'Form Sections were successfully saved'
                            : 'Form Sections could not be saved. Please contact Waterloop web team for assistance'}
                    </Header4>
                </SystemComponent>
                <SystemComponent overflowY='auto'>{children}</SystemComponent>
                <SystemComponent
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    mt={20}
                >
                    <Button
                        variant='cancel'
                        display='block'
                        mr={theme.space[5]}
                        onClick={handleCloseModal}
                    >
                        Continue Editing
                    </Button>
                    <LargeButton variant='primary' handleClick={handleSave}>
                        Return to Main
                    </LargeButton>
                </SystemComponent>
            </CustomContentContainer>
        </Background>
    );
};
export default DialogBaseModal;
