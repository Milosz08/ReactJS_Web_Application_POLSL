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

import { ROLES } from '../../../../../../helpers/functionsAndClasses/LoginValidator';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { SessionInitialTypes } from '../../../../../../redux/sessionReduxStore/initialState';

import { ChangeCredentialsCmsForm, ChangeCredentialsCmsFormHeader } from '../ChangeCredentialsCmsPage.styles';

const ChangeCredentialsStoreProvider = React.lazy(() => import('../ChangeCredentialsStoreProvider'));
const ChangeCredentialType = React.lazy(() => import('./ChangeCredentialType'));
const ChangeCredentialsInputs = React.lazy(() => import('./ChangeCredentialsInputs'));
const InsertAdminAuthPassword = React.lazy(() => import('./InsertAdminAuthPassword'));
const ChangeCredentialsSubmitForm = React.lazy(() => import('./ChangeCredentialsSubmitForm'));

interface PropsProvider {
    ifUser: boolean;
}

/**
 * Component responsible for generating changing credentials form for user and admin/moderator.
 *
 * @param ifUser { boolean } - flag decided, if change credentials are for user.
 */
const ChangeCredentialsForm: React.FC<PropsProvider> = ({ ifUser }): JSX.Element => {

    const { adminAuthStatus }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    return (
        <ChangeCredentialsCmsForm
            noValidate = {true}
            disabled = {adminAuthStatus.identity !== ROLES.ADMIN}
        >
            <ChangeCredentialsCmsFormHeader>
                Zmiana poświadczeń dla konta {ifUser ? 'użytkownika' : 'panelu CMS'}
            </ChangeCredentialsCmsFormHeader>
            <ChangeCredentialsStoreProvider>
                {!ifUser && <ChangeCredentialType/>}
                <ChangeCredentialsInputs
                    ifUser = {ifUser}
                />
                <InsertAdminAuthPassword/>
                <ChangeCredentialsSubmitForm/>
            </ChangeCredentialsStoreProvider>
        </ChangeCredentialsCmsForm>
    );
};

export default ChangeCredentialsForm;