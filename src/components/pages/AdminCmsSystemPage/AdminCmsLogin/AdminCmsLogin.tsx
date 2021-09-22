/**
 * @file AdminCmsLogin.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                CryptoJS: "^4.1.1"
 *                ReactCSSmodules: "^4.7.11"
 *                uuid: "^8.3.1"
 *                classnames: "^2.3.1"
 *
 * @date final version: 08/24/2021
 */

import React, { Fragment, useState, useEffect } from 'react';
import axiosInstance from '../../../../helpers/request';
import { AES, enc } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import COOKIES_OBJECT from '../../../../constants/allCookies';
import ROUTING_PATH_NAMES from '../../../../constants/routingPathNames';

const CookiesNotification = React.lazy(() => import('../../../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../../layouts/Header/Header'));
const CurrentURLpath = React.lazy(() => import('../../../layouts/CurrentURLpath/CurrentURLpath'));
const LoadingSystemAnimation = React.lazy(() => import('../../../layouts/LoadingSystemAnimation/LoadingSystemAnimation'));
const AdminCmsLoginInputs = React.lazy(() => import('./AdminCmsLoginInputs'));

const {
    adminLoginWrapper, adminLoginContainer, adminCredentials, onSubmitCSS, infoAboutToken, poweredBy,
    authenticationHeader, hideFormOnClick
} = require('./AdminCmsLogin.module.scss');

/**
 * Constant on the basis of which the cookie file is generated.
 */
const COOKIE_ID = uuidv4();

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    setAuth: (value: boolean) => boolean;
    handleCookie: (name: string, value?: any, options?: (any | undefined)) => void;
}

/**
 * Interface defining the type of hash credentials values.
 */
interface HashProvider {
    _id: string;
    role: number;
    login: string;
    password: string;
    token: string;
    adminToken: string;
    __v: number;
}

/**
 * @details Component responsible for generating the input field for the user name, password and token in order to log in to
 *          the CMS panel. The component takes the encrypted data from the API and decrypts it by checking against the data
 *          entered by the user. If the data is identical, you will be redirected to the CMS panel.
 *
 * @param setAuth { (value: boolean) => boolean } - function deciding if the user / administrator is authenticated.
 * @param handleCookie { function() } - props dependent function: deleting or adding a cookie.
 */
const AdminCmsLogin: React.FC<PropsProvider> = ({ setAuth, handleCookie }): JSX.Element => {

    const [ credentials, setCredentials ] = useState<{ [value: string]: string }>({ login: '', password: '', token: '' });
    const [ errors, setErrors ] = useState<{ [value: string]: boolean }>({ login: false, password: false, token: false });

    const [ visible, setVisible ] = useState<{ [value: string]: boolean }>({ password: false, token: false });
    const [ credentialsHash, setCredentialsHash ] = useState<HashProvider[]>([]);

    const [ hideAuth, setHideAuth ] = useState<boolean>(false);

    const checkAuthentication = (): { [value: string]: boolean } => {
        let loginBool = false, passwordBool = false, tokenBool = false;
        let decryptArray: string[] = [];

        credentialsHash.forEach(object => {
            const decrLogin = AES.decrypt(object.login, object.token).toString(enc.Utf8);
            decryptArray.push(decrLogin);
            const decrPassword = AES.decrypt(object.password, object.token).toString(enc.Utf8);
            decryptArray.push(decrPassword);
            const decrToken = AES.decrypt(object.adminToken, object.token).toString(enc.Utf8);
            decryptArray.push(decrToken);
        });

        if (credentials.login === decryptArray[0]) {
            handleCookie(COOKIES_OBJECT.credentialsLevel, 1, { path: '/' });
        } else if (credentials.login === decryptArray[3]) {
            handleCookie(COOKIES_OBJECT.credentialsLevel, 2, { path: '/' });
        }

        if (credentials.login !== decryptArray[0] && credentials.login !== decryptArray[3]) {
            loginBool = true;
        }
        if (credentials.password !== decryptArray[1] && credentials.password !== decryptArray[4]) {
            passwordBool = true;
        }
        if (credentials.token !== decryptArray[2] && credentials.token !== decryptArray[5]) {
            tokenBool = true;
        }

        return { loginBool, passwordBool, tokenBool };
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { loginBool, passwordBool, tokenBool } = checkAuthentication();
        if (!loginBool && !passwordBool && !tokenBool) {
            setHideAuth(true);
            setTimeout(() => {
                setAuth(true);
            }, 2000);
            setCredentialsHash([]);
            setTimeout(() => {
                handleCookie(COOKIES_OBJECT.adminSession, COOKIE_ID, { path: '/' });
            }, 2000);
            setCredentials({ login: '', password: '', token: '' });
        } else {
            setErrors({ login: loginBool, password: passwordBool, token: tokenBool });
            if (loginBool) {
                setCredentials({ ...credentials, login: '' });
            }
            if (passwordBool) {
                setCredentials({ ...credentials, password: '' });
            }
            if (tokenBool) {
                setCredentials({ ...credentials, token: '' });
            }
        }
        setVisible({ password: false, token: false });
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axiosInstance.get('authentication');
            const authArray = data.filter((authField: any) => authField.role !== 0);
            setCredentialsHash(authArray);
        }
        fetchData();
    }, []);

    useEffect(() => {
        document.title = ROUTING_PATH_NAMES.CMS_LOGIN_PAGE;
        return () => {
            document.title = ROUTING_PATH_NAMES.START_PAGE
        };
    }, []);

    const toggleClasses = hideAuth ? classnames(adminLoginWrapper, hideFormOnClick) : adminLoginWrapper;

    return (
        <Fragment>
            <CookiesNotification/>
            <MobileDownNav/>
            <Header ifHeaderHasRedBar = {false}/>
            <CurrentURLpath ifImportatHeaderActive = {false}/>
            <div className = {adminLoginContainer}>
                <LoadingSystemAnimation hideAuth = {hideAuth}/>
                <div className = {toggleClasses}>
                    <h3 className = {authenticationHeader}>Logowanie do systemu WCMS</h3>
                    <form className = {adminCredentials} onSubmit = {handleOnSubmit}>
                        <AdminCmsLoginInputs
                            credentials = {credentials}
                            setCredentials = {setCredentials}
                            errors = {errors}
                            setErrors = {setErrors}
                            visible = {visible}
                            setVisible = {setVisible}
                        />
                        <button className = {onSubmitCSS}>Zaloguj</button>
                        <aside className = {infoAboutToken}>
                            * W celu pozyskania unikalnego tokenu uwierzytelniającego skontaktuj się z głównym
                            administratorem systemu.
                        </aside>
                    </form>
                    <div className = {poweredBy}>
                        <img src = {`${process.env.PUBLIC_URL}/images/strapi.png`} alt = 'strapi'/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AdminCmsLogin;