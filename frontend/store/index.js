import { combineReducers, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import { membersStateReducer, membersInitialState } from './reducers/membersReducer';

const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['membersState'], // place to select which state you want to persist
}

const initInitialState = {
    membersState: membersInitialState
}

const rootReducer =  combineReducers({
    membersState: membersStateReducer
});



const persistedReducer = persistReducer(persistConfig, rootReducer)

export const initializeStore = (initialState = initInitialState) => {
    return createStore(
        persistedReducer,
        initialState,
    )
}


