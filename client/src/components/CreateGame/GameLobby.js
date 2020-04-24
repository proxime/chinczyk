import React, { useEffect, useCallback } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Players from './Players';
import Chat from './Chat';
import { useSelector, useDispatch } from 'react-redux';
import { leaveGame } from '../../store/actions/game';
import socket from '../../utils/socket';

import '../../scss/create-game.scss';

const GameLobby = ({ history }) => {
    const loading = useSelector(state => state.auth.loading);
    const user = useSelector(state => state.auth.user);
    const inGame = useSelector(state => state.game.inGame);
    const gameId = useSelector(state => state.game.gamePlayers);

    const dispatch = useDispatch();

    const escapeFromGame = () => {
        socket.emit('escapeFromGame');
        dispatch(leaveGame());
        history.push('/');
    };

    useEffect(() => {
        if (gameId && gameId.started === true) return history.push('/game');
    }, [gameId, history]);

    if (!inGame || (!loading && !user)) {
        return <Redirect to="/" />;
    }

    return (
        <div className="create-game">
            <Players />
            <div className="create-game__btns">
                <div className="create-game__btn" onClick={escapeFromGame}>
                    Wyjdź z gry
                </div>
            </div>
            <Chat />
        </div>
    );
};

export default withRouter(GameLobby);
