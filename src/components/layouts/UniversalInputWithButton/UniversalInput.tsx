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

import useValidateAddEditCmsModal from '../../../helpers/hooks/useValidateAddEditCmsModal';

import { RootState } from '../../../redux/reduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { ModalsActions } from '../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../redux/modalsReduxStore/types';

import {
    UniversalInputContainer, UniversalInputWithButtonInput, UniversalInputWithButtonLabel
} from './UniversalInputWithButton.styles';

interface PropsProvider {
    modalType: allModals;
    inputType: allModalsInputs;
    inputMaxLength: number;
    placeholder?: string;
    ifRemoveWhiteSpaces?: boolean;
    ifExtraRightLeft?: boolean;
    disabled?: boolean
}

/**
 * Component reponsible for generating universal input for 1st level objects elements in redux store.
 *
 * @param placeholder { string? } - input placeholder.
 * @param modalType { allModals } - selected modal.
 * @param inputType { allModalsInputs } - selected array in modal.
 * @param inputMaxLength { number } - max length of input.
 * @param ifRemoveWhiteSpaces { boolean } - flag decided, if before saving in redux store dispatcher should remove white spaces.
 * @param ifExtraRightLeft { boolean? } - flag decided, if component should have extra margin on left and right.
 * @param disabled { boolean } - flag decided to disable input field.
 */
const UniversalInput: React.FC<PropsProvider> = ({
    placeholder, modalType, inputType, inputMaxLength, ifRemoveWhiteSpaces, ifExtraRightLeft, disabled
}): JSX.Element => {

    const initialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const { clearSelectedInput } = useValidateAddEditCmsModal(modalType);
    const dispatcher = useDispatch();

    const inputField = initialState[modalType].modalInputFields![inputType];
    const errorField = initialState[modalType].modalInputErrorsFields![inputType];

    const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        if (!disabled) {
            const modifiedInput = ifRemoveWhiteSpaces ? target.value.replaceAll(' ', '').toLowerCase() : target.value;
            dispatcher(ModalsActions.changeModalSelectedInput(modalType, inputType, modifiedInput));
            clearSelectedInput(inputType);
        }
    };

    return (
        <UniversalInputContainer
            ifExtraRightLeft = {ifExtraRightLeft}
        >
            <UniversalInputWithButtonLabel>
                <UniversalInputWithButtonInput
                    type = 'text'
                    placeholder = {placeholder}
                    value = {inputField}
                    onChange = {handleInputChange}
                    ifError = {errorField}
                    removeRightSpace = {true}
                    maxLength = {inputMaxLength}
                    disabled = {disabled || false}
                />
            </UniversalInputWithButtonLabel>
        </UniversalInputContainer>
    );
};

export default UniversalInput;