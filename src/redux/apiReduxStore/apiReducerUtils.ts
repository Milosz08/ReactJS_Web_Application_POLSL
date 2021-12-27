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

import { CurrentScheduleContentTypes, ScheduleContentTypes, ScheduleContentTypes as Sched } from './dataTypes';
import { ScheduleSubjectDays, ScheduleSubjectDays as Days } from './initialState';

/**
 * Utils class contains static methods used in api reducer function.
 */
class ApiReducerUtils {

    /**
     * Method responsible for inserting subjects from separate small arrays (based days of week)
     * into global single array.
     *
     * @param stateScheduleContent { Days } - redux state.
     * @param subject { Sched } - single subject object.
     */
    public static subjectsInSeparateArrays(stateScheduleContent: Days, subject: Sched): Days {
        Object.keys(stateScheduleContent).forEach((key: string, idx: number) => {
            if (idx === subject.day) {
                stateScheduleContent[key].push(subject);
                return;
            }
        });
        return stateScheduleContent;
    };

    /**
     * Method responsible for inserting subjects from global array into separate small
     * arrays based days of week.
     *
     * @param scheduleContent { ScheduleSubjectDays } - redux state.
     * @param normal { string } - normal group.
     * @param eng { string } - english group.
     * @param sk { string } - sk group.
     */
    public static moveSheduleSubjectsIntoSeparateDays(
        scheduleContent: ScheduleSubjectDays, normal: string, eng: string, sk: string
    ): { [value: string]: CurrentScheduleContentTypes[]; } {
        const normalAndSkGroup = `${sk},${normal}`;
        let middlewareObject: { [value: string]: CurrentScheduleContentTypes[] } = {
            monday: [], tuesday: [], wednesday: [], thursday: [], friday: []
        };
        Object.keys(scheduleContent).forEach(day => {
            const middlewareArray: ScheduleContentTypes[] = scheduleContent[day].filter((el: ScheduleContentTypes) => (
                el.group === normalAndSkGroup || el.group === normal || el.group === eng || el.group === 'wszyscy'
            ));
            middlewareArray.forEach(el => {
                const { title, room, classesInfo, icon, startHour, endHour } = el;
                const [ hourStart, minuteStart ] = el.startHour.split(':');
                const [ hourEnd, minuteEnd ] = el.endHour.split(':');
                middlewareObject[day].push({
                    title, room, classesInfo, icon,
                    hours: {
                        start: Number(hourStart + minuteStart + '00'),
                        end: Number(hourEnd + minuteEnd + '00'),
                        startHour, endHour,
                    }
                });
            });
            middlewareObject[day].sort((a: any, b: any) => a.hours.start - b.hours.end);
        });
        return middlewareObject;
    };

}

export default ApiReducerUtils;