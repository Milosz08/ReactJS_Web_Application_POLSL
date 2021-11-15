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
import { useContext, useEffect, useState } from 'react';

import useIsMount from '../../../helpers/hooks/useIsMount';
import generateID from '../../../helpers/functionsAndClasses/generateID';

import COOKIES_OBJECT from '../../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../context/cookiesContext/CookiesObjectsProvider';

import { useDispatch } from 'react-redux';
import { changeUserLoggedStatus } from '../../../redux/sessionReduxStore/actions';

import { UserLoginContainer } from './UserLogin.styles';

const LoadingSystemAnimation = React.lazy(() => import('../LoadingSystemAnimation/LoadingSystemAnimation'));
const UserLoginCredentials = React.lazy(() => import('./subcomponents/UserLoginCredentials'));

/**
 * Component responsible for generating user login component with form structure and
 * success function.
 */
const UserLogin: React.FC = (): JSX.Element => {

    const { cookie, setCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);

    const isMount = useIsMount();
    const dispatcher = useDispatch();

    const [ asyncAnim, setAsyncAnim ] = useState<boolean>(false);

    const successAuth = (): void => {
        setAsyncAnim(true);
        setTimeout(() => {
            dispatcher(changeUserLoggedStatus(true));
            setCookie!(COOKIES_OBJECT.userSession, generateID('c', 8));
            setAsyncAnim(false);
        }, 3000);
    };

    useEffect(() => {
        if (Boolean(cookie![COOKIES_OBJECT.userSession]) && isMount) {
            dispatcher(changeUserLoggedStatus(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isMount ]);

    return (
        <UserLoginContainer>
            <LoadingSystemAnimation
                hideAuth = {asyncAnim}
            />
            <UserLoginCredentials
                callback = {successAuth}
                visible = {asyncAnim}
            />
        </UserLoginContainer>
    );
};

export default UserLogin;