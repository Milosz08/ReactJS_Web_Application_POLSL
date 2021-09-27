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

import axiosInstance from '../helpers/request';

/**
 * Interface that defines the date types in the object.
 */
interface DateObjectTypes {
    updateDateFor: string;
    scheduleBreak?: boolean;
    updateDate: {
        [value: string]: number;
    }
}

/**
 * @details Async function that updates the date in the database of each section (when called, the given section ID and its name).
 *
 * @param updateFor { string } - name of the section to update.
 * @param updateID { string | undefined } - section id number to update.
 * @param ifSchedule? { boolean } - (only for schedule) decides how the component is to behave in the case of a schedule.
 * @param schedule? { boolean } - (only for schedule) selection, whether the plan should be visible whether to be hidden.
 */
const updateDate = async (
    updateFor: string, updateID: string | undefined, ifSchedule: boolean = false, schedule: boolean = false
): Promise<void> => {
    const date = new Date();
    let dateObject: DateObjectTypes;
    if (ifSchedule) {
        dateObject = {
            updateDateFor: updateFor,
            scheduleBreak: schedule,
            updateDate: {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                hour: date.getHours(),
                minutes: date.getMinutes(),
                seconds: date.getSeconds(),
            },
        };
    } else {
        dateObject = {
            updateDateFor: updateFor,
            updateDate: {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                hour: date.getHours(),
                minutes: date.getMinutes(),
                seconds: date.getSeconds(),
            },
        };
    }

    await axiosInstance.put(`last-update/${updateID}`, dateObject);
}

export default updateDate;