import axios from 'axios';
import { port } from '../../../config';
import useShouldRedirect from '../../hooks/useShouldRedirect';

export const getBaseApi = (isSSR = false) => isSSR ? `http://localhost:${port}/api` : `/api` ;

export const HttpVerb = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT'
};

export const executeRequest = (request) => {
    const { method, url, data, headers } = request;

    //return promise
    return axios({
        method,
        url,
        data,
        headers
    }).then((res) => res.data);
};


/**
 * 
 * @param {string} endpoint 
 * @param {string} token
 * @param {*} options
 * @param {*} dispatch
 */
export const refreshable = (endpoint, token, options, dispatch, router) => {
    if (token == null) throw new Error("Null token for " + endpoint)
    return fetch(endpoint, {...options, headers: {
        ...(options.headers && { ...options.headers }),
        authorization: `Bearer ${token}`
    }})
        .then(res => res.json())
        .catch(err => {
            dispatch({ type: "RESET" });
            useShouldRedirect({}, router)
        })
}