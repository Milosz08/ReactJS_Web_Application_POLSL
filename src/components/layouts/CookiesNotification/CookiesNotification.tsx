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

import * as React from 'react';
import { useContext } from 'react';

import useModalShowHide from '../../../helpers/hooks/useModalShowHide';
import generateID from '../../../helpers/functionsAndClasses/generateID';
import { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';

import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../context/cookiesContext/CookiesObjectsProvider';
import cookieExpires from '../../../context/cookiesContext/cookieExpires';
import COOKIES_OBJECT from '../../../context/cookiesContext/allCookies.config';

import { CookiesNotificationContainer, CookiesNotificationWrapper } from './CookiesNotification.styles';

import CookiesSectionContainer from './subcomponents/CookiesSectionContainer';
import CookiesButtonsContainer from './subcomponents/CookiesButtonsContainer';
const UniversalHeader = React.lazy(() => import('../UniversalHeader/UniversalHeader'));

/**
 * Component responsible for displaying the notification about the use of cookies by the application. The
 * component uses the context that stores the access methods to Cookie files. The component creates a new
 * Cookie after accepting the terms. The modal is not displayed if the Cookie file exists.
 */
const CookiesNotification = (): JSX.Element => {

    const { cookie, setCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const [ modal, background ] = useModalShowHide(!Boolean(cookie![COOKIES_OBJECT.cookiesPopup]));

    const handleCookieButtons = (): void => {
        if (!Boolean(cookie![COOKIES_OBJECT.cookiesPopup])) {
            const expCookie: Date = cookieExpires(365);
            setCookie!(COOKIES_OBJECT.cookiesPopup, generateID('c', 8), { path: '/', expires: expCookie });
        }
    };

    return (
        <CookiesNotificationContainer
            ref = {background}
        >
            <CookiesNotificationWrapper
                ref = {modal}
            >
                <UniversalHeader
                    iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaCookieBite' }}
                    content = 'Pliki Cookies'
                    ifCloseButtonVisible = {true}
                    setCloseButton = {handleCookieButtons}
                />
                <CookiesSectionContainer/>
                <CookiesButtonsContainer
                    handleCookieButtons = {handleCookieButtons}
                />
            </CookiesNotificationWrapper>
        </CookiesNotificationContainer>
    );
}

export default CookiesNotification;