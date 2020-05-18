import { ALREADY_LOGIN } from './store/actions/types';
import { getUser, setUserId } from './store/actions/auth';
import { sendMessage, setChatInfo } from './store/actions/chat';
import { setAlert } from './store/actions/alert';
import {
    getPlayers,
    setInviteGame,
    joinGame,
    getGamePlayers,
    startGame,
    getRandomNumber,
    showDice,
    nextTurn,
    pawnMove,
    playerDissconnect,
    playerReturn,
    endGame,
    removeGame,
    kick,
} from './store/actions/game';
import socket from './utils/socket';

const initApp = (store) => {
    store.dispatch(getUser());

    socket.on('isLogin', (isLogin) => {
        if (isLogin === true) {
            store.dispatch({
                type: ALREADY_LOGIN,
            });
            store.dispatch(
                setAlert('Błąd', 'Ktoś już jest zalogowany na twoje konto!')
            );
        } else {
            store.dispatch(setUserId(isLogin));
        }
    });

    socket.on('getPlayersList', (users) => {
        store.dispatch(getPlayers(users));
    });

    socket.on('playerNotFound', (users) => {
        store.dispatch(getPlayers(users));
        store.dispatch(
            setAlert(
                'Nie znaleziono',
                'Gracz nie mógł zostać zaproszony, prawdopodobnie nie jest dostępny lub jest w innej grze'
            )
        );
    });

    socket.on('gameNotFound', () => {
        store.dispatch(setInviteGame(null));
        store.dispatch(
            setAlert('Nie znaleziono', 'Gra nie została znaleziona')
        );
    });

    socket.on('err', () => {
        store.dispatch(setInviteGame(null));
        store.dispatch(
            setAlert('Błąd', 'Ups... Coś poszło nie tak, spróbuj ponownie')
        );
    });

    socket.on('inviteToGame', (data) => {
        const { id, inviter } = data;
        store.dispatch(setInviteGame(id));
        store.dispatch(
            setAlert(
                'Zaproszenie do gry',
                `Gracz ${inviter} zaprasza cię do gry`,
                'invite'
            )
        );
    });

    socket.on('join', (data) => {
        store.dispatch(getGamePlayers(data));
    });

    socket.on('joinGame', () => {
        store.dispatch(joinGame());
    });

    socket.on('kick', () => {
        store.dispatch(kick());
        store.dispatch(
            setAlert('Zostałeś wyrzucony', 'Niestety zostałeś wyrzucony z gry')
        );
    });

    socket.on('notEnoughPlayers', () => {
        store.dispatch(kick());
        store.dispatch(
            setAlert(
                'Gracz opuścił mecz',
                'Niestety gracz opuścił grę i nie ma odpowiedniej ilości graczy'
            )
        );
    });

    socket.on('removeGame', () => {
        store.dispatch(removeGame());
    });

    socket.on('startGame', (data) => {
        store.dispatch(startGame(data));
    });

    socket.on('chat', (data) => {
        store.dispatch(sendMessage(data.msg, data.user));
    });

    socket.on('chatInfo', (msg) => {
        store.dispatch(setChatInfo(msg));
    });

    socket.on('randomNumber', (data) => {
        const { randomNumber, canMove } = data;
        store.dispatch(getRandomNumber(randomNumber, canMove));
    });

    socket.on('showDice', (dice) => {
        store.dispatch(showDice(dice));
    });

    socket.on('nextTurn', (playerTurn) => {
        store.dispatch(nextTurn(playerTurn));
    });

    socket.on('pawnMove', (board) => {
        store.dispatch(pawnMove(board));
    });

    socket.on('dissconnect', (nick) => {
        store.dispatch(playerDissconnect(nick));
    });

    socket.on('return', (data) => {
        store.dispatch(playerReturn(data));
    });

    socket.on('end-game', (data) => {
        const { board, winner } = data;
        store.dispatch(pawnMove(board));
        store.dispatch(endGame(winner));
    });
};

export default initApp;
