import { HttpVerb, executeRequest, getBaseApi } from '../baseApi';

export function getAll(options = {isSSR: true}) {
  let ssr = options.isSSR
  if (options) {
    delete options.isSSR;
  }
  console.log(options)
  const request = {
    method: HttpVerb.POST,
    url: `${getBaseApi(ssr)}/members/search`,
    data: {
      options,
      fields: ["name", "subteam", "role", "imageUrl"]
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
