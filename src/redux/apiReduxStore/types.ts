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
    FILTERED_SUBJECTS_LIST = 'FILTERED_SUBJECTS_LIST',
    SORT_BY_NAME = 'SORT_BY_NAME',
}

export enum updateSections {
    SUBJECTS = 'subjects',
    CALENDAR = 'calendar',
    SCHEDULE = 'schedule'
}

export enum sortAvailables {
    SUBJECTS_STA = 'subjectsContent',
    SUBJECTS_DYN = 'searchedSubjects',
}

export enum sortInputTypes {
    SUBJECT_SEARCH = 'subjectSearch',
}

export default apiTypes;