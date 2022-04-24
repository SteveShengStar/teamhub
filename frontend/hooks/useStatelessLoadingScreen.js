import React from 'react';
import LoadingScreen from '../components/organisms/LoadingScreen';

/**
 * Loading screen where state is owned by parent component
 * Credits: This code was heavily inspired by this tutorial: https://www.youtube.com/watch?v=zY5jOP5v-FY
 */
const useStatelessLoadingScreen = (isLoading, setIsLoading) => {
    return [
        isLoading ? <LoadingScreen /> : null,
        () => setIsLoading(true),     // show the loader
        () => setIsLoading(false)     // Hide the loader
    ];
}
export default useStatelessLoadingScreen;