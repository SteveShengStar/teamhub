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
    if (!user.name || !user.name.display) {
        // Redirect user to the 2nd step of the signup page
        if (router.pathname != "/login/name") {
            router.push("/login/name")
            return true
        }
        return false
    }
    if (!user.subteams || (user.subteams && user.subteams.length === 0) || !user.memberType) {
        // Redirect user to the 3rd step of the signup page
        if (router.pathname != "/login/role") {
            router.push("/login/role");
            return true
        }
        return false
    }
    if (!user.birthday) {
        // Redirect user to the 4th step of the signup page
        if (router.pathname != "/login/about") {
            router.push("/login/about");
            return true
        }
        return false
    }
    if (router.pathname.startsWith("/login")) {
        // If user entered all required information already (ie. "user" input parameter of this function already has the required fields set), then redirect the user to landing page.
        router.push("/");
        return true
    }
    return false
}
export default useShouldRedirect;