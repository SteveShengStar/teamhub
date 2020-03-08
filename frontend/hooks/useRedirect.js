import { useRouter } from "next/router"

/**
 * @param {*} user
 * @param {*} router
 */
export default (user, router) => {
    // if user is logged in check user status
    if (!user._id) {
        if (router.pathname != "/login") router.push("/login")
        return;
    }
    if (!user.name || !user.name.display) {
        if (router.pathname != "/login/name") router.push("/login/name")
        return;
    }
    if (user.subteams.length === 0 || !user.memberType || !user.projects.length === 0 || !user.joined) {
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