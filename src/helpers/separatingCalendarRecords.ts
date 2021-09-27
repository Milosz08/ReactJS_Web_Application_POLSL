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

export interface ObjectProvider {
    _id: string,
    date: string,
    important: string,
    message: string,
}

/**
 * @details This function takes an array of objects (calendar entries) as a parameter and uses it to generate
 *          a new array of objects, this time separating all activities (including those on the same day).
 *
 * @param calendarRecords { object[] } - all calendar activities pulled from api in react component.
 *
 * @return { ObjectProvider[] } - inverted result array with all calendar entries separated
 */
const separatingCalendarRecords = (calendarRecords: ObjectProvider) => {
    let endingArray: ObjectProvider[] = [];

    // @ts-ignore
    for (const record of calendarRecords) {

        const day = record.day < 10 ? `0${record.day}` : record.day;
        const month = record.month + 1 < 10 ? `0${record.month + 1}` : record.month + 1;

        if (record.items.length > 1) { //If in same day is 2n activities
            for (const item of record.items) {
                endingArray.push({
                    _id: record._id,
                    date: `${record.year}-${month}-${day}T${item.start}`,
                    important: item.importantLevel,
                    message: item.message
                });
            }
        } else { //If in same day is one activity
            endingArray.push({
                _id: record._id,
                date: `${record.year}-${month}-${day}T${record.items[0].start}`,
                important: record.items[0].importantLevel,
                message: record.items[0].message
            });
        }
    }

    return endingArray.reverse();
}

export default separatingCalendarRecords;