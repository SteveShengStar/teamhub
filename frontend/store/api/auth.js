
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

export const loginWithToken = (token) => {
    return fetch('/api/auth/check', {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }).then(res => res.json());
}