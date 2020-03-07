import { combineReducers, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import membersReducer, { membersInitialState } from './reducers/membersReducer';
import userReducer, { usersInitialState } from './reducers/userReducer';

const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['membersState', 'userState'], // place to select which state you want to persist
}

const initInitialState = {
    membersState: membersInitialState,
    userState: usersInitialState
}

const rootReducer =  combineReducers({
    membersState: membersReducer,
    userState: userReducer,
});



const persistedReducer = persistReducer(persistConfig, rootReducer)

export const initializeStore = (initialState = initInitialState) => {
    return createStore(
        persistedReducer,
        initialState,
    )
}


