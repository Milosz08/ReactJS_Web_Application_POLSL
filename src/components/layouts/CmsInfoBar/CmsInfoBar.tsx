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

import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { GlobalModalsStateContext, GlobalModalsStateTypes } from '../../../contextStore/GlobalModalsStateProvider';
import { LoginSessionContext, LoginSessionProviderTypes } from '../../../contextStore/LoginSessionProvider';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../contextStore/CookiesObjectsProvider';

import { MAX_INACTIVITY_TIME } from '../CredentialsSequencers/SessionActivityCount';
import COOKIES_OBJECT from '../../../constants/allCookies';

const CmsInfoHamburger = React.lazy(() => import('./CmsInfoHamburger'));

const {
    cmsInfoBar, cmsInfoWrapper, logoContainer, mainInfosContainer, active, loginInfo, sessionTime, logoutButton,
    logoutIcon,
} = require('./CmsInfoBar.module.scss');

/**
 * @details Component that generates the status bar of the administrator's session in the CMS (active session
 *          time, buttons, logout, etc.).
 */
const CmsInfoBar = (): JSX.Element => {

    const { adminSessionInfo } = useContext<Partial<GlobalModalsStateTypes>>(GlobalModalsStateContext);
    const { cookie, removeCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const { adminAuth, setAdminAuth } = useContext<Partial<LoginSessionProviderTypes>>(LoginSessionContext);

    const [ timeCounting, setTimeCounting ] = useState<string>('');

    const ifCmsBarActive = adminAuth ? classnames(cmsInfoBar, active) : cmsInfoBar;
    const credLevel = cookie!.__credentialsLevel === '2' ? 'Administrator' : 'Moderator';

    const handleLogout = () => {
        setAdminAuth!(false);
        removeCookie!(COOKIES_OBJECT.adminSession, { path: '/' });
        removeCookie!(COOKIES_OBJECT.credentialsLevel, { path: '/' });
    }

    useEffect(() => {
        const handleEveryTick = () => {
            const fullSeconds = MAX_INACTIVITY_TIME * 60;
            const expireTime = fullSeconds - adminSessionInfo!.counter;

            const onlyMinutes = Math.floor(expireTime / 60);
            const onlyMinutesWithZero = onlyMinutes < 10 ? `0${onlyMinutes}` : onlyMinutes;

            const onlySeconds = expireTime - onlyMinutes * 60;
            const onlySecondsWithZero = onlySeconds < 10 ? `0${onlySeconds}` : onlySeconds;

            setTimeCounting(`${onlyMinutesWithZero}:${onlySecondsWithZero}`);
        }
        handleEveryTick();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ adminSessionInfo!.counter ]);

    return (
        <div className = {ifCmsBarActive}>
            <div className = {cmsInfoWrapper}>
                <div className = {logoContainer}>
                    <span><strong>WCMS</strong>Panel 1.0 by Miłosz Gilga</span>
                    <CmsInfoHamburger
                        credLevel = {credLevel}
                        timeCounting = {timeCounting}
                        callback = {handleLogout}
                    />
                </div>
                <div className = {mainInfosContainer}>
               <span className = {loginInfo}>
                  Zalogowany jako: <strong>{credLevel}</strong>
               </span>
                    <span className = {sessionTime}>
                  Pozostały czas sesji: <strong>{timeCounting}</strong>
               </span>
                    <button
                        className = {logoutButton}
                        onClick = {handleLogout}
                    >
                        <FontAwesomeIcon
                            icon = {[ 'fas', 'power-off' ]}
                            className = {logoutIcon}
                        />
                        Wyloguj
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CmsInfoBar;