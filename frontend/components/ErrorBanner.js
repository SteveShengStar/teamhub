import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
    width: 350px;
    height: 85px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    z-index: 20;
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
const Bannertext = styled.h4`
    font-family: 'Nunito Sans';
    padding-left: 50px;
    margin: 0;
`;

const BannerSubtitle = styled.h5`
    font-family: 'Nunito Sans';
    margin: 0;
`;

const BannerHeadingSection = styled.div`
    display: flex;
    align-items: center;
    align-self: flex-start;
`;
const ErrorBanner = ({ displayErrorBanner }) => {
    return (
        <div>
            <Banner style={{ display: displayErrorBanner ? 'flex' : 'none' }}>
                <BannerHeadingSection>
                    <i
                        class='fa fa-exclamation-circle'
                        aria-hidden='true'
                        style={{
                            color: 'purple',
                            padding: '10px 15px',
                            fontSize: '20px',
                        }}
                    ></i>
                    <BannerSubtitle>Error</BannerSubtitle>
                </BannerHeadingSection>
                <Text>
                    <Bannertext>
                        Error occurred during form Submission. Please contact
                        Waterloop web team for assistance.
                    </Bannertext>
                </Text>
            </Banner>
        </div>
    );
};

export default ErrorBanner;
