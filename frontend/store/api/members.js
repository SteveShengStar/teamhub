import { refreshable } from './baseApi';

/**
 * Search for all members in the database with filter options
 * @param {*} filterOptions
 * @returns {Promise<{name: string, subteam: string, role: string, imageUrl: string}[]>} members
 */
export function getAll(options = { isSSR: true }, dispatch, router) {
    if (options) {
        delete options.isSSR;
    }
    return refreshable(
        '/api/members/search',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                options,
                fields: [
                    'name',
                    'subteams',
                    'memberType',
                    'imageUrl',
                    'stream',
                ],
            }),
        },
        dispatch,
        router
    );
}

/**
 * Search for member by id
 * @param {string} id
 * @returns {Promise<Member>} members
 */
export function getMember(id, dispatch, router) {
    return refreshable(`/api/members/${id}/info`, {}, dispatch, router);
}

export function getMemberEmail(id, dispatch, router) {
    return refreshable(`/api/members/${id}/email`, {}, dispatch, router);
}

/**
 * Search for tasks by member id
 * @param {string} id
 * @returns list of tasks belonging to id
 */
export function getMemberTasks(id, status, dispatch, router) {
    return refreshable(
        `/api/members/${id}/tasks`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskStatus: status }),
        },
        dispatch,
        router
    );
}

/**
 *
 * @param {*} options
 * @param {string} id
 */
export function update(options, id, dispatch, router) {
    return refreshable(
        `/api/members/${id}/update`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: options }),
        },
        dispatch,
        router
    );
}

/**
 *
 * @param {string} id
 * @param {string} taskId
 * @param {string} status: the new status of the task: [pending, complete, irrelevant]
 */
export function updateTaskStatus(id, taskId, status, dispatch, router) {
    return refreshable(
        `/api/members/${id}/updateTaskStatus`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId: taskId, status: status }),
        },
        dispatch,
        router
    );
}

export function getFilterOptions(dispatch, router) {
    return refreshable(`/api/filters`, {}, dispatch, router);
}
