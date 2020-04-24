import { SET_ALERT, CLOSE_ALERT } from '../actions/types';

const initState = {
    open: false,
    msg: '',
    title: '',
    type: '',
    func: null,
};

export default (state = initState, action) => {
    const { payload, type } = action;

    switch (type) {
        case SET_ALERT:
            return {
                ...state,
                ...payload,
                open: true,
            };
        case CLOSE_ALERT:
            return initState;
        default:
            return state;
    }
};
