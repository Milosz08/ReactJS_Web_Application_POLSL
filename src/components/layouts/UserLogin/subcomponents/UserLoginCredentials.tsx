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

import { UniversalCredentialsInput, UniversalLoginForm, UserLoginSubmitButton } from '../UserLogin.styles';

const PasswordInputField = React.lazy(() => import('../../PasswordInputField/PasswordInputField'));

interface PropsProvider {
    callback: () => void;
    visible: boolean;
}

/**
 * Component responsible for generating user login all credentials and implements custom
 * validator class for validate inserting data. This form is supported by uncontrolled component.
 *
 * @param callback { () => void } - function run on success validate data.
 * @param visible { boolean } - flag which setting visibility of user credentials form element.
 */
const UserLoginCredentials: React.FC<PropsProvider> = ({ callback, visible }): JSX.Element => {

    const [ login, password ] = useMultipleRef(2);
    const [ valid, setValid ] = useState<{ [key: string]: boolean }>({ username: false, password: false });

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const validate = new LoginValidator(login.current.value, password.current.value, ROLES.USER);
        validate.initialise().then(() => {
            const validateFields = validate.get__errorFields();
            const { username: usr, password: psw } = validateFields;
            if (!usr && !psw) {
                callback();
            } else {
                setValid(validateFields);
            }
            login.current.value = '';
            password.current.value = '';
        });
    };

    return (
        <UniversalLoginForm
            onSubmit = {handleSubmitForm}
            noValidate = {true}
            ifVisible = {!visible}
        >
            <UniversalCredentialsInput
                type = 'text'
                placeholder = 'Login'
                onChange = {() => setValid({ ...valid, username: false })}
                ifError = {valid.username}
                ref = {login}
            />
            <PasswordInputField
                ifError = {valid.password}
                grabber = {password}
                changeCallback = {() => setValid({ ...valid, password: false })}
            />
            <UserLoginSubmitButton
                type = 'submit'
            >
                Zaloguj
            </UserLoginSubmitButton>
        </UniversalLoginForm>
    );
};

export default UserLoginCredentials;