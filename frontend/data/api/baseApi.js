import axios from 'axios';
import { port } from '../../../config';

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
