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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { insertInFooterInputs, setErrorsFooterInputs } from '../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import { FOOTER_INPUTS } from '../../../../helpers/structs/footerOptions.config';

import { CheckboxCheckmark, CheckboxInput, CheckFieldContainer, CheckFieldLabel } from '../FooterForm.styles';

/**
 *
 */
const FooterFormCheckfield: React.FC = (): JSX.Element => {

    const { footerForm, footerFormErrors }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const dispatcher = useDispatch();

    const { IF_ACCEPTED_TERMS } = FOOTER_INPUTS;

    const handleCheckboxInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        dispatcher(insertInFooterInputs(IF_ACCEPTED_TERMS, target.checked));
        dispatcher(setErrorsFooterInputs(IF_ACCEPTED_TERMS, false));
    };

    return (
        <CheckFieldContainer>
            <CheckboxInput
                type = 'checkbox'
                id = 'agreeCheckfield'
                onChange = {handleCheckboxInput}
                checked = {footerForm[IF_ACCEPTED_TERMS]}
            />
            <CheckboxCheckmark
                ifError = {footerFormErrors[IF_ACCEPTED_TERMS]}
            />
            <CheckFieldLabel htmlFor = 'agreeCheckfield'>
                Wyrażam zgodę na przetwarzanie wyżej podanych przeze mnie informacji.
            </CheckFieldLabel>
        </CheckFieldContainer>
    );
};

export default FooterFormCheckfield;