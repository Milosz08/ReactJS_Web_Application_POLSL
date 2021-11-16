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
import { useContext, useState } from 'react';

import { useDispatch } from 'react-redux';
import { changeAdminLoggedStatus } from '../../../redux/sessionReduxStore/actions';

import { ROLES } from '../../../helpers/functionsAndClasses/LoginValidator';

import COOKIES_OBJECT from '../../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../context/cookiesContext/CookiesObjectsProvider';

import { AdminCmsLoginElementsContainer, AdminCmsLoginElementsWrapper } from './AdminCmsLoginElements.styles';

const AdminCmsLoginForm = React.lazy(() => import('./subcomponents/AdminCmsLoginForm'));
const LoadingSystemAnimation = React.lazy(() => import('../LoadingSystemAnimation/LoadingSystemAnimation'));

/**
 * Component responsible for generating all structure of admin login page component,
 * setting cookie and if auth is successfull, going into admin CMS page.
 */
const AdminCmsLoginElements: React.FC = (): JSX.Element => {

    const { setCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);

    const dispatcher = useDispatch();
    const [ asyncAnim, setAsyncAnim ] = useState<boolean>(false);

    const successAuth = (role: ROLES): void => {
        setAsyncAnim(true);
        setTimeout(() => {
            setCookie!(COOKIES_OBJECT.adminSession, role);
            dispatcher(changeAdminLoggedStatus(true, role));
        }, 3000);
    };

    return (
        <AdminCmsLoginElementsContainer>
            <AdminCmsLoginElementsWrapper>
                <LoadingSystemAnimation
                    hideAuth = {asyncAnim}
                    ifMargin = {true}
                />
                <AdminCmsLoginForm
                    callback = {successAuth}
                    visible = {asyncAnim}
                />
            </AdminCmsLoginElementsWrapper>
        </AdminCmsLoginElementsContainer>
    );
};

export default AdminCmsLoginElements;