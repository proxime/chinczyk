import {
    GET_PLAYERS,
    SET_INVITE_GAME,
    GET_GAME_PLAYERS,
    CREATE_GAME,
    JOIN_GAME,
    LEAVE_GAME,
    START_GAME,
    GET_RANDOM_NUMBER,
    NEXT_TURN,
    PAWN_MOVE,
    PLAYER_DISSCONNECT,
    PLAYER_RETURN,
    END_GAME,
    CLEAN_CHAT,
    REMOVE_GAME,
    KICK,
} from './types';
import { setAlert } from './alert';

export const getPlayers = (players) => {
    return {
        type: GET_PLAYERS,
        payload: players,
    };
};

export const setInviteGame = (id) => {
    return {
        type: SET_INVITE_GAME,
        payload: id,
    };
};

export const getGamePlayers = (players) => {
    return {
        type: GET_GAME_PLAYERS,
        payload: players,
    };
};

export const createGame = () => {
    return {
        type: CREATE_GAME,
    };
};

export const joinGame = () => {
    return {
        type: JOIN_GAME,
    };
};

export const leaveGame = () => (dispatch) => {
    dispatch({
        type: CLEAN_CHAT,
    });
    dispatch({
        type: LEAVE_GAME,
    });
};

export const removeGame = () => (dispatch) => {
    dispatch({
        type: CLEAN_CHAT,
    });
    dispatch({
        type: REMOVE_GAME,
    });
};

export const kick = () => (dispatch) => {
    dispatch({
        type: CLEAN_CHAT,
    });
    dispatch({
        type: KICK,
    });
};

export const startGame = (gameData) => {
    return {
        type: START_GAME,
        payload: gameData,
    };
};

export const getRandomNumber = (randomNumber, canMove) => {
    return {
        type: GET_RANDOM_NUMBER,
        payload: { randomNumber, canMove },
    };
};

export const nextTurn = (playerTurn) => {
    return {
        type: NEXT_TURN,
        payload: playerTurn,
    };
};

export const pawnMove = (board) => {
    return {
        type: PAWN_MOVE,
        payload: board,
    };
};

export const playerDissconnect = (nick) => {
    return {
        type: PLAYER_DISSCONNECT,
        payload: nick,
    };
};

export const playerReturn = (data) => {
    return {
        type: PLAYER_RETURN,
        payload: data,
    };
};

export const endGame = (winner) => (dispatch) => {
    dispatch(
        setAlert('Koniec gry', `Gra dobiegła końca, zwyciężył gracz ${winner}`)
    );
    dispatch({
        type: END_GAME,
    });
    dispatch({
        type: CLEAN_CHAT,
    });
};
