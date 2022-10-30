import { USER_REGISTRATION_REQUIRED_FIELDS } from '../constants';

/**
 * Redirects the user to the appropriate webpage.
 *
 * @param {*} user            member details
 * @param {*} router          router object
 * @param {*} isExistingUser  whether the user is an existing user (not a new user)
 */
const useShouldRedirect = (user, router, isExistingUser) => {
    if (!isExistingUser) {
        if (!user || !user._id) {
            // Redirect user to the initial login/signup page
            if (router.pathname != '/login') {
                router.push('/login');
                return true;
            }
            return false;
        }

        const userFields = Object.keys(user);
        if (
            USER_REGISTRATION_REQUIRED_FIELDS.some(
                (field) => !userFields.includes(field)
            )
        ) {
            // TODO: add all the necessary checks, to handle page refresh
            // Redirect user to the 2nd step of the sign-up process
            if (router.pathname != '/login/register') {
                router.push('/login/register');
                return true;
            }
            return false;
        }
    }

    if (router.pathname.startsWith('/login')) {
        // If user entered all required information already, then redirect the user to landing page.
        router.push('/');
        return true;
    }
    return false;
};
export default useShouldRedirect;
