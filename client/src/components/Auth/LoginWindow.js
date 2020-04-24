import React, { useState, useEffect, useCallback } from 'react';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions/auth';
import Spinner from '../Spinner';

const LoginWindow = ({ setOpenNavigation, scrollWhenChange }) => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const [validateErrors, setValidateErrors] = useState({
        login: '',
        password: '',
        other: '',
    });

    const isLoading = useSelector(state => state.auth.loading);
    const errors = useSelector(state => state.auth.errors);

    const dispatch = useDispatch();

    const { login, password } = formData;

    useEffect(() => {
        document.querySelector('body').classList.add('disabled');

        return () => {
            document.querySelector('body').classList.remove('disabled');
        };
    }, []);

    useEffect(() => {
        if (errors) {
            setValidateErrors(prevState => ({
                ...prevState,
                ...errors,
            }));
        }
    }, [errors]);

    const handleChangeData = useCallback(
        e => {
            e.persist();
            setFormData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        },
        [setFormData]
    );

    const handleChangeWindow = () => {
        setOpenNavigation('register');
        scrollWhenChange();
    };

    const handleLoginrUser = async e => {
        e.preventDefault();
        setValidateErrors({
            login: '',
            password: '',
            other: '',
        });
        let error = false;

        if (!login) {
            setValidateErrors(prevState => ({
                ...prevState,
                login: 'Wprowadź prawidłową nazwę użytkownika',
            }));
            error = true;
        }
        if (!password) {
            setValidateErrors(prevState => ({
                ...prevState,
                password: 'Wprowadź hasło',
            }));
            error = true;
        }
        if (error) return;
        dispatch(loginUser(login, password));
    };

    return (
        <>
            <div className="authentication__title">Zaolguj się</div>
            <div className="authentication__desc">
                Zaloguj przy pomocy nazwy uytkownika
            </div>
            {isLoading ? (
                <Spinner size={150} />
            ) : (
                <form
                    className="authentication__form"
                    onSubmit={handleLoginrUser}
                    noValidate
                >
                    <AuthInput
                        text="Nazwa uytkownika"
                        type="text"
                        name="login"
                        onChange={handleChangeData}
                        value={login}
                        error={validateErrors.login}
                        firstInput
                    />
                    <AuthInput
                        text="Hasło"
                        type="password"
                        name="password"
                        onChange={handleChangeData}
                        value={password}
                        error={validateErrors.password}
                    />
                    <div className="authentication__button-container">
                        <button className="authentication__button">
                            Zaloguj
                        </button>
                    </div>
                    {validateErrors.other && (
                        <div className="authentication__bad-credential">
                            {validateErrors.other}
                        </div>
                    )}
                </form>
            )}
            <div
                className="authentication__change"
                onClick={handleChangeWindow}
            >
                Nie masz konta?
            </div>
        </>
    );
};

export default LoginWindow;
