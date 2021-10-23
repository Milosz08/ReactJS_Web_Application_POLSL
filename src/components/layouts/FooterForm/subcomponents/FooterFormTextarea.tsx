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
import { Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { insertInFooterInputs, setErrorsFooterInputs } from '../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import { FOOTER_INPUTS, FOOTER_TEXTAREA_PROPS } from '../../../../helpers/structs/footerOptions.config';

import { FooterFormTextareaStyled, TextareaCharsQuantity } from '../FooterForm.styles';

/**
 *
 */
const FooterFormTextarea: React.FC = (): JSX.Element => {

    const { footerForm, footerFormErrors }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const dispatcher = useDispatch();

    const { MIN_LENGTH_TEXTAREA, MAX_LENGTH_TEXTAREA, TEXTAREA_ROWS } = FOOTER_TEXTAREA_PROPS;
    const { USER_MESSAGE } = FOOTER_INPUTS;

    const handleTextareaInput = ({ target }: React.ChangeEvent<HTMLTextAreaElement>): void => {
        dispatcher(insertInFooterInputs(USER_MESSAGE, target.value));
        dispatcher(setErrorsFooterInputs(USER_MESSAGE, false));
    };

    return (
        <Fragment>
            <FooterFormTextareaStyled
                placeholder = 'Wpisz tutaj swoją wiadomość'
                rows = {TEXTAREA_ROWS}
                minLength = {MIN_LENGTH_TEXTAREA}
                maxLength = {MAX_LENGTH_TEXTAREA}
                ifError = {footerFormErrors[USER_MESSAGE]}
                value = {footerForm[USER_MESSAGE]}
                onChange = {handleTextareaInput}
            />
            <TextareaCharsQuantity>
                {footerForm[USER_MESSAGE].length} / {MAX_LENGTH_TEXTAREA}
            </TextareaCharsQuantity>
        </Fragment>
    );
};

export default FooterFormTextarea;