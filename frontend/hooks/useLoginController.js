import { useEffect } from "react"
import { useSelector } from "react-redux"
import api from "../store/api"
import useShouldRedirect from "./useShouldRedirect"
import { useRouter } from "next/router"
import { UserTypes } from "../store/reducers/userReducer"

/**
 * @param {*} loginTransition
 * @param {*} dispatch
 */
export default (loginTransition, dispatch, route) => {
    const router = useRouter()
    const { hydrated, token, user } = useSelector(state => state.userState)
    useEffect(() => {
        if (hydrated && token) {
            api.auth.loginWithToken(token, dispatch, router).then(user => {
                dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user })
                if (!useShouldRedirect(user, router)) {
                    loginTransition.show()
                }
            }).catch(err => {
                console.error(err)
                if (!useShouldRedirect(user,router)) {
                    loginTransition.show()
                }
            })
            return;
        }
        if (hydrated) {
            if (!useShouldRedirect(user,router)) {
                loginTransition.show()
            }
            return;
        }
    }, [hydrated])
}