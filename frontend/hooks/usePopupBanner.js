import React, { useState } from 'react';
import {
    SuccessBanner,
    ErrorBanner,
} from '../components/molecules/PopupBanner';

const usePopupBanner = (successMessage, errorMessage) => {
    const [successBannerVisible, setSuccessBannerVisible] = useState(false);
    const [errorBannerVisible, setErrorBannerVisible] = useState(false);

    const renderSuccessBanner = () => {
        return (
            <SuccessBanner
                visible={successBannerVisible}
                message={successMessage}
            />
        );
    };

    const renderErrorBanner = () => {
        return (
            <ErrorBanner visible={errorBannerVisible} message={errorMessage} />
        );
    };

    const showSuccessBanner = (successCallback = () => {}) => {
        setSuccessBannerVisible(true);
        setTimeout(() => {
            setSuccessBannerVisible(false);
            successCallback();
        }, 5000);
    };

    const showErrorBanner = () => {
        setErrorBannerVisible(true);
        setTimeout(() => {
            setErrorBannerVisible(false);
        }, 7000);
    };

    return {
        renderSuccessBanner,
        renderErrorBanner,
        showSuccessBanner,
        showErrorBanner,
    };
};
export default usePopupBanner;
