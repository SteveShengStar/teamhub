/**
 * @param {*} user
 * @param {*} router
 */
const useShouldRedirect = (user, router) => {
    // if user is logged in check user status
    if (!user || !user._id) {
        if (router.pathname != "/login") {
            router.push("/login")
            return true
        }
        return false
    }
    if (!user.name || !user.name.display) {
        if (router.pathname != "/login/name") {
            router.push("/login/name")
            return true
        }
        return false

    }
    if (!user.subteams || (user.subteams && user.subteams.length === 0) || !user.memberType) {
        if (router.pathname != "/login/role") {
            router.push("/login/role");
            return true
        }
        return false
    }
    if (!user.bio) {
        if (router.pathname != "/login/about") {
            router.push("/login/about");
            return true
        }
        return false
    }
    if (router.pathname.startsWith("/login")) {
        router.push("/");
        return true
    }
    return false
}
export default useShouldRedirect;