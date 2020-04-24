import { combineReducers } from 'redux';
import authReducer from './auth';
import alertReducer from './alert';
import gameReducer from './game';
import chatReducer from './chat';

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    game: gameReducer,
    chat: chatReducer,
});

export default rootReducer;
