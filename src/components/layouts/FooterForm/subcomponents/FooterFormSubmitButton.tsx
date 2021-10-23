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
import useFooterForm from '../../../../helpers/hooks/useFooterForm';

import { FormSubmitAsideText, FormSubmitButton, FormSubmitButtonContainer } from '../FooterForm.styles';
import useTitleFooterForm from '../../../../helpers/hooks/useTitleFooterForm';
import { useDispatch } from 'react-redux';
import { postDataFooterForm } from '../../../../redux/preferencesReduxStore/actions';

/**
 *
 */
const FooterFormSubmitButton: React.FC = (): JSX.Element => {

    const [ validateForm, clearAllInputs ] = useFooterForm();
    const [ grabber, handleShowPosMess ] = useTitleFooterForm();

    const dispatcher = useDispatch();

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            dispatcher(postDataFooterForm());
            handleShowPosMess();
            clearAllInputs();
            console.log('submit');
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