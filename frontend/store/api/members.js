import { refreshable } from './baseApi';

/**
 * Search for all members in the database with filter options
 * @param {string} token
 * @param {*} filterOptions 
 * @returns {Promise<{name: string, subteam: string, role: string, imageUrl: string}[]>} members
 */
export function getAll(token, options = {isSSR: true}, dispatch, router) {
  if (options) {
    delete options.isSSR;
  }
  return refreshable("/api/members/search", token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      options,
      fields: ["name", "subteams", "memberType", "imageUrl", "stream"],
    })
  }, dispatch, router)
}

/**
 * Search for member by id
 * @param {string} id 
 * @returns {Promise<Member>} members
 */
export function getMember(id, token, dispatch, router) {
  return refreshable(`/api/members/${id}/info`, token, {}, dispatch, router)
}

export function getMemberEmail(id, token, dispatch, router) {
  return refreshable(`/api/members/${id}/email`, token, {}, dispatch, router)
}

export function getAccessToken(id) {
  return fetch(`/api/members/${id}/token`).then(res => res.json());
}


/**
 * Search for tasks by member id
 * @param {string} id 
 * @returns list of tasks belonging to id
 */
export function getMemberTasks(id, token, status, dispatch, router) {
  return refreshable(`/api/members/${id}/tasks`, token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({taskStatus: status})
  }, dispatch, router);
}


/**
 * 
 * @param {*} options 
 * @param {string} token 
 * @param {string} id
 */
export function update(options, token, id, dispatch, router) {
  return refreshable(`/api/members/${id}/update`, token, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data: options})
  }, dispatch, router)
}

/**
 * 
 * @param {string} token 
 * @param {string} id
 * @param {string} taskId
 * @param {string} status: the new status of the task: [pending, complete, irrelevant]
 */
export function updateTaskStatus(id, token, taskId, status, dispatch, router) {
  return refreshable(`/api/members/${id}/updateTaskStatus`, token, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({taskId: taskId, status: status})
  }, dispatch, router)
}

/**
 * 
 * @param {string} token 
 */
export function getFilterOptions(token, dispatch, router) {
  return refreshable(`/api/filters`, token, {}, dispatch, router)
}