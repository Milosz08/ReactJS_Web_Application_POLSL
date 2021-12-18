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

import preferencesTypes, { cmsListIndicators, groupsTypes, searchInputs } from './types';

import { arrowDirs } from '../../components/layouts/SubjectsDetails/subcomponents/NextPrevArrowNavigation';
import { directions } from '../../components/layouts/UniversalListNavigate/subcomponents/UniversalListNavigatePrevNextButton';

export interface ReturnedToReducer {
    type: preferencesTypes;
    payload?: any;
}

export const toggleHamburger = (): ReturnedToReducer => ({
    type: preferencesTypes.TOGGLE_HAMBURGER
});

export const insertInFooterInputs = (inputType: string, value: string | boolean): ReturnedToReducer => ({
    type: preferencesTypes.INSERT_FOOTER_INPUTS,
    payload: {
        inputType, value
    }
});

export const setErrorsFooterInputs = (inputType: string, error: boolean): ReturnedToReducer => ({
    type: preferencesTypes.ERRORS_FOOTER_INPUTS,
    payload: {
        inputType, error
    }
});

export const setMobileNavActiveElm = (activeElement: number, maxElms: number): ReturnedToReducer => ({
    type: preferencesTypes.MOBILE_NAV_SET_ELM,
    payload: {
        activeElement, maxElms
    }
});

export const changeRoutePath = (toggleState: boolean): ReturnedToReducer => ({
    type: preferencesTypes.ROUTE_PATH_TOGGLE,
    payload: {
        toggleState,
    }
});

export const toggleCmsHamburger = (): ReturnedToReducer => ({
    type: preferencesTypes.TOGGLE_CMS_HAMBURGER
});

export const insertInSearchInput = (inputType: searchInputs, value: string): ReturnedToReducer => ({
    type: preferencesTypes.INSERT_SEARCH_INPUT,
    payload: {
        inputType, value
    }
});

export const setErrorsSearchInputs = (inputType: searchInputs, error: boolean): ReturnedToReducer => ({
    type: preferencesTypes.ERRORS_SEARCH_INPUTS,
    payload: {
        inputType, error
    }
});

export const setSubjectActivePanel = (dbID: number): ReturnedToReducer => ({
    type: preferencesTypes.CHANGE_ACTIVE_PANEL,
    payload: {
        dbID
    }
});

export const prevNextSubjectActivePanel = (dir: arrowDirs, length: number):ReturnedToReducer => ({
    type: preferencesTypes.PREV_NEXT_ACTIVE_PANEL,
    payload: {
        dir, length
    }
});

export const setSelectedGroup = (type: groupsTypes, group: string): ReturnedToReducer => ({
    type: preferencesTypes.CHANGE_CHOOSE_SCHEDULE_GROUP,
    payload: {
        type, group
    }
});

export const toggleSaveScheduleModal = (toggleState: boolean): ReturnedToReducer => ({
    type: preferencesTypes.TOGGLE_SCHEDULE_MODAL,
    payload: {
        toggleState
    }
});

export const toggleClearScheduleModal = (toggleState: boolean): ReturnedToReducer => ({
    type: preferencesTypes.TOGGLE_SCHEDULE_CLEAR_MODAL,
    payload: {
        toggleState
    }
});

export const toggleCalendarMobileModal = (toggleState: boolean, dateInfo: Date): ReturnedToReducer => ({
    type: preferencesTypes.TOGGLE_CALENDAR_MOBILE_MODAL,
    payload: {
        toggleState, dateInfo
    }
});

export const toggleUserLogoutModal = (toggleState: boolean): ReturnedToReducer => ({
    type: preferencesTypes.TOGGLE_USER_LOGOUT_MODAL,
    payload: {
        toggleState
    }
});

export const changeCmsListPageNumber = (
    type: cmsListIndicators, page: number, maxPage: number, dir: directions | null = null
): ReturnedToReducer => ({
    type: preferencesTypes.CHANGE_CMS_LIST_PAGE_NUMBER,
    payload: {
        page, type, maxPage, dir
    }
});

export const changeCmsListShowingElementsCount = (type: cmsListIndicators, maxShowingElms: number): ReturnedToReducer => ({
    type: preferencesTypes.CHANGE_MAX_SHOWING_CMS_LIST_ELMS,
    payload: {
        type, maxShowingElms
    }
});

export const changeUniversalListSortingType = (type: cmsListIndicators): ReturnedToReducer => ({
    type: preferencesTypes.CHANGE_CMS_LIST_SORTING_TYPE,
    payload: {
        type
    }
});