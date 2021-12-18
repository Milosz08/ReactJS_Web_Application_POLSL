/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import COOKIES_OBJECT from '../../../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../../context/cookiesContext/CookiesObjectsProvider';

import { useDispatch } from 'react-redux';
import { SessActions } from '../../../../redux/sessionReduxStore/actions';
import { toggleUserLogoutModal } from '../../../../redux/preferencesReduxStore/actions';

import { HelpersContentLogoutButton } from '../HelpersContent.styles';

/**
 * Component responsible for generating logout button from user helpers section.
 */
const HelpersContentLogout: React.FC = (): JSX.Element => {

    const { removeCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const dispatcher = useDispatch();

    const handleLogoutButton = (): void => {
        window.scrollTo(0, 0);
        dispatcher(SessActions.changeUserLoggedStatus(false));
        dispatcher(toggleUserLogoutModal(true));
        removeCookie!(COOKIES_OBJECT.userSession);
    };

    return (
        <HelpersContentLogoutButton
            onClick = {handleLogoutButton}
        >
            Wyloguj z systemu
        </HelpersContentLogoutButton>
    );
};

export default HelpersContentLogout;