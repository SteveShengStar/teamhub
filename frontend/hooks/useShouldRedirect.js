/**
 * @param {*} user
 * @param {*} router
 */
const useShouldRedirect = (user, router, redirectUrl, token) => {
    if (!user || !user._id) {   
        if (router.pathname != "/login") {
            router.push("/login")
            return true // show the page transition/load animation
        }
        return false    // since we are not transitioning to new page, don't show the page transition/load animation
    }
    if (!token) {
        if (router.pathname != "/login/authorize") {
            router.push({
                pathname: '/login/authorize',
                query: { redirectUrl: encodeURIComponent(redirectUrl) },    // TODO: put this in the Redux store.
            })
            return true // show the page transition/load animation
        }
        return false    // since we are not transitioning to new page, don't show the page transition/load animation
    }
    if (!user.name || !user.name.display) {
        console.log(encodeURIComponent(redirectUrl))
        if (router.pathname != "/login/name") {
            router.push('/login/name');
            return true // show the page transition/load animation
        }
        return false    // since we are not transitioning to new page, don't show the page transition/load animation
    }
    if (!user.subteams || (user.subteams && user.subteams.length === 0) || !user.memberType) {
        if (router.pathname != "/login/role") {
            router.push("/login/role");
            return true // show the page transition/load animation
        }
        return false    // since we are not transitioning to new page, don't show the page transition/load animation
    }
    if (!user.birthday) {
        if (router.pathname != "/login/about") {
            router.push("/login/about");
            return true // show the page transition/load animation
        }
        return false    // since we are not transitioning to new page, don't show the page transition/load animation
    }
    if (router.pathname.startsWith("/login")) {
        router.push("/");
        return true     // show the page transition/load animation
    }
    return false        // since we are not transitioning to new page, don't show the page transition/load animation
}
export default useShouldRedirect;