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

import { useContext, useEffect } from 'react';
import useIsMount from './useIsMount';

import { useDispatch } from 'react-redux';
import { SessActions } from '../../redux/sessionReduxStore/actions';

import COOKIES_OBJECT from '../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../context/cookiesContext/CookiesObjectsProvider';

/**
 * Custom hook responsible checking cms system admin/moderator auth session.
 */
const useInsertSessionAdminCookie = (): null => {

    const { cookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);
    const dispatcher = useDispatch();
    const isMount = useIsMount();

    useEffect(() => {
        if (Boolean(cookie![COOKIES_OBJECT.adminSession]) && isMount) {
            dispatcher(SessActions.changeAdminLoggedStatus(true, Number(cookie![COOKIES_OBJECT.adminSession])));
            dispatcher(SessActions.changeJwtTokenSession(cookie![COOKIES_OBJECT.token]));
        }
    }, [ cookie, dispatcher, isMount ]);

    return null;
};

export default useInsertSessionAdminCookie;