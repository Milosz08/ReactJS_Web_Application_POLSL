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
    CalendarModalButton, CalendarModalDateInfo, CalendarModalHeader, CalendarPageModalContainer
} from '../CalendarPageElements.styles';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { toggleCalendarMobileModal } from '../../../../redux/preferencesReduxStore/actions';

import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';
import { ApiInitialTypes } from '../../../../redux/apiReduxStore/initialState';

import ConvertTimeUTC, { DATE_OR_TIME } from '../../../../helpers/functionsAndClasses/convertTimeUTC';

const CalendarSingleTaskPerDay = React.lazy(() => import('./CalendarSingleTaskPerDay'));

/**
 * Component responsible for generating calendar activities modal (only on mobile devices,
 * active on click in calendar tile).
 */
const CalendarModal: React.FC = (): JSX.Element => {

    const { calendarContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const { calendarMobileModalOpen }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const dispatcher = useDispatch();

    const date = new ConvertTimeUTC(calendarMobileModalOpen.dateInfo);
    const { dateInfo } = calendarMobileModalOpen;

    const handleCloseModal = (): void => {
        dispatcher(toggleCalendarMobileModal(false, new Date()));
    };

    const filteredRecord = calendarContent.find((record: any) => (
        record.day === dateInfo.getDate() && record.month - 1 === dateInfo.getMonth() && record.year === dateInfo.getFullYear()
    ));

    return (
        <CalendarPageModalContainer
            ifActive = {calendarMobileModalOpen.toggleState}
        >
            <CalendarModalHeader>Aktywności</CalendarModalHeader>
            <CalendarModalDateInfo>
                w dniu {date.getAllDateElms(DATE_OR_TIME.DATE_TYPE)}
            </CalendarModalDateInfo>
            <CalendarSingleTaskPerDay
                filteredRecord = {filteredRecord}
            />
            <CalendarModalButton
                onClick = {handleCloseModal}
            />
        </CalendarPageModalContainer>
    );
};

export default CalendarModal;