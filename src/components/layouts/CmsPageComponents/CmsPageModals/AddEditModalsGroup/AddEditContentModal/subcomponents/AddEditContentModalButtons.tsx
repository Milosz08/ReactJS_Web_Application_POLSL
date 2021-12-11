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

import useGenerateLoadingLine from '../../../../../../../helpers/hooks/useGenerateLoadingLine';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/reduxStore';
import { allModals } from '../../../../../../../redux/modalsReduxStore/types';
import { updateSections } from '../../../../../../../redux/apiReduxStore/types';
import { updateSectionDates } from '../../../../../../../redux/apiReduxStore/actions';
import { ModalsInitialTypes } from '../../../../../../../redux/modalsReduxStore/initialState';
import { changeModalStateElements } from '../../../../../../../redux/modalsReduxStore/actions';

import {
    AddEditContentModalButtonsContainer, AddEditContentSaveChangesButton, AddEditContentUnsaveChangesButton
} from '../AddEditContentModal.styles';

const EstimateTimeCounterBar = React.lazy(() => import('../../../../../EstimateTimeCounterBar/EstimateTimeCounterBar'));

interface PropsProvider {
    modalType: allModals;
    title: string;
}

/**
 * Component responsible for generating view/edit buttons basic structure and implementation
 * with redux state management.
 *
 * @param modalType { allModals } - enum type of modal.
 * @param title { string } - title text content from redux initial state.
 */
const AddEditContentModalButtons: React.FC<PropsProvider> = ({ modalType, title  }): JSX.Element => {

    const modalsInitialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const dispatcher = useDispatch();

    const handleUnsaveChangesOnCloseModal = (): void => {
        dispatcher(changeModalStateElements(false, modalType));
    };

    const afterAsyncCountingCallback = (): void => {
        document.title = 'Zawartość zapisana';
        setTimeout(() => {
            handleUnsaveChangesOnCloseModal();
            setTimeout(() => {
                reset();
                // dispatcher function here
                dispatcher(updateSectionDates(updateSections[modalsInitialState[modalType].updateApiParam]));
            }, 1000);
        }, 2000);
    };

    const { widthState, show, reset, generatingCounter } = useGenerateLoadingLine(
        afterAsyncCountingCallback, 20, 'Zapisywanie zawartości', title
    );

    return (
        <AddEditContentModalButtonsContainer
            ifExtraMargin = {show}
        >
            <AddEditContentUnsaveChangesButton
                onClick = {handleUnsaveChangesOnCloseModal}
            >
                Zamknij bez zapisu
            </AddEditContentUnsaveChangesButton>
            <AddEditContentSaveChangesButton
                onClick = {generatingCounter}
            >
                Zapisz zmiany
            </AddEditContentSaveChangesButton>
            <EstimateTimeCounterBar
                visibility = {show}
                width = {Math.floor(widthState / 20 * 100)}
                content = 'Zapisywanie:'
            />
        </AddEditContentModalButtonsContainer>
    );
};

export default AddEditContentModalButtons;