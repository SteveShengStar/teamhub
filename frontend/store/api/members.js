import { HttpVerb, executeRequest, getBaseApi } from './baseApi';

/**
 * Search for all members in the database with filter options
 * @param {*} filterOptions 
 * @returns {Promise<{name: string, subteam: string, role: string, imageUrl: string}[]>} members
 */
export function getAll(options = {isSSR: true}) {
  let ssr = options.isSSR
  if (options) {
    delete options.isSSR;
  }
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

/**
 * Search for member by id
 * @param {string} id 
 * @returns {Promise<Member>} members
 */
export function getMember(id) {
  const request = {
    method: HttpVerb.GET,
    url: `${getBaseApi()}/members/${id}/info`
  };
  return executeRequest(request);
}
