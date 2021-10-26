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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { changeAdminLoggedStatus, toggleWarningSessionModal } from '../../../redux/sessionReduxStore/actions';
import { SessionInitialTypes } from '../../../redux/sessionReduxStore/initialState';

import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../context/cookiesContext/CookiesObjectsProvider';
import COOKIES_OBJECT from '../../../context/cookiesContext/allCookies.config';

import { SessionEndModalContainer, SessionEndModalWrapper } from './SessionEndModal.styles';

const SessionEndModalTime = React.lazy(() => import('./subcomponents/SessionEndModalTime'));
const SessionEndModalButtons = React.lazy(() => import('./subcomponents/SessionEndModalButtons'));

/**
 * Component generating a modal informing the user / administrator about the end of an active session (no activity on
 * the page). It allows you to log out manually or stay logged in. If the user does not show the action, after some
 * time in the variable "LOGOUT_REMAIN_TIME", he will be automatically logged out of the system.
 */
const SessionEndModal = (): JSX.Element => {

    const { sessionInfo }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    const { removeCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const [ modal, background ] = useModalShowHide(sessionInfo.ifModalOpen);

    const dispatcher = useDispatch();

    const handleLogout = (): void => {
        dispatcher(toggleWarningSessionModal(false));
        setTimeout(() => {
            dispatcher(changeAdminLoggedStatus(false));
            removeCookie!(COOKIES_OBJECT.adminSession);
            removeCookie!(COOKIES_OBJECT.credentialsLevel);
        }, 1500);
    };

    return (
        <SessionEndModalContainer
            ref = {background}
        >
            <SessionEndModalWrapper
                ref = {modal}
            >
                <SessionEndModalTime
                    logoutCallback = {handleLogout}
                />
                <SessionEndModalButtons
                    logoutCallback = {handleLogout}
                />
            </SessionEndModalWrapper>
        </SessionEndModalContainer>
    );
}

export default SessionEndModal;