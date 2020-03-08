import api from "../api";

// use proxy to make object immutable
export const MemberReducerTypes = new Proxy({
    SET_ALL_MEMBERS: "SET_ALL_MEMBERS",
    SET_SELECTED_MEMBER: "SET_SELECTED_MEMBER",
    ADD_LOADED_MEMBER: "ADD_LOADED_MEMBER",
    LOAD_FILTERS: "LOAD_FILTERS",
    FETCHING_DATA: "FETCHING_DATA"
}, {
    set: () => {
        throw new Error("Can't change const MemberReducerTypes")
    }
});

export const membersInitialState = {
    members: [],
    selectedMember: {},
    loadedMembers: {},
    filters: {},
    fetchingData: false
}
export default (state = membersInitialState, action) => {
    switch (action.type) {
        case "SET_ALL_MEMBERS":
            return {
                ...state,
                members: action.payload,
                fetchingData: false
            }
        case "SET_SELECTED_MEMBER":
            return {
                ...state,
                selectedMember: action.payload,
                fetchingData: false
            }

        case "ADD_LOADED_MEMBER":
            const {
                _id,
            } = action.payload;
            return {
                ...state,
                loadedMembers: {
                    ...state.loadedMembers,
                    [_id]: action.payload
                },
                fetchingData: false
            }
        case "LOAD_FILTERS":
            return {
                ...state,
                filters: action.payload,
                fetchingData: false
            }
        case MemberReducerTypes.FETCHING_DATA:
            return {
                ...state,
                fetchingData: true
            }
        case "persist/REHYDRATE":
            return {
                ...state,
                fetchingData: false
            }
        default:
            return state
    }
}

export async function searchMembers(dispatch, token, options = { isSSR: true }, router) {
    try {
        dispatch({ type: MemberReducerTypes.FETCHING_DATA })
        const res = await api.members.getAll(token, options, dispatch, router);
        if (res && res.success) {
            dispatch({
                type: MemberReducerTypes.SET_ALL_MEMBERS,
                payload: res.body
            });
        }
    } catch (err) {
      console.log('Error: Failed to initialize members - ', err);
    }
};

/**
 * 
 * @param {*} dispatch 
 * @param {string} token 
 * @param {string} id 
 */
export const lookupMember = async function(dispatch, token, id, router) {
    try {
        const res = await api.members.getMember(id, token, dispatch, router);
        if (res.success && res.body && res.body.length > 0) {
            dispatch({
                type: "ADD_LOADED_MEMBER",
                payload: res.body[0]
            });
            dispatch({
                type: "SET_SELECTED_MEMBER",
                payload: res.body[0]
            });
        }
    } catch (err) {
        console.log(`Error: Failed to fetch member with id ${id} `, err);
    }
};

export const getFilters = async function(dispatch, token, router) {
    try {
        dispatch({ type: MemberReducerTypes.FETCHING_DATA })
        const res = await api.members.getFilterOptions(token, dispatch, router);
        if (res.success && res.body) {
            dispatch({ type: MemberReducerTypes.LOAD_FILTERS, payload: res.body })
            return true
        }
        return false
    }
    catch(err) {
        return false
    }
}