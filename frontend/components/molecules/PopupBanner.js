import React from 'react';
import styled from 'styled-components';
import { capitalize } from 'lodash';

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

const Text = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;

const BannerText = styled.h4`
    font-family: 'Nunito Sans';
    margin: 0;
    font-size: 14px;
`;

const BannerSubtitle = styled.h5`
    font-family: 'Nunito Sans';
    margin: 0;
    font-size: 16px;
`;

const BannerHeadingSection = styled.div`
    display: flex;
    align-items: center;
`;

const PopupBanner = ({ visible, faClassName, status, message }) => {
    return (
        <Banner style={{ display: visible ? 'flex' : 'none' }}>
            <BannerHeadingSection>
                <i
                    class={faClassName}
                    style={{
                        color: 'purple',
                        padding: '0 15px',
                        fontSize: '20px',
                    }}
                ></i>
            </BannerHeadingSection>
            <Text>
                <BannerSubtitle>{capitalize(status)}</BannerSubtitle>
                <BannerText>{message}</BannerText>
            </Text>
        </Banner>
    );
};

export const SuccessBanner = ({ visible, message }) => {
    return (
        <PopupBanner
            visible={visible}
            faClassName={'fa-solid fa-circle-check'}
            status='success'
            message={message}
        />
    );
};

export const ErrorBanner = ({ visible, message }) => {
    return (
        <PopupBanner
            visible={visible}
            faClassName={'fa fa-exclamation-circle'}
            status='error'
            message={message}
        />
    );
};
