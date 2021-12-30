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

import useFindMatchingElement from '../../../../../../../helpers/hooks/useFindMatchingElement';
import useAutoFilledModalEdit from '../../../../../../../helpers/hooks/useAutoFilledModalEdit';

import { STATIC_DAYS } from '../../../../../../../helpers/structs/schedule.config';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/reduxStore';
import { apiReducerTypes } from '../../../../../../../redux/apiReduxStore/types';
import { ScheduleContentTypes } from '../../../../../../../redux/apiReduxStore/dataTypes';
import { ModalsInitialTypes } from '../../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../../../../../redux/modalsReduxStore/types';

import { AddEditCustomContentContainer } from '../../AddEditContentModal/AddEditContentModal.styles';

const ScheduleSelectSubjectTitle = React.lazy(() => import('./subcomponents/ScheduleSelectSubjectTitle'));
const GroupTypeAndRoomSelectSubjectTile = React.lazy(() => import('./subcomponents/GroupTypeAndRoomSelectSubjectTile'));

/**
 * Component reponsible for generating and filling basic structure of schedule subject add/edit modal.
 */
const ScheduleAddEdit: React.FC = (): JSX.Element => {

    const { scheduleModal }: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const selectedDay = STATIC_DAYS.find(day => day.name === scheduleModal.day)!.eng;

    const { TITLE, GROUP, START_HOUR, END_HOUR, ROOM, TYPE } = allModalsInputs;

    const matchElm: ScheduleContentTypes | any = useFindMatchingElement(
        allModals.SCHEDULE_MODAL, apiReducerTypes.SCHEDULE, selectedDay
    );

    const filledArr = matchElm ? [
        matchElm.title, matchElm.group, matchElm.startHour, matchElm.endHour, matchElm.room, matchElm.type
    ] : [ '', '', '', '', '', '' ];

    useAutoFilledModalEdit(allModals.SCHEDULE_MODAL, [ TITLE, GROUP, START_HOUR, END_HOUR, ROOM, TYPE ], filledArr);

    return (
        <AddEditCustomContentContainer>
            <ScheduleSelectSubjectTitle/>
            <GroupTypeAndRoomSelectSubjectTile
                disableComponent = {scheduleModal.modalInputFields!.title === 'wybierz przedmiot'}
            />
        </AddEditCustomContentContainer>
    );
};

export default ScheduleAddEdit;