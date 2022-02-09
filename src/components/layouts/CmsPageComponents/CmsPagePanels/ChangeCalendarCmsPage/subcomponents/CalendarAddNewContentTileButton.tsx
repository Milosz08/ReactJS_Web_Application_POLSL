/*
 * Copyright (c) 2022, by Miłosz Gilga <https://miloszgilga.pl>
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
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { ModalsActions } from '../../../../../../redux/modalsReduxStore/actions';
import { allModals, allModalsActions, allModalsInputs } from '../../../../../../redux/modalsReduxStore/types';

import {
    AddNewContentIcon, CalendarTileAddEditButtonsContainer,CalendarTileAddEditButtonsWrapper, CalendarTileAddEditSingleButtonElement
} from '../ChangeCalendarCmsPage.styles';

interface PropsProvider {
    date: Date;
}

/**
 * Component responsible for generate button provides to add new calendar tile content in WYSIWYG mode.
 *
 * @param date { Date } - click tile date element.
 */
const CalendarAddNewContentTileButton: React.FC<PropsProvider> = ({ date }): JSX.Element => {

    const dispatcher = useDispatch();

    const handleAddNewCalendarTileContent = (): void => {
        const convertDate = moment(date).format('yyyy-MM-DD');
        dispatcher(ModalsActions.changeModalSelectedInput(allModals.CALENDAR_MODAL, allModalsInputs.DATE, convertDate))
        dispatcher(ModalsActions.changeModalStateElements(true, allModals.CALENDAR_MODAL, null, allModalsActions.ADD_ELEMENT));
    };

    return (
        <CalendarTileAddEditButtonsContainer>
            <CalendarTileAddEditButtonsWrapper>
                <CalendarTileAddEditSingleButtonElement
                    onClick = {handleAddNewCalendarTileContent}
                    title = 'Kliknij aby dodać nową zawartość'
                >
                    <AddNewContentIcon/>
                </CalendarTileAddEditSingleButtonElement>
            </CalendarTileAddEditButtonsWrapper>
        </CalendarTileAddEditButtonsContainer>
    );
};

export default CalendarAddNewContentTileButton;