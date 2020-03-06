import { HttpVerb, executeRequest, getBaseApi } from './baseApi';

/**
 * Search for all members in the database with filter options
 * @param {string} token
 * @param {*} filterOptions 
 * @returns {Promise<{name: string, subteam: string, role: string, imageUrl: string}[]>} members
 */
export function getAll(token, options = {isSSR: true}) {
  let ssr = options.isSSR
  if (options) {
    delete options.isSSR;
  }
  return fetch("/api/members/search", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      options,
      fields: ["name", "subteam", "role", "imageUrl"]
    })
  }).then(res => res.json())
}

/**
 * Search for member by id
 * @param {string} id 
 * @returns {Promise<Member>} members
 */
export function getMember(id, token) {
  return fetch(`/api/members/${id}/info`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
}


/**
 * 
 * @param {*} options 
 * @param {string} token 
 * @param {string} id
 */
export function update(options, token, id) {
  return fetch(`/api/members/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify({data: options})
  }).then(res => res.json())
}

/**
 * 
 * @param {string} token 
 */
export function getFilterOptions(token) {
  return fetch(`/api/filters`, {
    headers: {
      "authorization": `Bearer ${token}`
    }
  }).then(res => res.json())
}