import { refreshable } from '../store/api/baseApi';

export const useFormDetails = (formId, dispatch, router) => {
  return refreshable('/api/form/' + formId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }, dispatch, router);
}

export const updateFormDetails = (formId, dispatch, router, reqBody) => {
  return refreshable('/api/form/' + formId + '/updateForm', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  }, dispatch, router);
}