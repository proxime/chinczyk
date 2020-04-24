import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setInviteGame, joinGame } from '../store/actions/game';
import { CLOSE_ALERT } from '../store/actions/types';

import '../scss/alert.scss';
import socket from '../utils/socket';

const Alert = ({ history }) => {
    const alert = useSelector(state => state.alert);
    const invite = useSelector(state => state.game.invite);
    const dispatch = useDispatch();

    const handleCloseAlert = () => {
        dispatch({ type: CLOSE_ALERT });
        if (alert.func) {
            alert.func();
        }
    };

    const handleCancelInvite = () => {
        dispatch(setInviteGame(null));
        handleCloseAlert();
    };

    const handleAcceptInvite = () => {
        if (invite) {
            dispatch(joinGame());
            socket.emit('acceptInvite', invite);
            dispatch(setInviteGame(null));
            history.push('/lobby');
        }
        handleCloseAlert();
    };

    if (!alert.open) return null;

    return (
        <>
            <div className="alert__popup">
                <div className="alert">
                    <div className="alert__title">{alert.title}</div>
                    <div className="alert__desc">{alert.msg}</div>
                    <div className="alert__button-container">
                        {alert.type === 'invite' ? (
                            <>
                                <div
                                    className="alert__button alert__button-accept"
                                    onClick={handleAcceptInvite}
                                >
                                    Akceptuj
                                </div>
                                <div
                                    className="alert__button alert__button-cancel"
                                    onClick={handleCancelInvite}
                                >
                                    Odrzuć
                                </div>
                            </>
                        ) : (
                            <div
                                className="alert__button"
                                onClick={handleCloseAlert}
                            >
                                Rozumiem
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Alert);
