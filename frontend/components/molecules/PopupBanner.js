import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { SystemComponent } from '../atoms/SystemComponents';

const Banner = styled.div`
    width: 350px;
    height: 75px;
    padding: 15px;
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    z-index: 150;
    opacity: 1;
    background-color: white;
    border-radius: 10px;
    margin-top: 30px;
`;

const BannerText = styled.h4`
    font-family: 'Nunito Sans';
    margin: 0;
    font-size: 16px;
`;

const BannerIcon = styled.div`
    display: flex;
    align-items: center;
`;

const PopupBanner = ({ visible, faClassName, iconColor, message }) => {
    return (
        <Banner style={{ display: visible ? 'flex' : 'none' }}>
            <BannerIcon>
                <i
                    class={faClassName}
                    style={{
                        color: iconColor,
                        paddingRight: '15px',
                        fontSize: '30px',
                    }}
                ></i>
            </BannerIcon>
            <SystemComponent>
                <BannerText>{message}</BannerText>
            </SystemComponent>
        </Banner>
    );
};

export const SuccessBanner = ({ visible, message }) => {
    const theme = useContext(ThemeContext);
    return (
        <PopupBanner
            visible={visible}
            faClassName={'fa-solid fa-circle-check'}
            iconColor={theme.colors.success}
            message={message}
        />
    );
};

export const ErrorBanner = ({ visible, message }) => {
    const theme = useContext(ThemeContext);
    return (
        <PopupBanner
            visible={visible}
            faClassName={'fa fa-exclamation-circle'}
            iconColor={theme.colors.error}
            message={message}
        />
    );
};
