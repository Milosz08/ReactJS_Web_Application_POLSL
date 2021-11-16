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
import { useState } from 'react';

import useMultipleRef from '../../../../helpers/hooks/useMultipleRef';
import LoginValidator, { ROLES } from '../../../../helpers/functionsAndClasses/LoginValidator';

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

    const [ login, password, token ] = useMultipleRef(3);
    const [ valid, setValid ] = useState<{ [key: string]: boolean }>({ username: false, password: false, token: false });

    const handleSubmitAdminForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validateA = new LoginValidator(login.current.value, password.current.value, ROLES.ADMIN, token.current.value);
        validateA.initialise().then(() => {
            const validateFieldsA = validateA.get__errorFields();
            const { username: usrA, password: pswA, token: tkA } = validateFieldsA;
            if (!usrA && !pswA && !tkA) {
                callback(ROLES.ADMIN);
            } else {
                const validateM = new LoginValidator(
                    login.current.value, password.current.value, ROLES.MODERATOR, token.current.value
                );
                validateM.initialise().then(() => {
                    const validateFieldsM = validateM.get__errorFields();
                    const { username: usrM, password: pswM, token: tkM } = validateFieldsM;
                    if (!usrM && !pswM && !tkM) {
                        callback(ROLES.MODERATOR);
                    } else {
                        setValid(validateFieldsM);
                    }
                });
            }
            login.current.value = '';
            password.current.value = '';
            token.current.value = '';
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