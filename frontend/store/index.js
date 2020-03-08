import { combineReducers, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import membersReducer, { membersInitialState } from './reducers/membersReducer';
import userReducer, { usersInitialState, UserTypes } from './reducers/userReducer';

const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['membersState', 'userState'], // place to select which state you want to persist
}

const initInitialState = {
    membersState: membersInitialState,
    userState: usersInitialState
}

const appReducer = combineReducers({
    membersState: membersReducer,
    userState: userReducer,
});


const rootReducer = (state, action) => {
    console.log(action, state)
    if (action.type === 'RESET') {
        state = initInitialState
    }
    if (action.type === UserTypes.RECEIVED_LOGIN) {
        state = { ...state, userState: { ...state.userState, hydrated: true } }
    }
    return appReducer(state, action)
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const initializeStore = (initialState = initInitialState) => {
    return createStore(
        persistedReducer,
        initialState,
    )
}