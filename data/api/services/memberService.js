import { HttpVerb, executeRequest, BASE_API } from '../baseApi';

export function getAll(isSSR = false) {
  const request = {
    method: HttpVerb.POST,
    url: `${BASE_API(isSSR)}/members`
  };
  return executeRequest(request);
}

export function get(id) {
  const request = {
    method: HttpVerb.GET,
    url: `${BASE_API()}/members/${id}/info`
  };
  return executeRequest(request);
}
