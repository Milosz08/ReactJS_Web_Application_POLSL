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

import { UniversalCredentialsInput } from '../../UserLogin/UserLogin.styles';

const PasswordInputField = React.lazy(() => import('../../PasswordInputField/PasswordInputField'));

interface PropsProvider {
    credentials: { [key: string]: React.MutableRefObject<any> };
    stateCallback: React.Dispatch<React.SetStateAction<{ [p: string]: boolean }>>;
    state: { [key: string]: boolean };
}

/**
 * Component responsible for generating all admin cms page login inputs
 * (login, password and authentication token).
 *
 * @param credentials { { [key: string]: React.MutableRefObject<any> } } - credentials values.
 * @param stateCallback { React.Dispatch<React.SetStateAction<{[p: string]: boolean}>> } - setting errors state function.
 * @param state { { [key: string]: boolean } } - error values object.
 */
const AdminCmsLoginFormInputs: React.FC<PropsProvider> = ({ credentials, stateCallback, state }): JSX.Element => (
    <>
        <UniversalCredentialsInput
            type = 'text'
            placeholder = 'Login'
            onChange = {() => stateCallback({ ...state, username: false })}
            ifError = {state.username}
            ref = {credentials.login}
        />
        <PasswordInputField
            ifError = {state.password}
            grabber = {credentials.password}
            changeCallback = {() => stateCallback({ ...state, password: false })}
        />
        <PasswordInputField
            ifError = {state.token}
            grabber = {credentials.token}
            placeholder = 'Token uwierzytelniający *'
            changeCallback = {() => stateCallback({ ...state, token: false })}
        />
    </>
);

export default AdminCmsLoginFormInputs;