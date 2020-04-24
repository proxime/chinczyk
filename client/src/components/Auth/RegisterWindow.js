import React, { useState, useEffect, useCallback } from 'react';
import AuthInput from './AuthInput';
import { createAccount } from '../../store/actions/auth';
import validate from 'validate.js';
import Spinner from '../Spinner';
import { useSelector, useDispatch } from 'react-redux';

const RegisterWindow = ({ setOpenNavigation, scrollWhenChange }) => {
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
        setOpenNavigation('login');
        scrollWhenChange();
    };

    const handleRegisterUser = async e => {
        e.preventDefault();
        setValidateErrors({
            login: '',
            password: '',
            other: '',
        });
        let error = false;
        var constraints = {
            login: {
                presence: true,
                length: {
                    minimum: 4,
                },
            },
            password: {
                presence: true,
                length: {
                    minimum: 6,
                },
            },
        };

        const validateResult = validate({ login, password }, constraints);
        if (validateResult) {
            if (validateResult.login) {
                setValidateErrors(prevState => ({
                    ...prevState,
                    login: 'Login musi zawierać minimum 4 znaki',
                }));
                error = true;
            }
            if (validateResult.password) {
                setValidateErrors(prevState => ({
                    ...prevState,
                    password: 'Hasło musi zawierać minimum 6 znaków',
                }));
                error = true;
            }
        }
        if (error) return;
        dispatch(createAccount(login, password));
    };

    return (
        <>
            <div className="authentication__title">Rejestracja</div>
            <div className="authentication__desc">
                Rejestracja przy pomocy nazwy użytkownika
            </div>
            {isLoading ? (
                <Spinner size={150} />
            ) : (
                <form
                    className="authentication__form"
                    onSubmit={handleRegisterUser}
                    noValidate
                >
                    <AuthInput
                        text="Nazwa użytkownika"
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
                            Zarejestruj
                        </button>
                    </div>
                </form>
            )}
            <div
                className="authentication__change"
                onClick={handleChangeWindow}
            >
                Masz już konto?
            </div>
        </>
    );
};

export default RegisterWindow;
