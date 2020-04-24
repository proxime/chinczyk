import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import socket from '../../utils/socket';
import {
    TOGGLE_LOGIN_WINDOW,
    SET_AUTH_LOADING,
    CREATE_ACCOUNT,
    AUTH_ERROR,
    GET_USER,
    LOGIN,
    LOGOUT,
    SET_USER_ID,
} from './types';

export const toggleLoginWindow = window => dispatch => {
    dispatch({
        type: TOGGLE_LOGIN_WINDOW,
        payload: window,
    });
};

export const setAuthLoading = state => {
    return {
        type: SET_AUTH_LOADING,
        payload: state,
    };
};

export const getUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    } else return;

    try {
        dispatch(setAuthLoading(true));
        const res = await axios.get('/api/auth');
        socket.emit('login', { id: res.data._id, login: res.data.login });
        dispatch({
            type: GET_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: [{ msg: 'Coś poszło nie tak', param: 'token' }],
        });
    }
};

export const setUserId = id => {
    return {
        type: SET_USER_ID,
        payload: id,
    };
};

export const createAccount = (login, password) => async dispatch => {
    dispatch(setAuthLoading(true));
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({
            login,
            password,
        });
        const res = await axios.post('/api/auth/register', body, config);
        const token = res.data.token;
        window.localStorage.setItem('token', token);
        dispatch(getUser());
        dispatch({
            type: CREATE_ACCOUNT,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({
            type: AUTH_ERROR,
            payload: errors,
        });
    }
};

export const loginUser = (login, password) => async dispatch => {
    dispatch(setAuthLoading(true));
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({
            login,
            password,
        });
        const res = await axios.post('/api/auth/login', body, config);
        const token = res.data.token;
        window.localStorage.setItem('token', token);
        dispatch(getUser());
        dispatch({
            type: LOGIN,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({
            type: AUTH_ERROR,
            payload: errors,
        });
    }
};

export const logout = () => {
    socket.emit('logout');
    return {
        type: LOGOUT,
    };
};
