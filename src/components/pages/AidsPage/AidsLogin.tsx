/**
 * @file AidsLogin.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                uuid: "^8.3.1"
 *                CryptoJS: "^4.1.1"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../../helpers/request';
import { AES, enc } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import COOKIES_OBJECT from '../../../constants/allCookies';
import ROUTING_PATH_NAMES from '../../../constants/routingPathNames';

const CookiesNotification = React.lazy(() => import('../../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../../layouts/CurrentURLpath/CurrentURLpath'));
const LoadingSystemAnimation = React.lazy(() => import('../../layouts/LoadingSystemAnimation/LoadingSystemAnimation'));

const { userLoginContainer, userLoginWrapper, loginInfo, hideFormOnClick } = require('./AidsPage.module.scss');
const {
    userCredentials, inputCredentials, showProtectedField, visibleIcon, onSubmitCSS, wrongData, authenticationHeader,
} = require('./../AdminCmsSystemPage/AdminCmsLogin/AdminCmsLogin.module.scss');

/**
 * Constant describing the ID of the generated cookie file
 */
const COOKIE_ID = uuidv4();

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    setAuth: (value: boolean) => boolean;
    handleCookie: any;
}

/**
 * @details Component that generates the user's authentication (login) field. The component has validation of the entered data,
 *          and after pressing the submit button, the data is sent in the form of a request to the API. If the data sent to
 *          the API match, redirect takes place. Logging in is active for one browser session (until it is closed or manually
 *          logged out of the system).
 *
 * @param setAuth { (value: boolean) => boolean } - setting authentication (true -> there is, false -> not available).
 * @param handleCookie { any } - function of removing/adding Cookie object.
 */
const AidsLogin: React.FC<PropsProvider> = ({ setAuth, handleCookie }) => {

    const [ login, setLogin ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ passVisible, setPassVisible ] = useState<boolean>(false);
    const [ credentialsHash, setCredentialsHash ] = useState<{ [value: string]: string }>({
        login: '', password: '', token: ''
    });
    const [ errors, setErrors ] = useState<{ [value: string]: boolean }>({ login: false, password: false });
    const [ hideAuth, setHideAuth ] = useState<boolean>(false);

    const checkAuthentication = (): { [value: string]: boolean } => {
        let loginBool = false, passwordBool = false;

        const decrLogin = AES.decrypt(credentialsHash.login, credentialsHash.token).toString(enc.Utf8);
        const decrPassword = AES.decrypt(credentialsHash.password, credentialsHash.token).toString(enc.Utf8);

        if (decrLogin !== login) {
            loginBool = true;
        }
        if (decrPassword !== password) {
            passwordBool = true;
        }
        return {
            loginBool, passwordBool
        }
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { loginBool, passwordBool } = checkAuthentication();
        if (!loginBool && !passwordBool) {
            setHideAuth(true);
            setTimeout(() => {
                setAuth(true);
            }, 2000);
            setTimeout(() => {
                handleCookie(COOKIES_OBJECT.userSession, COOKIE_ID, { path: '/', sameSite: 'strict' });
            }, 2000);
            setLogin('');
            setPassword('');
        } else {
            setErrors({ login: loginBool, password: passwordBool });
            if (loginBool) {
                setLogin('');
            }
            if (passwordBool) {
                setPassword('');
            }
        }
        setPassVisible(false);
    }

    const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        switch (target.placeholder.toLocaleLowerCase()) {
            case 'login':
                setLogin(target.value);
                setErrors({ ...errors, login: false });
                break;
            case 'hasło':
                setPassword(target.value);
                setErrors({ ...errors, password: false });
                if (!target.value) {
                    setPassVisible(false);
                }
                break;
            default:
                throw new Error('Unexpected target placeholder token');
        }
    }

    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            const { data } = await axiosInstance.get('authentication');
            const { login, password, token } = data.find((authField: any) => authField.role === 0);
            setCredentialsHash({ login, password, token });
        }
        fetchData();
    }, []);

    useEffect(() => {
        document.title = ROUTING_PATH_NAMES.LOGIN_PAGE;
        return () => {
            document.title = ROUTING_PATH_NAMES.START_PAGE
        };
    }, []);

    const toggleClasses = hideAuth ? classnames(userLoginWrapper, hideFormOnClick) : userLoginWrapper;

    return (
        <Fragment>
            <CookiesNotification/>
            <MobileDownNav/>
            <Header ifHeaderHasRedBar = {true}/>
            <CurrentURLpath ifImportatHeaderActive = {true}/>
            <div className = {userLoginContainer}>
                <LoadingSystemAnimation hideAuth = {hideAuth}/>
                <div className = {toggleClasses}>
                    <p className = {loginInfo}>
                        Dostęp do tej sekcji wymaga autentykacji. Zaloguj się przy pomocy loginu oraz hasła. Jeśli nie
                        znasz swojego hasła, skontaktuj się z głównym administratorem systemu. Aktywne zalogowanie do
                        systemu trwa jedną sesję (do momentu zamknięcia przeglądarki) lub do manulalnego wylogowania z
                        systemu.
                    </p>
                    <h3 className = {authenticationHeader}>Logowanie do systemu</h3>
                    <form className = {userCredentials} onSubmit = {handleFormSubmit}>
                        <div className = {inputCredentials}>
                            <input
                                type = 'text'
                                value = {login}
                                onChange = {handleChangeInput}
                                placeholder = 'Login'
                                className = {errors.login ? wrongData : ''}
                            />
                        </div>
                        <div className = {inputCredentials}>
                            <input
                                type = {passVisible ? 'text' : 'password'}
                                value = {password}
                                onChange = {handleChangeInput}
                                placeholder = 'Hasło'
                                className = {errors.password ? wrongData : ''}
                            />
                            <button
                                type = 'button'
                                title = {!passVisible ? 'Pokaż hasło' : 'Ukryj hasło'}
                                onClick = {() => password ? setPassVisible(prevState => !prevState) : null}
                                className = {showProtectedField}
                            >
                                <FontAwesomeIcon
                                    icon = {[ 'fas', `${passVisible ? 'eye-slash' : 'eye'}` ]}
                                    className = {visibleIcon}
                                />
                            </button>
                        </div>
                        <button
                            className = {onSubmitCSS}
                        >Zaloguj
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default AidsLogin;