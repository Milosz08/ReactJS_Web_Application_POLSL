/**
 * @file ChangeCredentials.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                CryptoJS: "^4.1.1"
 *                uuid: "^8.3.1"
 *                ReactCssModules: "^4.7.11"
 *
 * @date final version: 08/24/2021
 */

import React, { ChangeEvent, useEffect, useState } from 'react';
import CryptoJS, { AES, enc } from 'crypto-js';
import axiosInstance from '../../../../../../helpers/request';
import { v4 as uuidv4 } from 'uuid';
import ChangeTypeOfCredentials from './ChangeTypeOfCredentials';

const ShowHideAuthVisible = React.lazy(() => import('./ShowHideAuthVisible'));
const GenerateAuthFields = React.lazy(() => import('./GenerateAuthFields'));

const {
    changeCredentialsForm, loginField, confirmViaAdminPasswordField, inputNewAdminToken, errorValue, submitForm
} = require('./../HomePanel.module.scss');

/**
 * The interface that defines the data types for the state.
 */
interface BooleansProvider {
    [value: string]: boolean;
}

/**
 * The interface that defines the data types for the state.
 */
interface CredentialsStateProvider {
    ifVisible: boolean;
    value: string;
}

/**
 * The interface that defines the data types for the state.
 */
interface HashProvider {
    password: string;
    token: string;
}

/**
 * Enumeration type stored all credentials levels using in whole webapp.
 */
export enum CREDENTIALS {
    USER, MODERATOR, ADMIN
}

/**
 * @details A component that allows you to change the authentication for administrators, content moderators and users. Active
 *          component only for class 2 administrators (top level, primary system administrator). The component connects to
 *          the database, sends it new passwords, encrypting them with the AES method together with each time setting a secret
 *          512-bit key based on the password.
 *
 * @param ifUser { boolean } - flag indicating whether the component is running for a user or an administrator.
 * @param disableButton { boolean } - flag to enable / disable the submit form button.
 */
const ChangeCredentials: React.FC<BooleansProvider> = ({ ifUser, disableButton }): JSX.Element => {

    const [ newCredent, setNewCredent ] = useState<{ login: string, passwords: any[] }>({
        login: '',
        passwords: Array.from({ length: 2 }, () => ({ id: uuidv4(), ifVisible: false, value: '' })),
    });
    const [ confirmViaAdmin, setConfirmViaAdmin ] = useState<CredentialsStateProvider>({ ifVisible: false, value: '' });
    const [ adminToken, setAdminToken ] = useState<CredentialsStateProvider>({ ifVisible: false, value: '' });
    const [ adminCredHash, setAdminCredHash ] = useState<HashProvider>({ password: '', token: '' });
    const [ errors, setErrors ] = useState<BooleansProvider>({
        login: false, password: false, passNotMath: false, token: false, notValidAdminPass: false,
    });

    const [ authFieldType, setAuthFieldType ] = useState<number>(CREDENTIALS.MODERATOR);

    const handleConfirmViaAdminVisible = (): void => {
        if (confirmViaAdmin.value !== '') {
            setConfirmViaAdmin(prevState => ({ ...confirmViaAdmin, ifVisible: !prevState.ifVisible }));
        }
    }

    const handleTokenVisible = (): void => {
        if (adminToken.value !== '') {
            setAdminToken(prevState => ({ ...adminToken, ifVisible: !prevState.ifVisible }))
        }
    }

    const validateData = (): { [value: string]: boolean } => {
        let loginBool = false, passBool = false, passNotMathBool = false, tokenBool = false;
        const { login, passwords } = newCredent;
        const { value } = adminToken;
        if (login.length < 5 || login.length > 20 || login.indexOf(' ') >= 0) {
            loginBool = true;
        }
        if (passwords[0].value.length < 5 || passwords[0].value.length > 20 || passwords[0].value.indexOf(' ') >= 0) {
            passBool = true;
        }
        if (passwords[0].value !== passwords[1].value) {
            passNotMathBool = true;
        }
        if (!ifUser && (value.length < 5 || value.length > 20 || value.indexOf(' ') >= 0)) {
            tokenBool = true;
        }
        return { loginBool, passBool, passNotMathBool, tokenBool };
    }

    const sendChangeCredentials = async (): Promise<any> => {
        const { REACT_APP_MODERATOR_ID, REACT_APP_USER_ID, REACT_APP_ADMIN_ID } = process.env;

        const salt = CryptoJS.lib.WordArray.random(128 / 8);
        const key512bits = CryptoJS.PBKDF2(newCredent.passwords[0].value, salt, { keySize: 512 / 32 })
        const hashKey = key512bits.toString(enc.Hex);

        const cryptLogin = AES.encrypt(newCredent.login, hashKey).toString();
        const cryptPassword = AES.encrypt(newCredent.passwords[0].value, hashKey).toString();

        if (!ifUser) { //not user
            const cryptAdminToken = AES.encrypt(adminToken.value, hashKey).toString();
            switch (authFieldType) {
                case CREDENTIALS.MODERATOR: //moderator (1 of rank)
                    await axiosInstance.put(`authentication/${REACT_APP_MODERATOR_ID}`, {
                        role: 1, login: cryptLogin, password: cryptPassword, token: hashKey, adminToken: cryptAdminToken
                    });
                    break;
                case CREDENTIALS.ADMIN: //administrator (2 of rank)
                    await axiosInstance.put(`authentication/${REACT_APP_ADMIN_ID}`, {
                        role: 2, login: cryptLogin, password: cryptPassword, token: hashKey, adminToken: cryptAdminToken
                    });
                    break;
            }
        } else { //user (0 of rank)
            await axiosInstance.put(`authentication/${REACT_APP_USER_ID}`, {
                role: 0, login: cryptLogin, password: cryptPassword, token: hashKey
            });
        }
    }

    const handleSubmitSendCredentials = (e: ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const decrAdminPassword = AES.decrypt(adminCredHash.password, adminCredHash.token).toString(enc.Utf8);
        const { loginBool, passBool, passNotMathBool, tokenBool } = validateData();
        let notValidAdminPassBool = false;
        if (confirmViaAdmin.value !== decrAdminPassword) {
            notValidAdminPassBool = true;
        }

        if (!loginBool && !passBool && !passNotMathBool && !tokenBool && !notValidAdminPassBool) {
            sendChangeCredentials();
            setNewCredent({
                login: '',
                passwords: Array.from({ length: 2 }, () => ({ id: uuidv4(), ifVisible: false, value: '' }))
            });
            setConfirmViaAdmin({ ...confirmViaAdmin, value: '' });
            setAdminToken({ ...adminToken, value: '' });
        } else {
            setErrors({
                login: loginBool, password: passBool, passNotMath: passNotMathBool,
                token: tokenBool, notValidAdminPass: notValidAdminPassBool,
            });
        }
    }

    const handleInputs = ({ target }: ChangeEvent<HTMLInputElement>): void => {
        switch (target.placeholder.toLocaleLowerCase()) {
            case 'login':
                setNewCredent({ ...newCredent, login: target.value });
                setErrors({ ...errors, login: false });
                break;
            case 'token':
                setAdminToken({ ...adminToken, value: target.value });
                setErrors({ ...errors, token: false });
                break;
            case 'potwierdź hasłem':
                setConfirmViaAdmin({ ...confirmViaAdmin, value: target.value });
                setErrors({ ...errors, notValidAdminPass: false });
                break;
            default:
                throw new Error('Unexpected input placeholder value');
        }
    }

    useEffect(() => {
        const fetchCredentials = async (): Promise<any> => {
            const { data } = await axiosInstance.get('authentication');
            const { password, token } = data.find((authField: any) => authField.role === 2);
            setAdminCredHash({ password, token });
        }
        fetchCredentials();
    }, []);

    return (
        <form className = {changeCredentialsForm} onSubmit = {handleSubmitSendCredentials}>
            <h3>Zmiana poświadczeń dla konta {ifUser ? 'użytkownika' : 'panelu CMS'}</h3>
            {!ifUser && <ChangeTypeOfCredentials
                credential = {authFieldType}
                callback = {setAuthFieldType}
            />}
            <div className = {loginField}>
                <input
                    type = 'text'
                    placeholder = 'Login'
                    value = {newCredent.login}
                    onChange = {handleInputs}
                    className = {errors.login ? errorValue : ''}
                />
            </div>
            <GenerateAuthFields
                newCredent = {newCredent}
                setNewCredent = {setNewCredent}
                errors = {errors}
                setErrors = {setErrors}
            />
            {!ifUser && <div className = {inputNewAdminToken}>
                <input
                    type = {adminToken.ifVisible ? 'text' : 'password'}
                    placeholder = 'Token'
                    value = {adminToken.value}
                    onChange = {handleInputs}
                    className = {errors.token ? errorValue : ''}
                />
                <ShowHideAuthVisible
                    handleVisible = {handleTokenVisible}
                    ifVisible = {adminToken.ifVisible}
                />
            </div>}
            <p>W celu dodatkowej autentykacji wprowadź hasło głównego administratora:</p>
            <div className = {confirmViaAdminPasswordField}>
                <input
                    type = {confirmViaAdmin.ifVisible ? 'text' : 'password'}
                    placeholder = 'Potwierdź hasłem'
                    value = {confirmViaAdmin.value}
                    onChange = {handleInputs}
                    className = {errors.notValidAdminPass ? errorValue : ''}
                />
                <ShowHideAuthVisible
                    handleVisible = {handleConfirmViaAdminVisible}
                    ifVisible = {confirmViaAdmin.ifVisible}
                />
            </div>
            <button
                className = {submitForm}
                disabled = {disableButton}
            >
                Zatwierdź
            </button>
        </form>
    );
}

export default ChangeCredentials;