import {
    TOGGLE_LOGIN_WINDOW,
    CREATE_ACCOUNT,
    SET_AUTH_LOADING,
    AUTH_ERROR,
    GET_USER,
    LOGIN,
    LOGOUT,
    ALREADY_LOGIN,
    SET_USER_ID,
} from '../actions/types';

const initState = {
    user: null,
    userId: null,
    loading: false,
    openWinow: null,
    token: null,
    errors: null,
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case TOGGLE_LOGIN_WINDOW:
            return {
                ...state,
                openWinow: payload,
                errors: null,
            };
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: payload,
            };
        case GET_USER:
            return {
                ...state,
                token: localStorage.token,
                user: payload,
            };
        case SET_USER_ID:
            return {
                ...state,
                userId: payload,
                loading: false,
            };
        case CREATE_ACCOUNT:
        case LOGIN:
            return {
                ...state,
                openWinow: null,
            };
        case LOGOUT:
        case ALREADY_LOGIN:
            window.localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                loading: false,
            };
        case AUTH_ERROR:
            const errors = {};
            if (payload) {
                payload.forEach(err => (errors[err.param] = err.msg));
            }

            return {
                ...state,
                token: null,
                user: null,
                loading: false,
                errors,
            };
        default:
            return state;
    }
};
