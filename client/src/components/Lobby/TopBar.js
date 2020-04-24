import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginWindow, logout } from '../../store/actions/auth';

const TopBar = () => {
    const loading = useSelector(state => state.auth.loading);
    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();

    const setOpenNavigation = window => {
        dispatch(toggleLoginWindow(window));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="top-bar">
            <div className="top-bar__title">Chińczyk</div>
            {!loading && (
                <div className="top-bar__panel">
                    {!user ? (
                        <>
                            <div
                                className="top-bar__login"
                                onClick={() => setOpenNavigation('login')}
                            >
                                Zaloguj się
                            </div>
                            <div
                                className="top-bar__register"
                                onClick={() => setOpenNavigation('register')}
                            >
                                Rejestracja
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="top-bar__login"
                                onClick={handleLogout}
                            >
                                Wyloguj się
                            </div>
                            <Link
                                to="/create-game"
                                className="top-bar__create "
                            >
                                Stwórz grę
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default TopBar;
