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
import { FaPowerOff } from 'react-icons/all';

import { useDispatch } from 'react-redux';
import { changeAdminLoggedStatus } from '../../../../../redux/sessionReduxStore/actions';

import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../../../context/cookiesContext/CookiesObjectsProvider';
import COOKIES_OBJECT from '../../../../../context/cookiesContext/allCookies.config';

import { CmsLogoutIconWrapper, CmsMainLogoutButton } from '../CmsInfoBar.styles';

/**
 * Component responsible for generating logout button from the whole CMS system.
 */
const CmsInfoLogoutButton: React.FC = (): JSX.Element => {

    const { removeCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const dispatcher = useDispatch();

    const handleLogoutButton = (): void => {
        dispatcher(changeAdminLoggedStatus(false));
        removeCookie!(COOKIES_OBJECT.adminSession);
        removeCookie!(COOKIES_OBJECT.credentialsLevel);
    };

    return (
        <CmsMainLogoutButton
            onClick = {handleLogoutButton}
        >
            <CmsLogoutIconWrapper>
                <FaPowerOff/>
            </CmsLogoutIconWrapper>
            Wyloguj
        </CmsMainLogoutButton>
    );
};

export default CmsInfoLogoutButton;