import { HttpVerb, executeRequest, BASE_API } from '../baseApi';

export function getAll() {
    const request = {
        method: HttpVerb.GET,
        url: `${BASE_API}/members`
    };
    return executeRequest(request);
}
