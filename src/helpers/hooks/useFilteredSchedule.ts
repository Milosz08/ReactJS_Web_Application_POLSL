/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import { useEffect, useState } from 'react';
import { ALL_GROUPS } from '../structs/schedule.config';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { ScheduleContentTypes } from '../../redux/apiReduxStore/dataTypes';

import { ApiInitialTypes } from '../../redux/apiReduxStore/initialState';
import { PreferencesInitialTypes } from '../../redux/preferencesReduxStore/initialState';

/**
 * Custom hook responsible for filtered schedule content based on weekday.
 *
 * @param weekDay { string } - weekday (ex. monday...).
 */
const useFilteredSchedule = (weekDay: string): ScheduleContentTypes[] => {

    const { scheduleContent }: ApiInitialTypes = useSelector((state: RootState) => state.apiReducer);
    const { chooseGroups }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);

    const singleDayOfWeek = scheduleContent[weekDay];
    const { normalGroup, engGroup, skGroup } = chooseGroups;

    const [ filteredArray, setFilteredArray ] = useState<ScheduleContentTypes[]>(singleDayOfWeek);

    useEffect(() => {
        setFilteredArray(
            // eslint-disable-next-line array-callback-return
            singleDayOfWeek
                .filter(prop => {
                    if (prop.group.includes(',')) {
                        const [ sk, normal ] = prop.group.split(',');
                        return sk === skGroup && normal === normalGroup;
                    } else {
                        return prop.group === engGroup || prop.group === normalGroup || prop.group === ALL_GROUPS
                    }
                })
                .sort((prevH: ScheduleContentTypes, secH: ScheduleContentTypes): number => (
                    parseInt(prevH.subjectHours.start.replace(':', '')) - parseInt(secH.subjectHours.start.replace(':', ''))
                ))
        );
    }, [ chooseGroups, engGroup, normalGroup, singleDayOfWeek, skGroup ]);

    return filteredArray;
};

export default useFilteredSchedule;