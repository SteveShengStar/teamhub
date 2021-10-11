import { refreshable } from "./baseApi";

export const login = (response) => {
    return fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(response)
    }).then(res => res.json());
}

export const loginWithToken = (token, dispatch, router) => {
    return refreshable('/api/auth/check', token, {}, dispatch, router)
}


export const logout = (userId) => {
    return fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: userId})
    }).then(res => res.json());
}