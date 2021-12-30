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

import GROUPS_STATIC from '../../../../../../../../helpers/structs/allGroups';
import { CLASSES_OPTIONS } from '../../../../../../../../helpers/structs/cmsSystem.config';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/reduxStore';
import { ApiInitialTypes } from '../../../../../../../../redux/apiReduxStore/initialState';
import { ModalsInitialTypes } from '../../../../../../../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs } from '../../../../../../../../redux/modalsReduxStore/types';

import { DisabledBackgroundElement, ScheduleGroupTypeAndRoomContainer } from '../ScheduleAddEdit.styles';
import { ALL_GROUPS } from '../../../../../../../../helpers/structs/schedule.config';

const UniversalSelectInput = React.lazy(() => import('../../../../../../UniversalSelectInput/UniversalSelectInput'));
const UniversalInput = React.lazy(() => import('../../../../../../UniversalInputWithButton/UniversalInput'));
const StartAndEndTimeSubjectTile = React.lazy(() => import('./StartAndEndTimeSubjectTile'));

interface PropsProvider {
    disableComponent: boolean;
}

/**
 * Component responsible for generating subject parameters inputs and select boxes.
 *
 * @param disableComponent { boolean } - flag decided, if component is disabled (when title input is empty or default).
 */
const GroupTypeAndRoomSelectSubjectTile: React.FC<PropsProvider> = ({ disableComponent }): JSX.Element => {

    const { subjectsContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const { scheduleModal }: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);

    const selectSubject = subjectsContent.find(subject => subject.title === scheduleModal.modalInputFields!.title);
    const singleSubjectTypes = selectSubject ? selectSubject.classesPlatforms.map(platform => platform.type) : [];

    const findIfAllTypes = singleSubjectTypes?.find(type => type === 'wszystkie zajęcia');
    const disableRoomInput = selectSubject ? selectSubject!.classesPlatforms.find(info => info.place !== 'kontaktowy') : false;

    const removeAllClassesElm = CLASSES_OPTIONS.TYPES.filter(el => el !== 'wszystkie zajęcia');

    const selectMathingGroupReducer = (selectedSubjectTitle: string): string[] => {
        switch(selectedSubjectTitle.toLocaleLowerCase()) {
            case 'język angielski':
                return GROUPS_STATIC.ENG_GROUPS;
            case 'sieci komputerowe':
                return GROUPS_STATIC.MERGE_SK_GROUPS;
            default:
                return GROUPS_STATIC.NORMAL_GROUPS;
        }
    };

    return (
        <ScheduleGroupTypeAndRoomContainer>
            <DisabledBackgroundElement
                $ifVisible = {disableComponent}
            />
            <UniversalSelectInput
                allOptions = {[ALL_GROUPS].concat(selectMathingGroupReducer(selectSubject ? selectSubject!.title : ''))}
                defaultOption = 'wybierz grupę'
                modalType = {allModals.SCHEDULE_MODAL}
                inputFieldType = {allModalsInputs.GROUP}
                disableInput = {disableComponent}
            />
            <UniversalSelectInput
                allOptions = {Boolean(findIfAllTypes) ? removeAllClassesElm : singleSubjectTypes}
                defaultOption = 'wybierz typ zajęć'
                modalType = {allModals.SCHEDULE_MODAL}
                inputFieldType = {allModalsInputs.TYPE}
                disableInput = {disableComponent}
            />
            <UniversalInput
                modalType = {allModals.SCHEDULE_MODAL}
                inputType = {allModalsInputs.ROOM}
                inputMaxLength = {10}
                placeholder = 'Sala'
                disabled = {Boolean(disableRoomInput) || disableComponent}
            />
            <StartAndEndTimeSubjectTile
                disableComponent = {disableComponent}
            />
        </ScheduleGroupTypeAndRoomContainer>
    );
};

export default GroupTypeAndRoomSelectSubjectTile;