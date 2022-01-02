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

import axiosInstance from '../../../../helpers/misc/request';
import useMultipleRef from '../../../../helpers/hooks/useMultipleRef';
import { ROLES } from '../../../../helpers/functionsAndClasses/LoginValidator';
import { API_ENDPOINTS } from '../../../../helpers/structs/appEndpoints';

import { useDispatch } from 'react-redux';
import { SessActions } from '../../../../redux/sessionReduxStore/actions';

import COOKIES_OBJECT from '../../../../context/cookiesContext/allCookies.config';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../../context/cookiesContext/CookiesObjectsProvider';

import {
    AdminCmsLoginAsideInfoText, AdminCmsLoginButton, AdminCmsLoginElementsFormHeader
} from '../AdminCmsLoginElements.styles';
import { UniversalLoginForm } from '../../UserLogin/UserLogin.styles';

const AdminCmsLoginFormInputs = React.lazy(() => import('./AdminCmsLoginFormInputs'));

interface PropsProvider {
    callback: (role: ROLES) => void;
    visible: boolean;
}

/**
 * Component responsible for generate admin login form section and validate data from
 * validating class.
 *
 * @param callback { (role: ROLES) => void } - function run, when validate is successfull.
 * @param visible { boolean } - component visibility.
 */
const AdminCmsLoginForm: React.FC<PropsProvider> = ({ callback, visible }): JSX.Element => {

    const { setCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);

    const [ login, password, token ] = useMultipleRef(3);
    const [ valid, setValid ] = useState<{ [key: string]: boolean }>({ username: false, password: false, token: false });

    const dispatcher = useDispatch();

    const cleanAllFields = () => {
        if (login.current && password.current && token.current) {
            login.current.value = '';
            password.current.value = '';
            token.current.value = '';
        }
    };

    const handleSubmitAdminForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sendObject = {
            username: login.current.value, password: password.current.value, token: token.current.value,
        };
        axiosInstance.post(`${API_ENDPOINTS.AUTHENTICATIONS}/authenticate`, sendObject)
            .then(res => {
                if (!res.data.fieldsErrors.username && !res.data.fieldsErrors.password && !res.data.fieldsErrors.token) {
                    cleanAllFields();
                    setCookie!(COOKIES_OBJECT.token, res.data.jwtToken);
                    dispatcher(SessActions.changeJwtTokenSession(res.data.jwtToken));
                    callback(res.data.authLevel);
                }
            })
            .catch(err => {
                console.clear();
                cleanAllFields();
                setValid(err.response.data.fieldsErrors);
            });
    };

    return (
        <UniversalLoginForm
            onSubmit = {handleSubmitAdminForm}
            noValidate = {true}
            ifVisible = {!visible}
        >
            <AdminCmsLoginElementsFormHeader>
                Logowanie do panelu WCMS
            </AdminCmsLoginElementsFormHeader>
            <AdminCmsLoginFormInputs
                credentials = {{ login, password, token }}
                stateCallback = {setValid}
                state = {valid}
            />
            <AdminCmsLoginButton
                type = 'submit'
            >
                Zaloguj
            </AdminCmsLoginButton>
            <AdminCmsLoginAsideInfoText>
                * W celu pozyskania unikalnego tokenu uwierzytelniającego skontaktuj się z głównym administratorem systemu.
            </AdminCmsLoginAsideInfoText>
        </UniversalLoginForm>
    );
};

export default AdminCmsLoginForm;