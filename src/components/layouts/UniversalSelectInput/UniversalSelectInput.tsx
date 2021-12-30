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
import {
    UniversalSelectInputArrow, UniversalSelectInputContainer, UniversalSelectInputElement
} from './UniversalSelectInput.styles';
import { allModals, allModalsInputs } from '../../../redux/modalsReduxStore/types';
import { ModalsInitialTypes } from '../../../redux/modalsReduxStore/initialState';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
import useValidateAddEditCmsModal from '../../../helpers/hooks/useValidateAddEditCmsModal';
import { ModalsActions } from '../../../redux/modalsReduxStore/actions';

interface PropsProvider {
    allOptions: string[];
    defaultOption: string;
    modalType: allModals;
    inputFieldType: allModalsInputs;
    extraTopBottomMargin?: boolean;
    disableInput?: boolean;
}

/**
 * Universal component responsible for generating select input with options for single 1st root elements.
 *
 * @param allOptions { string[] } - all options inserting into select input.
 * @param defaultOption { string } - default option inserting in options input array.
 * @param modalType { allModals } - selected modal.
 * @param inputFieldType { allModalsInputs } - selected array in modal.
 * @param extraTopBottomMargin { boolean? } - flag decided to show margin on small devices.
 * @param disableInput { boolean? } - flag decided, if input should be disabled.
 */
const UniversalSelectInput: React.FC<PropsProvider> = ({
    allOptions, defaultOption, modalType, inputFieldType, extraTopBottomMargin, disableInput
}): JSX.Element => {

    const modals: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const { clearSelectedInput } = useValidateAddEditCmsModal(modalType);
    const dispatcher = useDispatch();

    const modalInput = modals[modalType].modalInputFields![inputFieldType];
    const modalError = modals[modalType].modalInputErrorsFields![inputFieldType];

    const addDefaultOption = [ defaultOption ].concat(allOptions);

    const generateOptions = addDefaultOption.map((el, idx) => (
        <option key = {idx} value = {el}>
            {el}
        </option>
    ));

    const handleChangeInputOptions = ({ target }: React.ChangeEvent<HTMLSelectElement>): void => {
        if (!disableInput) {
            dispatcher(ModalsActions.changeModalSelectedInput(modalType, inputFieldType, target.value));
            clearSelectedInput(inputFieldType);
        }
    };

    return (
        <UniversalSelectInputContainer
            extraTopBottomMargin = {extraTopBottomMargin}
        >
            <UniversalSelectInputElement
                ifError = {modalError}
                value = {modalInput}
                onChange = {handleChangeInputOptions}
                disabled = {disableInput}
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