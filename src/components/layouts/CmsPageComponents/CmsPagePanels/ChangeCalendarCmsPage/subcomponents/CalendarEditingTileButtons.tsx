/*
 * Copyright (c) 2022-2022, by Miłosz Gilga <https://miloszgilga.pl>
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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reduxStore';
import { ModalsActions } from '../../../../../../redux/modalsReduxStore/actions';
import { ApiInitialTypes } from '../../../../../../redux/apiReduxStore/initialState';
import { allModals, allModalsActions } from '../../../../../../redux/modalsReduxStore/types';

import { CmsSingleListRemoveButtonTime } from '../../HighOrderComponents/HighOrderComponents.styles';

import {
    CalendarTileAddEditButtonsContainer, CalendarTileAddEditButtonsWrapper, CalendarTileAddEditSingleButtonElement,
    CalendarTileEditIcon
} from '../ChangeCalendarCmsPage.styles';

interface PropsProvider {
    date: Date;
}

/**
 * Component responsible for generate button provides to edit or remove calendar tile content in WYSIWYG mode.
 *
 * @param date { Date } - click tile date element.
 */
const CalendarEditingTileButtons: React.FC<PropsProvider> = ({ date }): JSX.Element => {

    const { calendarContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const dispatcher = useDispatch();

    const findElementIDbyDate = calendarContent.find(cal => (
        cal.day === date.getDate() && cal.month - 1 === date.getMonth() && cal.year === date.getFullYear()
    ));

    const handleEditRemoveCalendarElement = (modalType: allModalsActions): void => {
        const dataID = findElementIDbyDate ? findElementIDbyDate._id : null;
        dispatcher(ModalsActions.changeModalStateElements(true, allModals.CALENDAR_MODAL, dataID, modalType));
    };

    return (
        <CalendarTileAddEditButtonsContainer>
            <CalendarTileAddEditButtonsWrapper>
                <CalendarTileAddEditSingleButtonElement
                    onClick = {() => handleEditRemoveCalendarElement(allModalsActions.EDIT_ELEMENT)}
                    title = 'Kliknij aby edytować zawartość'
                >
                    <CalendarTileEditIcon/>
                </CalendarTileAddEditSingleButtonElement>
                <CalendarTileAddEditSingleButtonElement
                    onClick = {() => handleEditRemoveCalendarElement(allModalsActions.REMOVE_ELEMENT)}
                    title = 'Kliknij aby usunąć zawartość'
                >
                    <CmsSingleListRemoveButtonTime/>
                </CalendarTileAddEditSingleButtonElement>
            </CalendarTileAddEditButtonsWrapper>
        </CalendarTileAddEditButtonsContainer>
    );
};

export default CalendarEditingTileButtons;