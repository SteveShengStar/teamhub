import { combineReducers } from 'redux';
import { configureStore } from 'redux-starter-kit';

import membersReducer from './reducers/membersSlice';

const rootReducer = combineReducers({
    members: membersReducer
});

export default configureStore({
    reducer: rootReducer
});
