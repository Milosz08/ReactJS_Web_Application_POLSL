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

import { RootState } from '../../../redux/reduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { ModalsActions } from '../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../redux/modalsReduxStore/types';

import {
    UniversalSelectInputArrow, UniversalSelectInputContainer, UniversalSelectInputElement
} from './UniversalSelectInput.styles';

interface PropsProvider {
    allOptions: string[];
    defaultOption: string;
    modalType: allModals;
    arrayFieldType: allModalsInputs;
    inputFieldType: allModalsInputs;
    itemIndex: number;
    extraTopBottomMargin?: boolean;
}

/**
 * Universal component responsible for generating select input based on options array given in props.
 *
 * @param allOptions { string[] } - all options inserting into select input.
 * @param defaultOption { string } - default option inserting in options input array.
 * @param modalType { allModals } - selected modal.
 * @param arrayFieldType { allModalsInputs } - selected input in array modal.
 * @param inputFieldType { allModalsInputs } - selected array in modal.
 * @param itemIndex { number } - array index element.
 * @param extraTopBottomMargin { boolean? } - flag decided to show margin on small devices.
 */
const UniversalSelectInput: React.FC<PropsProvider> = ({
    allOptions, defaultOption, modalType, arrayFieldType, inputFieldType, itemIndex, extraTopBottomMargin
}): JSX.Element => {

    const modals: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const dispatcher = useDispatch();

    const modalInput = modals[modalType].modalInputFields![arrayFieldType][itemIndex][inputFieldType];
    const modalError = modals[modalType].modalInputErrorsFields![arrayFieldType][itemIndex][inputFieldType];

    const addDefaultOption = [defaultOption].concat(allOptions);

    const generateOptions = addDefaultOption.map(el => (
        <option key = {el} value = {el}>
            {el}
        </option>
    ));

    const handleChangeInputOptions = ({ target }: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatcher(ModalsActions.changeModalSelectedInputArray(modalType, arrayFieldType, inputFieldType, itemIndex, target.value));
    };

    return (
        <UniversalSelectInputContainer
            extraTopBottomMargin = {extraTopBottomMargin}
        >
            <UniversalSelectInputElement
                ifError = {modalError}
                value = {modalInput}
                onChange = {handleChangeInputOptions}
            >
                {generateOptions}
            </UniversalSelectInputElement>
            <UniversalSelectInputArrow
                $ifError = {modalError}
            />
        </UniversalSelectInputContainer>
    );
};

export default UniversalSelectInput;