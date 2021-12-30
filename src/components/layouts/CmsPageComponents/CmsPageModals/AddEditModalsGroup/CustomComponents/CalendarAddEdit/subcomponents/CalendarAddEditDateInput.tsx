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

import useValidateAddEditCmsModal from '../../../../../../../../helpers/hooks/useValidateAddEditCmsModal';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/reduxStore';
import { ModalsActions } from '../../../../../../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

import { DateCalendarIcon, DateInputContainer, DateInputElement } from '../CalendarAddEdit.styles';

/**
 * Component responsible for generating date picker input for multiple or
 * single calendar record/records.
 */
const CalendarAddEditDateInput: React.FC = (): JSX.Element => {

    const { calendarModal }: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const { clearSelectedInput } = useValidateAddEditCmsModal(allModals.CALENDAR_MODAL);
    const dispatcher = useDispatch();

    const handleDate = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        dispatcher(ModalsActions.changeModalSelectedInput(allModals.CALENDAR_MODAL, allModalsInputs.DATE, target.value));
        clearSelectedInput(allModalsInputs.DATE);
    };

    return (
        <DateInputContainer>
            <DateInputElement
                type = 'date'
                value = {calendarModal.modalInputFields!.date}
                onChange = {handleDate}
                ifError = {calendarModal.modalInputErrorsFields!.date}
            />
            <DateCalendarIcon
                $ifError = {calendarModal.modalInputErrorsFields!.date}
            />
        </DateInputContainer>
    );
};

export default CalendarAddEditDateInput;