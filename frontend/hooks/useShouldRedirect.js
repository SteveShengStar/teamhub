import { USER_REGISTRATION_REQUIRED_FORM_FIELDS } from '../constants';

/**
 * Redirects the user to the appropriate webpage.
 * 
 * @param {*} user
 * @param {*} router
 */
const useShouldRedirect = (user, router) => {
    if (!user || !user._id) {
         // Redirect user to the initial login/signup page
        if (router.pathname != "/login") {
            router.push("/login")
            return true
        }
        return false
    }

    const userFields = Object.keys(user);
    if (USER_REGISTRATION_REQUIRED_FORM_FIELDS.some(field => !userFields.includes(field))) { // TODO: add all the necessary checks, to handle page refresh
        // Redirect user to the 2nd step of the sign-up process
        if (router.pathname != "/login/register") {
            router.push("/login/register")
            return true
        }
        return false
    }
    
    // TODO: is this needed ?
    if (router.pathname.startsWith("/login")) {
        // If user entered all required information already, then redirect the user to landing page.
        router.push("/");
        return true
    }
    return false
}
export default useShouldRedirect;