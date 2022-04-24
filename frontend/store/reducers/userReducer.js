import api from '../api';

export const UserTypes = new Proxy(
  {
    RECEIVED_LOGIN: 'RECEIVED_LOGIN',
    FAILED_LOGIN: 'FAILED_LOGIN',
    UPDATE_INFO: 'UPDATE_INFO',
    RECEIVED_LOGOUT: 'RECEIVED_LOGOUT',
  },
  {
    set: () => {
      throw new Error("Can't mutate type UserTypes");
    },
  }
);

export const usersInitialState = {
  user: {},
  hydrated: false,
};

const userReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case UserTypes.UPDATE_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case UserTypes.RECEIVED_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case UserTypes.RECEIVED_LOGOUT:
      return {
        ...state,
        user: {}
      };
    case UserTypes.FAILED_LOGIN: // TODO: look at what this behaviour will lead to
      return {
        ...state,
        user: {},
      };
    case 'persist/REHYDRATE':
      const userState = action.payload && action.payload.userState;
      return {
        ...state,
        ...(userState && { ...userState }),
        hydrated: true,
      };
    default:
      return state;
  }
};

/**
 *
 * @param {*} response Google response
 * @param {*} dispatch Redux dispatcher
 */
export const userLogin = async (response, dispatch) => {
  try {
    const res = await api.auth.login(response);
    const user = (res && res.body && res.body[0]) || res.body;
    if (user) {
      dispatch({
        type: UserTypes.RECEIVED_LOGIN,
        payload: user
      });
    } else {
      dispatch({ type: UserTypes.FAILED_LOGIN });
    }
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

export const userLogout = async (userId, dispatch, router) => {
    const res = await api.auth.logout(userId, dispatch, router);
    if (res && res.success) {
      dispatch({ type: UserTypes.RECEIVED_LOGOUT });
    } else {
      console.error("Received a 403 return code. The user login token must have expired.");
    }
};

/**
 *
 * @param {*} options
 * @param {string} id
 */
export const updateUser = async (
  dispatch,
  options,
  id,
  router
) => {
  try {
    const res = await api.members.update(options, id, dispatch, router);
    if (res && res.success) {
      const user = await api.members.getMember(id, dispatch, router);
      if (user && user.success) {
        dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user.body[0] });
        return user.body[0];
      }
    }
    throw new Error("userReducer.js#updateUser(): Failed to retrieve user data.");
  } catch (err) {
    throw new Error(err);
  }
};

/**
 *
 * @param {*} options
 * @param {string} id
 */
export const updateProfileInfo = async (
  dispatch,
  options,
  id,
  router
) => {
  try {
    const res = await api.members.update(options, id, dispatch, router);
    if (res && res.success) {
      return await api.members.getMember(id, dispatch, router);
    }
    throw new Error("userReducer.js#updateUser(): Failed to retrieve user data.");
  } catch (err) {
    throw new Error(err);
  }
};


export const getProfileInfo = async function (dispatch, id, router) {
  try {
    const user = await api.members.getMember(id, dispatch, router);
    dispatch({ type: UserTypes.UPDATE_INFO, payload: user.body[0] });
    return user.body[0];
  } catch (err) {
    console.log(
      `Error: Failed to return profile data for user with id: ${id} `,
      err
    );
  }
};

export default userReducer;
