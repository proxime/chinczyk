import { SEND_MESSAGE, CLEAN_CHAT } from '../actions/types';

const initState = [];

export default (state = initState, action) => {
    const { payload, type } = action;

    switch (type) {
        case SEND_MESSAGE:
            return [...state, payload];
        case CLEAN_CHAT:
            return initState;
        default:
            return state;
    }
};
