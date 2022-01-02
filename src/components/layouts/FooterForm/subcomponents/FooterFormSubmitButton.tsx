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
import { AES } from 'crypto-js';

import useFooterForm from '../../../../helpers/hooks/useFooterForm';
import { API_ENDPOINTS } from '../../../../helpers/structs/appEndpoints';
import useTitleFooterForm from '../../../../helpers/hooks/useTitleFooterForm';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { apiGetContentFromDB } from '../../../../redux/apiReduxStore/types';
import { DbNonModalOp } from '../../../../redux/apiReduxStore/operationsForNonModals';
import { SessionInitialTypes } from '../../../../redux/sessionReduxStore/initialState';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import { FormSubmitAsideText, FormSubmitButton, FormSubmitButtonContainer } from '../FooterForm.styles';

/**
 * Component responsible for generating footer form structure and implementation logic from custom hooks.
 */
const FooterFormSubmitButton: React.FC = (): JSX.Element => {

    const { footerForm }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const { headers }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    const hashKey: string = process.env.REACT_APP_HASH_CODE || '';

    const [ validateForm, clearAllInputs ] = useFooterForm();
    const [ grabber, handleShowPosMess ] = useTitleFooterForm();

    const dispatcher = useDispatch();

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const { userNickname: userIdentity, typeOfMessage: userChoice, userMessage } = footerForm;
            dispatcher(DbNonModalOp.addSingleNonModalElement({
                ...footerForm, userChoice,
                userIdentity: AES.encrypt(userIdentity, hashKey).toString(),
                userMessage: AES.encrypt(userMessage, hashKey).toString(),
            }, apiGetContentFromDB.USER_MESSAGES, API_ENDPOINTS.FOOTER_FORM, headers));
            handleShowPosMess();
            clearAllInputs();
        }
    };

    return (
        <FormSubmitButtonContainer>
            <FormSubmitButton
                type = 'submit'
                onClick = {handleSubmitForm}
            >
                <FormSubmitAsideText
                    ref = {grabber}
                >
                    Wiadomość została wysłana.
                </FormSubmitAsideText>
                Wyślij
            </FormSubmitButton>
        </FormSubmitButtonContainer>
    );
};

export default FooterFormSubmitButton;