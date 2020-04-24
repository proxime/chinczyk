import { SET_ALERT } from './types';

export const setAlert = (title, msg, type, func) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: {
            title,
            msg,
            type,
            func,
        },
    });
};
