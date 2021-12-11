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

import { ROLES } from '../../../../../../helpers/functionsAndClasses/LoginValidator';
import { ChangeCredentialsContext, ChangeCredentialsContextTypes } from '../ChangeCredentialsStoreProvider';

const PasswordInputField = React.lazy(() => import('../../../../PasswordInputField/PasswordInputField'));

interface PropsProvider {
    ifUser: boolean;
}

/**
 * Component responsible for generating all passwords and token protected fields.
 *
 * @param ifUser { boolean } - flag decided, if change credentials are for user.
 */
const InsertAndValidateNewPassword: React.FC<PropsProvider> = ({ ifUser }): JSX.Element => {

    const { errors: err, credentialsRef, roles } = useContext<Partial<ChangeCredentialsContextTypes>>(ChangeCredentialsContext);
    const disabledInput: boolean = roles!.role !== ROLES.ADMIN;

    return (
        <>
            <PasswordInputField
                ifError = {err!.errors.pass}
                grabber = {credentialsRef!.pass}
                placeholder = 'Nowe hasło (max 20 znaków)'
                changeCallback = {() => err!.setErrors({ ...err!.errors, pass: false })}
                fontSize = '1.1rem'
                maxWidth = '300px'
                disabled = {disabledInput}
            />
            <PasswordInputField
                ifError = {err!.errors.passRepeat}
                grabber = {credentialsRef!.passRepeat}
                placeholder = 'Potwierdź nowe hasło'
                changeCallback = {() => err!.setErrors({ ...err!.errors, passRepeat: false })}
                fontSize = '1.1rem'
                maxWidth = '300px'
                disabled = {disabledInput}
            />
            {!ifUser && <PasswordInputField
                ifError = {err!.errors.token}
                grabber = {credentialsRef!.token}
                placeholder = 'Nowy token (max 20 znaków)'
                changeCallback = {() => err!.setErrors({ ...err!.errors, token: false })}
                fontSize = '1.1rem'
                maxWidth = '300px'
                disabled = {disabledInput}
            />}
        </>
    );
};

export default InsertAndValidateNewPassword;