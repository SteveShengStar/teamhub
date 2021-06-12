/**
 * @param {*} user
 * @param {*} router
 */
export default (user, router) => {
    // if user is logged in check user status
    if (!user || !user._id) {
        if (router.pathname != "/login") router.push("/login")
        return;
    }
    if (!user.name || !user.name.display) {
        if (router.pathname != "/login/authorize") router.push("/login/authorize")
        return;
    }
    if (!user.subteams || user.subteams.length === 0 || !user.memberType) {
        if (router.pathname != "/login/role") router.push("/login/role");
        return;
    }
    if (!user.bio) {
        if (router.pathname != "/login/about") router.push("/login/about");
        return;
    }
    if (router.pathname.startsWith("/login")) {
        router.push("/");
        return;
    }
}