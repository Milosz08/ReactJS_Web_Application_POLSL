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
import useAdminNewDataValidate from '../../../../../../helpers/hooks/useAdminNewDataValidate';

import { ChangeCredentialsContext, ChangeCredentialsContextTypes } from '../ChangeCredentialsStoreProvider';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { SessionInitialTypes } from '../../../../../../redux/sessionReduxStore/initialState';

import { ChangeCredentialsSubmitButton } from '../ChangeCredentialsCmsPage.styles';

/**
 * Component responsible for submit and validate inserting data (conntected with redux state and action management).
 */
const ChangeCredentialsSubmitForm: React.FC = (): JSX.Element => {

    const { credentialsRef } = useContext<Partial<ChangeCredentialsContextTypes>>(ChangeCredentialsContext);
    const { adminAuthStatus }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    const submitData = useAdminNewDataValidate(credentialsRef!);

    const handleSubmitForm = (e: React.ChangeEvent): void => {
        e.preventDefault();
        if (adminAuthStatus.identity === ROLES.ADMIN) {
            submitData();
        }
    };

    return (
        <ChangeCredentialsSubmitButton
            type = 'submit'
            onClick = {handleSubmitForm}
            title = 'Kliknij aby zatwierdzić i zweryfikować poprawność wprowadzonych danych'
        >
            Zatwierdź
        </ChangeCredentialsSubmitButton>
    );
};

export default ChangeCredentialsSubmitForm;