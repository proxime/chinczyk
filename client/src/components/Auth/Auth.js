import React, { useRef } from 'react';
import LoginWindow from './LoginWindow';
import RegisterWindow from './RegisterWindow';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginWindow } from '../../store/actions/auth';

import '../../scss/authentication.scss';

const Auth = () => {
    const authWindow = useRef(null);
    const authPopup = useRef(null);

    const openNavigation = useSelector(state => state.auth.openWinow);

    const dispatch = useDispatch();

    const handleCloseWindow = e => {
        if (e.target === authPopup.current) setOpenNavigation(null);
    };

    const scrollWhenChange = () => {
        authPopup.current.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const setOpenNavigation = window => {
        dispatch(toggleLoginWindow(window));
    };

    if (!openNavigation) return null;

    return (
        <>
            <div
                className="authentication__popup"
                onClick={handleCloseWindow}
                ref={authPopup}
            >
                <div className="authentication" ref={authWindow}>
                    <div className="authentication__close-container">
                        <div
                            className="authentication__close"
                            onClick={() => setOpenNavigation(null)}
                        >
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                    {openNavigation === 'login' ? (
                        <LoginWindow
                            setOpenNavigation={setOpenNavigation}
                            scrollWhenChange={scrollWhenChange}
                        />
                    ) : (
                        <RegisterWindow
                            setOpenNavigation={setOpenNavigation}
                            scrollWhenChange={scrollWhenChange}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Auth;
