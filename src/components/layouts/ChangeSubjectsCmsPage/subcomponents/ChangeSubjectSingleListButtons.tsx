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
import { FiEdit } from 'react-icons/all';

import { useDispatch } from 'react-redux';
import { changeModalStateElements } from '../../../../redux/modalsReduxStore/actions';
import { allModals, allModalsActions } from '../../../../redux/modalsReduxStore/types';

import {
    ChangeSubjectSingleListButtonsContainer, ChangeSubjectSingleListEditButton, ChangeSubjectSingleListRemoveButton,
    ChangeSubjectSingleListRemoveButtonTime
} from '../ChangeSubjectsCmsPage.styles';

interface PropsProvider {
    dataID: string;
}

/**
 * Component responsible for generating managing data buttons in single tile subject element.
 * Connected with modalReducer redux state management.
 *
 * @param dataID { string } - single tile database element ID.
 */
const ChangeSubjectSingleListButtons: React.FC<PropsProvider> = ({ dataID }): JSX.Element => {

    const dispatcher = useDispatch();

    const handleModalButtons = (modalType: allModalsActions): void => {
        dispatcher(changeModalStateElements(true, allModals.SUBJECT_MODAL, dataID, modalType));
    };

    return (
        <ChangeSubjectSingleListButtonsContainer>
            <ChangeSubjectSingleListEditButton
                onClick = {() => handleModalButtons(allModalsActions.EDIT_ELEMENT)}
                title = 'Kliknij, aby wprowadzić zmiany w parametrach przedmiotu.'
            >
                <FiEdit/>
            </ChangeSubjectSingleListEditButton>
            <ChangeSubjectSingleListRemoveButton
                onClick = {() => handleModalButtons(allModalsActions.REMOVE_ELEMENT)}
                title = 'Kliknij, aby usunąć przedmiot z bazy danych.'
            >
                <ChangeSubjectSingleListRemoveButtonTime/>
            </ChangeSubjectSingleListRemoveButton>
        </ChangeSubjectSingleListButtonsContainer>
    );
};

export default ChangeSubjectSingleListButtons;