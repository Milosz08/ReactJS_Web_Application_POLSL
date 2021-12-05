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

enum preferencesTypes {
    TOGGLE_HAMBURGER = 'TOGGLE_HAMBURGER',
    INSERT_FOOTER_INPUTS = 'INSERT_FOOTER_INPUTS',
    ERRORS_FOOTER_INPUTS = 'ERRORS_FOOTER_INPUTS',
    MOBILE_NAV_SET_ELM = 'MOBILE_NAV_SET_ELM',
    ROUTE_PATH_TOGGLE = 'ROUTE_PATH_TOGGLE',
    TOGGLE_CMS_HAMBURGER = 'TOGGLE_CMS_HAMBURGER',
    INSERT_SEARCH_INPUT = 'INSERT_SEARCH_INPUT',
    ERRORS_SEARCH_INPUTS = 'ERRORS_SEARCH_INPUTS',
    CHANGE_ACTIVE_PANEL = 'CHANGE_ACTIVE_PANEL',
    PREV_NEXT_ACTIVE_PANEL = 'PREV_NEXT_ACTIVE_PANEL',
    CHANGE_CHOOSE_SCHEDULE_GROUP = 'CHANGE_CHOOSE_SCHEDULE_GROUP',
    TOGGLE_SCHEDULE_MODAL = 'TOGGLE_SCHEDULE_MODAL',
    TOGGLE_SCHEDULE_CLEAR_MODAL = 'TOGGLE_SCHEDULE_CLEAR_MODAL',
    TOGGLE_CALENDAR_MOBILE_MODAL = 'TOGGLE_CALENDAR_MOBILE_MODAL',
    TOGGLE_USER_LOGOUT_MODAL = 'TOGGLE_USER_LOGOUT_MODAL',
    CHANGE_CMS_LIST_PAGE_NUMBER = 'CHANGE_CMS_LIST_PAGE_NUMBER',
    CHANGE_MAX_SHOWING_CMS_LIST_ELMS = 'CHANGE_MAX_SHOWING_CMS_LIST_ELMS',
    CHANGE_CMS_LIST_SORTING_TYPE = 'CHANGE_CMS_LIST_SORTING_TYPE',
}

export enum searchInputs {
    SUBJECT_SEARCH = 'subjectSearch',
    SCHEDULE_SEARCH = 'scheduleSearch',
    CMS_SUBJECTS_SEARCH = 'cmsSubjectsSearch',
    CMS_USER_MESSAGES = 'cmsUserMessagesSearch',
    CMS_HELPERS_LINKS = 'cmsHelpersLinksSearch',
    CMS_CALENDAR = 'cmsCalendarSearch',
}

export enum groupsTypes {
    NORMAL = 'normalGroup',
    ENGLISH = 'engGroup',
    SK = 'skGroup'
}

export enum cmsListIndicators {
    SUBJECTS = 'subjectsContent',
    USER_MESSAGES = 'footerFormMessages',
    HELPERS_LINKS = 'helpersLinks',
    CALENDAR = 'calendarContent',
}

export enum sortingTypes {
    INCREASE = 'INCREASE',
    DECREASE = 'DECREASE',
}

export default preferencesTypes;