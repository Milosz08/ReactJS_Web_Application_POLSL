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

import { MAX_MESSAGE_LENGTH } from '../../../../../../../../helpers/structs/calendar.config';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/reduxStore';
import { ModalsActions } from '../../../../../../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

import {
    CalendarTextinputArea,
    CalendarTextinputAreaCharsCounter,
    CalendarTextinputAreaContainer
} from '../CalendarAddEdit.styles';
import useValidateAddEditCmsModal from '../../../../../../../../helpers/hooks/useValidateAddEditCmsModal';

const UniversalTimeInput = React.lazy(() => import('../../../../../../UniversalTimeInput/UniversalTimeInput'));
const CalendarSingleInjectRadioButtons = React.lazy(() => import('./CalendarSingleInjectRadioButtons'));

interface PropsProvider {
    tileIdx: number;
}

/**
 * Component responsible for generating all content in single tile providing insert calendar activity
 * properties.
 *
 * @param tileIdx { number } - calendar message redux state array index.
 */
const CalendarSingleInject: React.FC<PropsProvider> = ({ tileIdx }): JSX.Element => {

    const { calendarModal }: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const selectedItem = calendarModal.modalInputFields!.items[tileIdx];
    const selectedErrFields = calendarModal.modalInputErrorsFields!.items[tileIdx];

    const { clearSelectedArrayInput } = useValidateAddEditCmsModal(allModals.CALENDAR_MODAL);
    const dispatcher = useDispatch();

    const handleChangeTime = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        clearSelectedArrayInput(allModalsInputs.ITEMS, allModalsInputs.START, tileIdx);
        dispatcher(ModalsActions.changeModalSelectedInputArray(
            allModals.CALENDAR_MODAL, allModalsInputs.ITEMS, allModalsInputs.START, tileIdx, target.value
        ));
    };

    const handleChangeMessage = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        clearSelectedArrayInput(allModalsInputs.ITEMS, allModalsInputs.MESSAGE, tileIdx);
        dispatcher(ModalsActions.changeModalSelectedInputArray(
            allModals.CALENDAR_MODAL, allModalsInputs.ITEMS, allModalsInputs.MESSAGE, tileIdx, target.value
        ));
    };

    return (
        <>
            <UniversalTimeInput
                timeValue = {selectedItem.start}
                changeCallback = {handleChangeTime}
                ifError = {selectedErrFields.start}
            />
            <CalendarSingleInjectRadioButtons
                itemIdx = {tileIdx}
            />
            <CalendarTextinputAreaContainer>
                <CalendarTextinputArea
                    type = 'text'
                    value = {selectedItem.message}
                    onChange = {handleChangeMessage}
                    $ifError = {selectedErrFields.message}
                    placeholder = 'Wprowadź opis wydarzenia'
                    maxLength = {MAX_MESSAGE_LENGTH}
                />
                <CalendarTextinputAreaCharsCounter>
                    {selectedItem.message.length} / {MAX_MESSAGE_LENGTH}
                </CalendarTextinputAreaCharsCounter>
            </CalendarTextinputAreaContainer>
        </>
    )
};

export default CalendarSingleInject;