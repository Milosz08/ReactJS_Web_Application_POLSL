/*
 * Copyright (c) 2021, by Miłosz Gilga <https://miloszgilga.pl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../contextStore/CookiesObjectsProvider';

import cookieExpires from '../../../constants/cookieExpires';
import COOKIES_OBJECT from '../../../constants/allCookies';

const UniversalHeader = React.lazy(() => import('../UniversalHeader/UniversalHeader'));

const {
    cookieNotifContainer, cookiesNotifPopupContainer, cookiesMainContent, cookiesButtons, readPolicity,
    acceptPolicity, showCookiePopup
} = require('./CookiesNotification.module.scss');

/**
 * Constant on the basis of which the cookie file is generated.
 */
const COOKIE_EXPIRES_TIME: number = 365;
const COOKIE_ID = uuidv4();

/**
 * @details Component responsible for displaying the notification about the use of cookies by the application. The
 *          component uses the context that stores the access methods to Cookie files. The component creates a new
 *          Cookie after accepting the terms. The modal is not displayed if the Cookie file exists.
 */
const CookiesNotification = (): JSX.Element => {

    const { cookie, setCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext)
    const ifCookieNotExist = cookie!.__cookieNotification === undefined ? showCookiePopup : '';

    const handleCookieButtons = (): void => {
        if (cookie!.__cookieNotification === undefined) {
            const expCookie: Date = cookieExpires(COOKIE_EXPIRES_TIME);
            setCookie!(COOKIES_OBJECT.cookiesPopup, COOKIE_ID, { path: '/', expires: expCookie });
        }
    }

    return (
        <div className = {classnames(cookieNotifContainer, ifCookieNotExist)}>
            <div className = {cookiesNotifPopupContainer}>
                <UniversalHeader
                    iconP = {[ 'fas', 'cookie-bite' ]}
                    content = 'Pliki Cookies'
                    ifCloseButtonVisible = {true}
                    setCloseButton = {handleCookieButtons}
                />
                <section className = {cookiesMainContent}>
                    W celu optymalizacji treści i wygody użytkowania, strona którą będziesz przeglądał korzysta z
                    plików Cookies zapisanych na Twoim urządzeniu. Pliki Cookies, potocznie nazywane Ciasteczkami,
                    możesz kontrolować za pomocą ustawień swojej przeglądarki internetowej. Dalsze korzystanie ze
                    strony lub zamknięcie tego okna bez zmiany ustawień przeglądarki, oznacza że akceptujesz
                    stosowanie polityki plików Cookies.
                </section>
                <div className = {cookiesButtons}>
                    <button className = {readPolicity}>
                        <NavLink to = '/polityka-prywatności-cookies'>
                            Przeczytaj Politykę Prywatności
                        </NavLink>
                    </button>
                    <button
                        className = {acceptPolicity}
                        onClick = {handleCookieButtons}
                    >
                        Zgadzam się z Polityką Cookies
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookiesNotification;