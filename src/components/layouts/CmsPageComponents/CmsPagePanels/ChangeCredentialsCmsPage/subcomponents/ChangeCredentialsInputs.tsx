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

import { ChangeCredentialsContext, ChangeCredentialsContextTypes } from '../ChangeCredentialsStoreProvider';

import { UniversalCredentialsInput } from '../../../../UserLogin/UserLogin.styles';
import { ROLES } from '../../../../../../helpers/functionsAndClasses/LoginValidator';

const InsertAndValidateNewPassword = React.lazy(() => import('./InsertAndValidateNewPassword'));

interface PropsProvider {
    ifUser: boolean;
}

/**
 * Component responsible for generating login input field (in both user and admin/moderator).
 *
 * @param ifUser { boolean } - flag decided, if change credentials are for user.
 */
const ChangeCredentialsInputs: React.FC<PropsProvider> = ({ ifUser }): JSX.Element => {

    const { errors: err, credentialsRef, roles } = useContext<Partial<ChangeCredentialsContextTypes>>(ChangeCredentialsContext);
    const disabledInput: boolean = roles!.role !== ROLES.ADMIN;
    console.log(roles!.role, ROLES.ADMIN)

    return (
        <>
            <UniversalCredentialsInput
                type = 'text'
                placeholder = 'Nowy Login (max 20 znaków)'
                onChange = {() => err!.setErrors({ ...err!.errors, login: false })}
                ifError = {err!.errors.login}
                ref = {credentialsRef!.login}
                maxLength = {20}
                maxWidth = {300}
                fontSize = {1.1}
                disabled = {disabledInput}
            />
            <InsertAndValidateNewPassword
                ifUser = {ifUser}
            />
        </>
    );
};

export default ChangeCredentialsInputs;