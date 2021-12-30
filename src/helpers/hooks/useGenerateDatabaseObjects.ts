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

import { AES } from 'crypto-js';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { allModals } from '../../redux/modalsReduxStore/types';
import { ModalsInitialTypes } from '../../redux/modalsReduxStore/initialState';
import { PreferencesInitialTypes } from '../../redux/preferencesReduxStore/initialState';

/**
 * Custom hook responsible for generating an object to communicate with the database
 * API based on the passed parameter.
 *
 * @param modalType { allModals } - type of object to be generated
 */
const useGenerateDatabaseObjects = (modalType: allModals) => {

    const modalsInitialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const { currentOpenScheduleSection }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const fields = modalsInitialState[modalType].modalInputFields!;
    const hashKey: string = process.env.REACT_APP_HASH_CODE || '';

    return () => {
        switch (modalType) {
            case allModals.HELPERS_LINKS_MODAL:
                return {
                    helperTitle: fields.title,
                    helperLink: AES.encrypt(fields.link, hashKey).toString(),
                    helperIcon: {
                        family: 'FontAwesomeIcons', name: fields.icon
                    }
                };
            case allModals.CALENDAR_MODAL:
                const [ year, month, day ] = fields.date.split('-');
                return {
                    day: Number(day),
                    month: Number(month),
                    year: Number(year),
                    items: fields.items
                };
            case allModals.SUBJECT_MODAL:
                return {
                    title: fields.title,
                    ifEnd: fields.ifEnd,
                    icon: {
                        family: 'FontAwesomeIcons', name: fields.icon
                    },
                    semesters: fields.semesters,
                    departments: fields.departments,
                    classesPlatforms: fields.classesPlatforms
                };
            case allModals.SCHEDULE_MODAL:
                return {
                    title: fields.title,
                    day: currentOpenScheduleSection,
                    group: fields.group,
                    startHour: fields.startHour,
                    endHour: fields.endHour,
                    room: fields.room,
                    type: fields.type
                };
            default:
                return {};
        }
    };

};

export default useGenerateDatabaseObjects;