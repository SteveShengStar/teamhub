import React, { useState } from 'react';
import LoadingScreen from '../components/organisms/LoadingScreen';

/**
 * Credits: This code was heavily inspired by this tutorial: https://www.youtube.com/watch?v=zY5jOP5v-FY
 */
const useLoadingScreen = (isLoading) => {
    const [loading, setLoading] = useState(isLoading);

    return [
        loading ? <LoadingScreen /> : null,
        () => setLoading(true), // show the loader
        () => setLoading(false), // Hide the loader
    ];
};
export default useLoadingScreen;
