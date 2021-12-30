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

import {
    UniversalInputContainer, UniversalInputWithButtonInput, UniversalInputWithButtonLabel
} from './UniversalInputWithButton.styles';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { ModalsActions } from '../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../redux/modalsReduxStore/types';

interface PropsProvider {
    modalType: allModals;
    arrayType: allModalsInputs;
    inputType: allModalsInputs;
    arrayIdx: number;
    inputMaxLength: number;
    placeholder?: string;
    ifRemoveWhiteSpaces?: boolean;
    ifExtraRightLeft?: boolean;
}

/**
 * Component reponsible for generating universal input for array objects elements in redux store.
 *
 * @param placeholder { string? } - input placeholder.
 * @param modalType { allModals } - selected modal.
 * @param inputType { allModalsInputs } - selected array in modal.
 * @param arrayType { allModalsInputs } - selected input in array modal.
 * @param arrayIdx { number } - array index element.
 * @param inputMaxLength { number } - max length of input.
 * @param ifRemoveWhiteSpaces { boolean } - flag decided, if before saving in redux store dispatcher should remove white spaces.
 * @param ifExtraRightLeft { boolean? } - flag decided, if component should have extra margin on left and right.
 */
const UniversalInputForArrays: React.FC<PropsProvider> = ({
    placeholder, modalType, inputType, arrayType, arrayIdx, inputMaxLength, ifRemoveWhiteSpaces, ifExtraRightLeft
}): JSX.Element => {

    const { clearSelectedArrayInput } = useValidateAddEditCmsModal(modalType);
    const dispatcher = useDispatch();

    const initialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const inputField = initialState[modalType].modalInputFields![arrayType][arrayIdx][inputType];
    const errorField = initialState[modalType].modalInputErrorsFields![arrayType][arrayIdx][inputType];

    const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        const modifiedInput = ifRemoveWhiteSpaces ? target.value.replaceAll(' ', '').toLowerCase() : target.value;
        dispatcher(ModalsActions.changeModalSelectedInputArray(modalType, arrayType, inputType, arrayIdx, modifiedInput));
        clearSelectedArrayInput(arrayType, inputType, arrayIdx);
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
                />
            </UniversalInputWithButtonLabel>
        </UniversalInputContainer>
    );
};

export default UniversalInputForArrays;