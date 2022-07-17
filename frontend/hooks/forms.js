import { refreshable } from '../store/api/baseApi';

/**
 * Get IDs and names of all Waterloop forms
 */
export const useForms = (dispatch, router) => {
  return refreshable('/api/form/getAll', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }, dispatch, router);
}

/**
 * Get metadata for 1 specific form (identified by formId)
 */
export const useFormDetails = (formId, dispatch, router) => {
  return refreshable('/api/form/' + formId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }, dispatch, router);
}

/**
 * Get metadata for 1 specific form and Waterloop member
 */
export const useFormAndUserDetails = (formId, dispatch, router, userId) => {
  return refreshable('/api/form/' + formId + '/user/' + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }, dispatch, router);
}

/**
 * Update metadata for a particular form
 */
export const updateFormDetails = (formId, dispatch, router, reqBody) => {
  return refreshable('/api/form/' + formId + '/updateForm', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  }, dispatch, router);
}