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

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/reduxStore';
import { allModals } from '../../redux/modalsReduxStore/types';
import { ApiInitialTypes } from '../../redux/apiReduxStore/initialState';
import { DbModalOp } from '../../redux/apiReduxStore/operationsForModals';
import { ModalsInitialTypes } from '../../redux/modalsReduxStore/initialState';
import { SessionInitialTypes } from '../../redux/sessionReduxStore/initialState';

import { STATIC_DAYS } from '../structs/schedule.config';

/**
 * Custom hook responsible for removing selected schedule subjects content.
 *
 * @param modalType { allModals } - selected modal.
 * @param dataID { string } - element ID.
 */
const useRemoveScheduleOnChangeSubject = (modalType: allModals, dataID: string) => {

    const modalsInitialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const { scheduleContent, subjectsContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const { headers }: SessionInitialTypes = useSelector((state: RootState) => state.sessionReducer);

    const dispatcher = useDispatch();

    return () => {
        if (modalType === allModals.SUBJECT_MODAL) {
            STATIC_DAYS.forEach(day => {
                const findSubjectTitle = subjectsContent.find(subject => subject._id === dataID)!.title;
                const findSubjects = scheduleContent[day.eng].filter(subject => subject.title === findSubjectTitle);
                findSubjects.forEach(scheduleRemoveElement => {
                    const findDay = STATIC_DAYS.find(el => el.id === scheduleRemoveElement.day)!.eng;
                    dispatcher(DbModalOp.deleteSingleElementFromCms(
                        modalsInitialState, allModals.SCHEDULE_MODAL, scheduleRemoveElement._id, headers, findDay
                    ));
                })
            });
        }
    };

};

export default useRemoveScheduleOnChangeSubject;