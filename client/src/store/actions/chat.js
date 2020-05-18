import { SEND_MESSAGE, CLEAN_CHAT } from './types';
import colors from '../../utils/colors';

export const sendMessage = (msg, userId) => (dispatch, getState) => {
    const { game } = getState();
    const players = game.gamePlayers.players;
    const board = game.gamePlayers.board;
    const playerIndex = players.findIndex((plr) => plr.key === userId);

    const data = {
        msg,
        nick: players[playerIndex].login,
        color: colors[board[userId].number],
        type: 'msg',
    };
    dispatch({
        type: SEND_MESSAGE,
        payload: data,
    });
};

export const setChatInfo = (msg) => {
    const data = {
        msg,
        type: 'info',
    };

    return {
        type: SEND_MESSAGE,
        payload: data,
    };
};

export const cleanChat = () => {
    return {
        type: CLEAN_CHAT,
    };
};
