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
    GET_SINGLE_ELEMENT_FROM_DB = 'GET_SINGLE_ELEMENT_FROM_DB',
    SEND_SINGLE_FOOTERFORM_DATA = 'SEND_SINGLE_FOOTERFORM_DATA',
    SORT_BY_NAME = 'SORT_BY_NAME',
    SORT_BY_DATE = 'SORT_BY_DATE',
    FILTERED_SCHEDULE_SUBJECTS = 'FILTERED_SCHEDULE_SUBJECTS',
    UPDATE_COVID_DATA = 'UPDATE_COVID_DATA',
    UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS',
    UPDATE_ELEMENTS_DATE = 'UPDATE_ELEMENTS_DATE',
    REMOVING_CMS_CONTENT = 'REMOVING_CMS_CONTENT',
    UPDATE_FOOTERFORM_CLICKED = 'UPDATE_FOOTERFORM_CLICKED',
}

export enum updateSections {
    SUBJECTS = 'SUBJECTS',
    CALENDAR = 'CALENDAR',
    SCHEDULE = 'SCHEDULE',
    HELPERS = 'HELPERS',
    COVID = 'COVID',
    BLOG_INJECTIONS = 'BLOG_INJECTIONS',
    USER_MESS = 'USER_MESS',
    AUTH = 'AUTH',
}

export enum sortAvailables {
    SUBJECTS = 'subjectsContent',
    SCHEDULE = 'scheduleContent',
    CALENDAR = 'calendarContent',
    USER_MESSAGES = 'footerFormMessages',
    HELPERS_LINKS = 'helpersLinks',
}

export enum covidTypes {
    LEFT_TILE = 'LEFT_TILE',
    CENTER_TILE = 'CENTER_TILE',
    RIGHT_TILE = 'RIGHT_TILE'
}

export enum sortInputTypes {
    SUBJECT_SEARCH = 'subjectSearch',
    CMS_SUBJECT_SEARCH = 'cmsSubjectsSearch',
    CMS_USER_MESSAGES_SEARCH = 'cmsUserMessagesSearch',
    CMS_HELPERS_LINKS_SEARCH = 'cmsHelpersLinksSearch',
    CMS_CALENDAR_SEARCH = 'cmsCalendarSearch',
}

export enum apiReducerTypes {
    USER_MESSAGES = 'footerFormMessages',
    SUBJECTS = 'subjectsContent',
    HELPERS_LINKS = 'helpersLinks',
    CALENDAR = 'calendarContent'
}

export enum apiGetContentFromDB {
    USER_MESSAGES = 'footerFormMessages',
    SUBJECTS = 'subjectsContent',
    HELPERS = 'helpersLinks',
    CALENDAR = 'calendarContent',
    SCHEDULE = 'scheduleContent',
    COVID = 'covidWarningLevels',
    LAST_UPDATE = 'lastUpdate',
}

export default apiTypes;