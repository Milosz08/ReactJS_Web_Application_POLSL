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

enum apiTypes {
    GET_SINGLE_FOOTERFORM_DATA = 'GET_ALL_FOOTERFORM_DATA',
    SEND_SINGLE_FOOTERFORM_DATA = 'SEND_SINGLE_FOOTERFORM_DATA',
    GET_SINGLE_COVID_DATA = 'GET_ALL_COVID_DATA',
    GET_SINGLE_LAST_UPDATE = 'GET_ALL_LAST_UPDATE',
    UPDATE_SINGLE_LAST_UPDATE = 'UPDATE_SINGLE_LAST_UPDATE',
    GET_SINGLE_SUBJECT_DATA = 'GET_SINGLE_SUBJECT_DATA',
    GET_SINGLE_SCHEDULE_SUBJECT = 'GET_SINGLE_SCHEDULE_SUBJECT',
    GET_SINGLE_CALENDAR_RECORD = 'GET_SINGLE_CALENDAR_RECORD',
    GET_SINGLE_HELPERS_LINKS = 'GET_SINGLE_HELPERS_LINKS',
    SORT_BY_NAME = 'SORT_BY_NAME',
    SORT_BY_DATE = 'SORT_BY_DATE',
    FILTERED_SCHEDULE_SUBJECTS = 'FILTERED_SCHEDULE_SUBJECTS',
    UPDATE_COVID_DATA = 'UPDATE_COVID_DATA',
}

export enum updateSections {
    SUBJECTS = 'SUBJECTS',
    CALENDAR = 'CALENDAR',
    SCHEDULE = 'SCHEDULE'
}

export enum sortAvailables {
    SUBJECTS = 'subjectsContent',
    SCHEDULE = 'scheduleContent',
    CALENDAR = 'calendarContent',
}

export enum covidTypes {
    LEFT_TILE = 'LEFT_TILE',
    CENTER_TILE = 'CENTER_TILE',
    RIGHT_TILE = 'RIGHT_TILE'
}

export enum sortInputTypes {
    SUBJECT_SEARCH = 'subjectSearch',
}

export default apiTypes;