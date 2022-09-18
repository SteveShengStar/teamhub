import api from '../api';

// use proxy to make object immutable
export const MemberReducerTypes = new Proxy(
    {
        SET_ALL_MEMBERS: 'SET_ALL_MEMBERS',
        SET_SELECTED_MEMBER: 'SET_SELECTED_MEMBER',
        ADD_LOADED_MEMBER: 'ADD_LOADED_MEMBER',
        LOAD_FILTERS: 'LOAD_FILTERS',
        FETCHING_DATA: 'FETCHING_DATA',
    },
    {
        set: () => {
            throw new Error("Can't change const MemberReducerTypes");
        },
    }
);

export const DataFetchType = new Proxy(
    {
        MEMBER: 'MEMBER',
        MEMBERS: 'MEMBERS',
        FILTERS: 'FILTERS',
        NOT_FETCHING: false,
    },
    {
        set: () => {
            throw new Error("Can't change const MemberReducerTypes");
        },
    }
);

export const membersInitialState = {
    members: [], // Bare minimum information displayed on the member-preview list components
    selectedMember: {}, //
    loadedMembers: {},
    filters: {},
    fetchingData: DataFetchType.NOT_FETCHING,
    fetchedMembers: false,
};
const membersReducer = (state = membersInitialState, action) => {
    switch (action.type) {
        case 'SET_ALL_MEMBERS':
            return {
                ...state,
                members: action.payload,
                fetchingData: DataFetchType.NOT_FETCHING,
                fetchedMembers: true,
            };
        case 'SET_SELECTED_MEMBER':
            return {
                ...state,
                selectedMember: action.payload,
                fetchingData: DataFetchType.NOT_FETCHING,
            };

        case 'ADD_LOADED_MEMBER':
            const { _id } = action.payload;
            return {
                ...state,
                loadedMembers: {
                    ...state.loadedMembers,
                    [_id]: action.payload,
                },
                fetchingData: DataFetchType.NOT_FETCHING,
            };
        case 'LOAD_FILTERS':
            return {
                ...state,
                filters: action.payload,
                fetchingData: DataFetchType.NOT_FETCHING,
            };
        case MemberReducerTypes.FETCHING_DATA:
            return {
                ...state,
                fetchingData: action.payload,
            };
        case 'persist/REHYDRATE':
            return {
                ...state,
                fetchingData: DataFetchType.NOT_FETCHING,
                fetchedMembers: false,
            };
        default:
            return state;
    }
};
export default membersReducer;

export async function searchMembers(
    dispatch,
    options = { isSSR: true },
    router
) {
    try {
        dispatch({
            type: MemberReducerTypes.FETCHING_DATA,
            payload: DataFetchType.MEMBERS,
        });
        const res = await api.members.getAll(options, dispatch, router);
        if (res && res.success) {
            dispatch({
                type: MemberReducerTypes.SET_ALL_MEMBERS,
                payload: res.body,
            });
        }
    } catch (err) {
        console.log('Error: Failed to initialize members - ', err);
    }
}

/**
 *
 * @param {*} dispatch
 * @param {string} id
 */
export const lookupMember = async function (dispatch, id, router) {
    try {
        dispatch({
            type: MemberReducerTypes.FETCHING_DATA,
            payload: DataFetchType.MEMBER,
        });
        const res = await api.members.getMember(id, dispatch, router);
        if (res.success && res.body && res.body.length > 0) {
            dispatch({
                type: 'ADD_LOADED_MEMBER',
                payload: res.body[0],
            });
            dispatch({
                type: 'SET_SELECTED_MEMBER',
                payload: res.body[0],
            });
        }
    } catch (err) {
        console.log(`Error: Failed to fetch member with id ${id} `, err);
    }
};

export const getFilters = async function (dispatch, router) {
    try {
        dispatch({
            type: MemberReducerTypes.FETCHING_DATA,
            payload: DataFetchType.FILTERS,
        });
        const res = await api.members.getFilterOptions(dispatch, router);
        if (res.success && res.body) {
            dispatch({
                type: MemberReducerTypes.LOAD_FILTERS,
                payload: res.body,
            });
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};
