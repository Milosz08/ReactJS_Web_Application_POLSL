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

import { CALENDAR_LEVELS, LEVELS } from '../../../../../../../../helpers/structs/calendar.config';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/reduxStore';
import { ModalsActions } from '../../../../../../../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

const UniversalRadioInput = React.lazy(() => import('../../../../../../UniversalRadioInput/UniversalRadioInput'));

interface PropsProvider {
    itemIdx: number;
}

/**
 * Component responsible for generating radio buttons for select calendar message priority.
 *
 * @param itemIdx { number } - calendar message redux state array index.
 */
const CalendarSingleInjectRadioButtons: React.FC<PropsProvider> = ({ itemIdx }): JSX.Element => {

    const { calendarModal }: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const selectedItem = calendarModal.modalInputFields!.items[itemIdx];

    const dispatcher = useDispatch();

    const handleChangeRadioButton = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        dispatcher(ModalsActions.changeModalSelectedInputArray(
            allModals.CALENDAR_MODAL, allModalsInputs.ITEMS, allModalsInputs.LEVEL, itemIdx, target.id.slice(0, -1)
        ));
    };

    const generateRadioButtons = Object.keys(LEVELS).map((level, idx) => (
        <UniversalRadioInput
            content = {`${CALENDAR_LEVELS[idx].name} priorytet`}
            color = {`var(--${CALENDAR_LEVELS[idx].color}Color)`}
            radioProps = {{
                id: `${level}${itemIdx}`,
                name: `radioLevelsModal_${itemIdx}`,
                checked: selectedItem.importantLevel === level,
                onChangeCallback: handleChangeRadioButton,
            }}
        />
    ));

    return (
        <>
            {generateRadioButtons}
        </>
    );
};

export default CalendarSingleInjectRadioButtons;