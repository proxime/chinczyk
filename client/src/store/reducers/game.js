import {
    GET_PLAYERS,
    SET_INVITE_GAME,
    GET_GAME_PLAYERS,
    CREATE_GAME,
    KICK,
    JOIN_GAME,
    REMOVE_GAME,
    LEAVE_GAME,
    START_GAME,
    GET_RANDOM_NUMBER,
    NEXT_TURN,
    PAWN_MOVE,
} from '../actions/types';

const initState = {
    players: [],
    invite: null,
    gamePlayers: null,
    isCreator: false,
    inGame: false,
    dice: null,
    canMove: {},
};

export default (state = initState, action) => {
    const { payload, type } = action;

    switch (type) {
        case GET_PLAYERS:
            const players = [];
            for (const key in payload) {
                players.push({ login: payload[key], socket: key });
            }
            return {
                ...state,
                players,
            };
        case SET_INVITE_GAME:
            return {
                ...state,
                invite: payload,
            };
        case GET_GAME_PLAYERS:
        case START_GAME:
            return {
                ...state,
                gamePlayers: payload,
            };
        case CREATE_GAME:
            return {
                ...state,
                isCreator: true,
                inGame: true,
            };
        case JOIN_GAME:
            return {
                ...state,
                inGame: true,
            };
        case GET_RANDOM_NUMBER:
            return {
                ...state,
                dice: payload.randomNumber,
                canMove: payload.canMove,
            };
        case NEXT_TURN:
            return {
                ...state,
                dice: null,
                canMove: {},
                gamePlayers: {
                    ...state.gamePlayers,
                    turn: payload,
                },
            };
        case PAWN_MOVE:
            return {
                ...state,
                canMove: {},
                gamePlayers: {
                    ...state.gamePlayers,
                    board: payload,
                },
            };
        case KICK:
        case REMOVE_GAME:
        case LEAVE_GAME:
            return initState;
        default:
            return state;
    }
};
