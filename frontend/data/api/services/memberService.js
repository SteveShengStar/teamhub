import { HttpVerb, executeRequest, getBaseApi } from '../baseApi';

export function getAll(options = {isSSR: true}) {
  let ssr = false;
  let query = undefined
  if (options) {
    query = options;
    ssr = !!options.isSSR;
    delete query.isSSR;
  }


  const request = {
    method: HttpVerb.POST,
    url: `${getBaseApi(!!options.isSSR)}/members/search`,
    data: {
      query
    }
  };
  return executeRequest(request);
}

export function get(id) {
  const request = {
    method: HttpVerb.GET,
    url: `${getBaseApi()}/members/${id}/info`
  };
  return executeRequest(request);
}
