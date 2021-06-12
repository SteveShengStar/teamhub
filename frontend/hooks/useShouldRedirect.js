/**
 * @param {*} user
 * @param {*} router
 */
const useShouldRedirect = (user, router, redirectUrl) => {
    // if user is logged in check user status
    if (!user || !user._id) {
        if (router.pathname != "/login") {
            router.push("/login")
            return true
        }
        return false
    }
    if (!user.name || !user.name.display) {
        console.log(redirectUrl)
        console.log(encodeURIComponent(redirectUrl))
        if (router.pathname != "/login/authorize") {
            //router.push("/login/authorize")
            router.push({
                pathname: '/login/authorize',
                query: { redirectUrl: encodeURIComponent(redirectUrl) },
            })
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
    if (!user.birthday) {
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