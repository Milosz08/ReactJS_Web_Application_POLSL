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

import { InsertAdmiAuthPasswordParagraph } from '../ChangeCredentialsCmsPage.styles';

import { ChangeCredentialsContext, ChangeCredentialsContextTypes } from '../ChangeCredentialsStoreProvider';
import { ROLES } from '../../../../../../helpers/functionsAndClasses/LoginValidator';

const PasswordInputField = React.lazy(() => import('../../../../PasswordInputField/PasswordInputField'));

/**
 * Component responsible for generate validate data using inserting main admin password.
 */
const InsertAdminAuthPassword: React.FC = (): JSX.Element => {

    const { errors: err, credentialsRef, roles } = useContext<Partial<ChangeCredentialsContextTypes>>(ChangeCredentialsContext);
    const disabledInput: boolean = roles!.role !== ROLES.ADMIN;

    return (
        <>
            <InsertAdmiAuthPasswordParagraph>
                W celu dodatkowej weryfikacji wprowadź hasło głównego administratora:
            </InsertAdmiAuthPasswordParagraph>
            <PasswordInputField
                ifError = {err!.errors.adminPass}
                grabber = {credentialsRef!.adminPass}
                changeCallback = {() => err!.setErrors({ ...err!.errors, adminPass: false })}
                placeholder = 'Potwierdź hasłem'
                fontSize = '1.1rem'
                maxWidth = '300px'
                disabled = {disabledInput}
            />
        </>
    );
};

export default InsertAdminAuthPassword;