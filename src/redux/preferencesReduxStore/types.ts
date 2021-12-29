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
    CHANGE_ROOT_PREF_FIELD = 'CHANGE_ROOT_PREF_FIELD',
    CHANGE_SECOND_ROOT_PREF_FIELD = 'CHANGE_SECOND_ROOT_PREF_FIELD',
    MOBILE_NAV_SET_ELM = 'MOBILE_NAV_SET_ELM',
    PREV_NEXT_ACTIVE_PANEL = 'PREV_NEXT_ACTIVE_PANEL',
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
    CMS_SCHEDULE = 'cmsScheduleSearch'
}

export enum prefFields {
    SCHEDULE_SECTION = 'currentOpenScheduleSection',
    HAMBURGER_TOGGLE = 'hamburgerToggle',
    FOOTER_FORM = 'footerForm',
    FOOTER_FORM_ERRORS = 'footerFormErrors',
    ROUTE_PATH = 'routePathActive',
    CMS_HAMBURGER_TOGGLE = 'cmsHamburgerToggle',
    SEARCH_INPUTS = 'searchInputs',
    SEARCH_INPUTS_ERRORS = 'searchInputsErrors',
    ACTIVE_SUB_PANEL = 'activeSubjectPanelID',
    CHOOSE_GROUP = 'chooseGroups',
    SCHEDULE_SAVE_MODAL = 'saveScheduleOptionModalOpen',
    SCHEDULE_CLEAR_MODAL = 'clearScheduleOptionModalOpen',
    CALENDAR_MODAL = 'calendarMobileModalOpen',
    USER_LOGOUT_MODAL = 'userLogoutModalOpen',
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
    SCHEDULE = 'scheduleContent',
}

export enum sortingTypes {
    INCREASE = 'INCREASE',
    DECREASE = 'DECREASE',
}

export default preferencesTypes;