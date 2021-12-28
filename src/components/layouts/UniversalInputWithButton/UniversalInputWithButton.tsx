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
import { FaRegTrashAlt } from 'react-icons/all';

import useValidateAddEditCmsModal from '../../../helpers/hooks/useValidateAddEditCmsModal';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import { ModalsActions } from '../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../redux/modalsReduxStore/types';

import {
    CleanInputButtonIconWrapper, UniversalInputWithButtonContainer, UniversalInputWithButtonCustomButton,
    UniversalInputWithButtonInput, UniversalInputWithButtonLabel
} from './UniversalInputWithButton.styles';

interface PropsProvider {
    modalType: allModals;
    inputType: allModalsInputs;
    inputMaxLength: number;
    placeholder?: string;
    ifRemoveWhiteSpaces?: boolean;
    CustomIcon?: any;
    CustomContent?: React.FC;
}

/**
 * Component responsible for generating custom input with clear button. Mostly used in CMS panels and modals.
 *
 * @param placeholder { string? } - input placeholder.
 * @param modalType { allModals } - selected modal.
 * @param inputType { allModalsInputs } - selected modal input.
 * @param CustomIcon { any? } - custom icon component.
 * @param CustomContent { React.FC } - custom react content.
 * @param inputMaxLength { number } - max length of input.
 * @param ifRemoveWhiteSpaces { boolean } - flag decided, if before saving in redux store dispatcher should remove white spaces.
 */
const UniversalInputWithButton: React.FC<PropsProvider> = ({
    placeholder, modalType, inputType, CustomIcon, CustomContent, inputMaxLength, ifRemoveWhiteSpaces
}): JSX.Element => {

    const { clearSelectedInput } = useValidateAddEditCmsModal(modalType);
    const dispatcher = useDispatch();

    const initialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const inputField = initialState[modalType].modalInputFields![inputType];
    const errorField = initialState[modalType].modalInputErrorsFields![inputType];

    const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        const modifiedInput = ifRemoveWhiteSpaces ? target.value.replaceAll(' ', '').toLowerCase() : target.value;
        dispatcher(ModalsActions.changeModalSelectedInput(modalType, inputType, modifiedInput));
        clearSelectedInput(inputType);
    };

    const handleClearInput = () => {
        dispatcher(ModalsActions.changeModalSelectedInput(modalType, inputType, ''));
    };

    return (
        <UniversalInputWithButtonContainer>
            <UniversalInputWithButtonLabel>
                <UniversalInputWithButtonInput
                    type = 'text'
                    placeholder = {placeholder}
                    value = {inputField}
                    onChange = {handleInputChange}
                    ifError = {errorField}
                    maxLength = {inputMaxLength}
                />
                {CustomContent ? <CustomContent/> : <UniversalInputWithButtonCustomButton
                    onClick = {handleClearInput}
                    title = 'Wyczyść pole'
                >
                    <CleanInputButtonIconWrapper
                        $ifError = {errorField}
                    >
                        {CustomIcon ? <CustomIcon/> : <FaRegTrashAlt/>}
                    </CleanInputButtonIconWrapper>
                </UniversalInputWithButtonCustomButton>}
            </UniversalInputWithButtonLabel>
        </UniversalInputWithButtonContainer>
    );
};

export default UniversalInputWithButton;