import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import api from "../store/api"
import useRedirect from "./useRedirect"
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
            api.auth.loginWithToken(token).then(user => {
                dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user })
                if (route == "/login") useRedirect(user, router)
                else loginTransition.show()
            }).catch(err => {
                console.error(err)
                if (route == "/login") loginTransition.show()
                else useRedirect(user, router)
            })
            return;
        }
        if (hydrated) {
            if (route == "/login") loginTransition.show()
            else useRedirect(user, router)
            return;
        }
        loginTransition.show()
    }, [hydrated])
}