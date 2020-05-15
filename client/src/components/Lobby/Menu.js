import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginWindow, logout } from '../../store/actions/auth';

const Menu = () => {
    const loading = useSelector((state) => state.auth.loading);
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    const setOpenNavigation = (window) => {
        dispatch(toggleLoginWindow(window));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="menu">
            {!loading && (
                <div className="menu__panel">
                    {!user ? (
                        <>
                            <div
                                className="menu__option"
                                onClick={() => setOpenNavigation('login')}
                            >
                                Zaloguj się
                            </div>
                            <div
                                className="menu__option"
                                onClick={() => setOpenNavigation('register')}
                            >
                                Rejestracja
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/create-game" className="menu__option">
                                Stwórz grę
                            </Link>
                            <div
                                className="menu__option"
                                onClick={handleLogout}
                            >
                                Wyloguj się
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Menu;
