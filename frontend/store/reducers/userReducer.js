import api from "../api";

export const UserTypes = new Proxy({
    RECEIVED_LOGIN: "RECEIVED_LOGIN",
    FAILED_LOGIN: "FAILED_LOGIN"
}, {
    set: () => {
        throw new Error("Can't mutate type UserTypes")
    }
});

const usersInitialState = {
    user: {},
    accessToken: "",
}


const userReducer = (state = usersInitialState, action) => {
    switch (action.type) {
        case UserTypes.RECEIVED_LOGIN:
            return {
                ...state,
                user: action.payload
            };
        case UserTypes.FAILED_LOGIN:
            return {
                ...state,
                user: {}
            }
        default:
            return state
    }
}

/**
 * 
 * @param {*} response Google response
 * @param {*} dispatch Redux dispatcher
 */
export const userLogin = async (response, dispatch) => {
    try {
        const user = await api.auth.login(response);
        if (user && user.body) {
            window.localStorage.setItem("refreshToken", user.body[0] && user.body[0].token)
            dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user.body[0] });
        }
        else {
            dispatch({ type: UserTypes.FAILED_LOGIN })
        }
        return user;
    }
    catch(err) {
        // TODO: Handle error 
        throw new Error(err);
    }
}

/**
 * 
 * @param {*} options 
 * @param {string} token 
 * @param {string} id 
 */
export const updateUser = async (dispatch, options, token, id) => {
    try {
        const res = await api.members.update(options, token, id);
        if (res && res.success) {
            const user = await api.members.getMember(id, token);
            if (user && user.success) {
                dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user.body[0] })
                return user;
            }
        }
        return;
    }
    catch(err) {
        throw new Error(err)
    }
}

export default userReducer;