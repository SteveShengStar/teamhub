import { refreshable } from './baseApi';

export const useFormDetails = (formId, dispatch, router) => {
  return refreshable('/api/form/' + formId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }, dispatch, router);
}