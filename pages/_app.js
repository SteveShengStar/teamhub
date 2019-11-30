/**
 * Copied from styled-components example from next.js
 * Wraps every page around a theme provider
 */

import App from 'next/app';
import React from 'react';
import withRedux from 'next-redux-wrapper';

import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';

import rootReducer from '../frontend/data/rootReducer';

import { ThemeProvider } from 'styled-components';
import theme from '../frontend/components/theme';

import Nav from '../frontend/components/molecules/Nav';

const navItems = [
    {
        name: 'Explore', link: '/'
    },
    {
        name: 'The Team', link: '/team',
    },
    {
        name: 'Meetings', link: '/meetings'
    },
    {
        name: 'Discover', link: '/discover'
    },
    {
        name: 'Account', link: '/account'
    }
];

const makeStore = (initialState, options) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState
    });
};

class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        return {
            pageProps: Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}
        };
    }

    render () {
        const { Component, pageProps, router, store } = this.props;

        let index = -1;
        if (router && router.route) {
            const split = router.route.split('/')[1];
            if (split) index = navItems.findIndex(item => item.link === '/' + split[1]);
            else index = navItems.findIndex(item => item.link === '/');
        }
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Nav navItems={navItems} index={index}/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </Provider>
        );
    }
}

export default withRedux(makeStore)(MyApp);
