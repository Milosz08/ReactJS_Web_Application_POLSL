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
import { FiEdit, FiMessageSquare } from 'react-icons/all';

import { useDispatch } from 'react-redux';
import { ModalsActions } from '../../../../../redux/modalsReduxStore/actions';
import { allModals, allModalsActions, allModalsInputs } from '../../../../../redux/modalsReduxStore/types';

import {
    CmsSingleListActionButton, CmsSingleListButtonsContainer, CmsSingleListRemoveButtonTime
} from './HighOrderComponents.styles';

interface PropsProvider {
    dataID: string;
    modalTypeEnum: allModals;
    ifViewmodeActive: boolean;
    day?: string;
}

/**
 * High order component responsible for generate action buttons in list single element.
 *
 * @param dataID { string } - element ID from database.
 * @param modalTypeEnum { allModals } - actual using modal.
 * @param ifViewmodeActive { boolean } - flag, decided if view mode or edit mode is active.
 * @param day { string } - current schedule modal day configuration.
 */
const SingleElementButtons: React.FC<PropsProvider> = ({ dataID, modalTypeEnum, ifViewmodeActive, day }): JSX.Element => {

    const { EDIT_ELEMENT, VIEW_ELEMENT, REMOVE_ELEMENT } = allModalsActions;
    const dispatcher = useDispatch();

    const handleModalButtons = (modalType: allModalsActions): void => {
        dispatcher(ModalsActions.changeModalStateElements(true, modalTypeEnum, dataID, modalType));
        if (modalTypeEnum === allModals.SCHEDULE_MODAL) {
            dispatcher(ModalsActions.changeModalRootElement(allModals.SCHEDULE_MODAL, allModalsInputs.DAY, day));
        }
    };

    return (
        <CmsSingleListButtonsContainer>
            <CmsSingleListActionButton
                onClick = {() => handleModalButtons(ifViewmodeActive ? VIEW_ELEMENT : EDIT_ELEMENT)}
                title = {`Kliknij, aby ${ifViewmodeActive ? 'podejrzeć zawartość' : 'wprowadzić zmiany'}.`}
            >
                {ifViewmodeActive ? <FiMessageSquare/> : <FiEdit/>}
            </CmsSingleListActionButton>
            <CmsSingleListActionButton
                onClick = {() => handleModalButtons(REMOVE_ELEMENT)}
                title = 'Kliknij, aby usunąć wybrany element.'
            >
                <CmsSingleListRemoveButtonTime/>
            </CmsSingleListActionButton>
        </CmsSingleListButtonsContainer>
    );
};

export default SingleElementButtons;