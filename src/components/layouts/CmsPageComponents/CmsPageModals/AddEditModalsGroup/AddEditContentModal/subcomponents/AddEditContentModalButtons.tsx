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
import useGenerateDatabaseObjects from '../../../../../../../helpers/hooks/useGenerateDatabaseObjects';
import useValidateAddEditCmsModal from '../../../../../../../helpers/hooks/useValidateAddEditCmsModal';
import useRemoveScheduleOnChangeSubject from '../../../../../../../helpers/hooks/useRemoveScheduleOnChangeSubject';

import { STATIC_DAYS } from '../../../../../../../helpers/structs/schedule.config';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/reduxStore';
import { ModalsActions } from '../../../../../../../redux/modalsReduxStore/actions';
import { DbModalOp } from '../../../../../../../redux/apiReduxStore/operationsForModals';
import { ModalsInitialTypes } from '../../../../../../../redux/modalsReduxStore/initialState';
import { DbNonModalOp } from '../../../../../../../redux/apiReduxStore/operationsForNonModals';
import { SessionInitialTypes } from '../../../../../../../redux/sessionReduxStore/initialState';
import { allModals, allModalsActions } from '../../../../../../../redux/modalsReduxStore/types';

import {
    AddEditContentModalButtonsContainer, AddEditContentSaveChangesButton, AddEditContentUnsaveChangesButton
} from '../AddEditContentModal.styles';

const EstimateTimeCounterBar = React.lazy(() => import('../../../../../EstimateTimeCounterBar/EstimateTimeCounterBar'));

interface PropsProvider {
    modalType: allModals;
    title: string;
    mode: allModalsActions;
    id: string | null;
}

/**
 * Component responsible for generating view/edit buttons basic structure and implementation
 * with redux state management.
 *
 * @param modalType { allModals } - enum type of modal.
 * @param title { string } - title text content from redux initial state.
 * @param mode { allModalsActions } - current selected action (add/update).
 * @param id { string } - element id from rest api database.
 */
const AddEditContentModalButtons: React.FC<PropsProvider> = ({ modalType, title, mode, id }): JSX.Element => {

    const modalsInitialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const { headers }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    const day = STATIC_DAYS.find(el => el.name === modalsInitialState.scheduleModal.day)!.eng;

    const generatedObject = useGenerateDatabaseObjects(modalType);
    const { validateReducer } = useValidateAddEditCmsModal(modalType);

    const removeScheduleSubject = useRemoveScheduleOnChangeSubject(modalType, id!);
    const dispatcher = useDispatch();

    const handleUnsaveChangesOnCloseModal = (): void => {
        dispatcher(ModalsActions.changeModalStateElements(false, modalType));
        setTimeout(() => dispatcher(ModalsActions.clearAllInputs(modalType)), 500);
    };

    const afterAsyncCountingCallback = (): void => {
        document.title = 'Zawartość zapisana';
        setTimeout(() => {
            const object = generatedObject();
            handleUnsaveChangesOnCloseModal();
            setTimeout(() => {
                reset();
                if (mode === allModalsActions.ADD_ELEMENT) {
                    dispatcher(DbModalOp.addSingleElementFromCms(modalsInitialState, modalType, object, headers, day));
                } else {
                    dispatcher(DbModalOp.editSingleElementFromCms(modalsInitialState, modalType, object, id, headers, day));
                    removeScheduleSubject();
                }
                dispatcher(DbNonModalOp.updateLastUpdateField(modalsInitialState[modalType].updateApiParam));
            }, 1000);
        }, 2000);
    };

    const { widthState, show, reset, generatingCounter } = useGenerateLoadingLine(
        afterAsyncCountingCallback, allModals.HELPERS_LINKS_MODAL, 20, 'Zapisywanie zawartości', title
    );

    const handleSubmitElement = (): void => {
        if (!validateReducer()) {
            generatingCounter();
        }
    };

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
                onClick = {handleSubmitElement}
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