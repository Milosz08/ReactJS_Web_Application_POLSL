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

import { ROLES } from '../../../helpers/functionsAndClasses/LoginValidator';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { SessionInitialTypes } from '../../../redux/sessionReduxStore/initialState';

import {
    ChangeCredentialsCmsPageContainer, ChangeCredentialsDisabledArea, ChangeCredentialsDisabledInfo
} from './ChangeCredentialsCmsPage.styles';

import ChangeCredentialsForm from './subcomponents/ChangeCredentialsForm';

/**
 * Component reponsible for generating both user and admin/moderator change credentials
 * forms and checking authnetication disable element.
 */
const ChangeCredentialsCmsPage: React.FC = (): JSX.Element => {

    const { adminAuthStatus }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);
    const fieldsDisabled: boolean = adminAuthStatus.identity !== ROLES.ADMIN;

    return (
        <ChangeCredentialsCmsPageContainer
            disabled = {fieldsDisabled}
        >
            <ChangeCredentialsDisabledArea
                disabled = {fieldsDisabled}
            />
            <ChangeCredentialsForm ifUser = {true}/>
            <ChangeCredentialsForm ifUser = {false}/>
            {fieldsDisabled && <ChangeCredentialsDisabledInfo>
                Nie masz wystarczających uprawnień, aby wprowadzać zmian w tej sekcji. Aby wprowadzać zmiany w
                tej sekcji musisz być zalogowany na konto głównego administratora systemu.
            </ChangeCredentialsDisabledInfo>}
        </ChangeCredentialsCmsPageContainer>
    );
};

export default ChangeCredentialsCmsPage;