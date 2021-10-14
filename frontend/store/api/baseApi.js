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
 * Wrapper function for calling any backend API. 
 * It handles deserializing the request to JSON and 
 * redirecting to the correct page if error occurs. 
 * 
 * @param {string} endpoint 
 * @param {string} token
 * @param {*} options
 * @param {*} dispatch
 */
export const refreshable = (endpoint, token, options, dispatch, router) => {
    return fetch(endpoint, {...options, headers: {
        ...(options.headers && { ...options.headers }),
        credentials: 'same-origin'  // Will send http-only cookie to backend.
    }})
        .then(res => res.json())
        .catch(err => {
            dispatch({ type: "RESET" });    // Clear the user slice of the Redux store
            useShouldRedirect({}, router)   // If error occurred, redirect the user to the appropriate webpage.
                                            // The first parameter is empty object, so that the user is directed to the initial login/signup page
        })
}