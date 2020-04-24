import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PlayersList from './PlayersList';
import Players from './Players';
import Chat from './Chat';
import { useSelector, useDispatch } from 'react-redux';
import { createGame } from '../../store/actions/game';
import { setAlert } from '../../store/actions/alert';
import socket from '../../utils/socket';

import '../../scss/create-game.scss';

const CreateGame = ({ history }) => {
    const loading = useSelector(state => state.auth.loading);
    const user = useSelector(state => state.auth.user);
    const isCreator = useSelector(state => state.game.isCreator);
    const gameId = useSelector(state => state.game.gamePlayers);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!loading && user) {
            socket.emit('createGame');
            dispatch(createGame());
        }
    }, [loading, user, dispatch]);

    useEffect(() => {
        if (gameId && gameId.started === true) return history.push('/game');
    }, [gameId, history]);

    const removeGame = () => {
        if (!gameId.id) return;
        socket.emit('removeGame', gameId.id);
        history.push('/');
    };

    const startGame = () => {
        if (!gameId.id) return;
        if (gameId.players.length === 1)
            return dispatch(
                setAlert(
                    'Błąd',
                    'Aby rozpocząć grę musi być minimum dwóch graczy'
                )
            );
        socket.emit('startGame', gameId.id);
    };

    if (!loading && !user) {
        return <Redirect to="/" />;
    }

    if (loading) return null;

    return (
        <div className="create-game">
            <Players />
            <div className="create-game__btns">
                <div className="create-game__btn" onClick={startGame}>
                    Rozpocznij grę
                </div>
                <div className="create-game__btn" onClick={removeGame}>
                    Wyjdź z gry
                </div>
            </div>
            <Chat />
            {isCreator && <PlayersList />}
        </div>
    );
};

export default withRouter(CreateGame);
