import { refreshable } from './baseApi';

export const login = (response) => {
    return fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
    }).then((res) => res.json());
};

export const loginWithToken = (dispatch, router) => {
    return refreshable('/api/auth/check', {}, dispatch, router);
};

export const logout = (userId, dispatch, router) => {
    return refreshable(
        '/api/auth/logout',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        },
        dispatch,
        router
    );
};
