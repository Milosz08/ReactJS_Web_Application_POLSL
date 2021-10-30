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
import { MdKeyboardArrowDown } from 'react-icons/all';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { insertInFooterInputs, setErrorsFooterInputs } from '../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

import generateID from '../../../../helpers/functionsAndClasses/generateID';
import { FOOTER_INPUTS, FOOTER_OPTIONS } from '../../../../helpers/structs/footerOptions.config';

import { FooterFormInput, FooterFormSelect, FooterFormSelectContainer, ShowOptionsArrowWrapper } from '../FooterForm.styles';

/**
 * Component responsible for generating footer form general inputs (nickname, choice and message).
 */
const FooterFormInputs: React.FC = (): JSX.Element => {

    const { footerForm, footerFormErrors }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const dispatcher = useDispatch();

    const { USER_NICKNAME, TYPEOF_MESSAGE } = FOOTER_INPUTS;

    const generateAllOptions = FOOTER_OPTIONS.map(option => (
        <option key = {generateID()} value = {option.value}>
            {option.name}
        </option>
    ));

    const handleInputsChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        dispatcher(insertInFooterInputs(target.id, target.value));
        dispatcher(setErrorsFooterInputs(target.id, false));
    };

    return (
        <Fragment>
            <FooterFormInput
                type = 'text'
                placeholder = 'Imię lub nick (bez spacji)'
                ifError = {footerFormErrors[USER_NICKNAME]}
                id = {USER_NICKNAME}
                value = {footerForm[USER_NICKNAME]}
                onChange = {handleInputsChange}
            />
            <FooterFormSelectContainer>
                <FooterFormSelect
                    id = {TYPEOF_MESSAGE}
                    ifError = {footerFormErrors[TYPEOF_MESSAGE]}
                    value = {footerForm[TYPEOF_MESSAGE]}
                    onChange = {handleInputsChange}
                >
                    {generateAllOptions}
                </FooterFormSelect>
                <ShowOptionsArrowWrapper
                    ifError = {footerFormErrors[TYPEOF_MESSAGE]}
                >
                    <MdKeyboardArrowDown/>
                </ShowOptionsArrowWrapper>
            </FooterFormSelectContainer>
        </Fragment>
    );
};

export default FooterFormInputs;