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

import preferencesTypes, { cmsListIndicators, prefFields } from './types';

import { arrowDirs } from '../../components/layouts/SubjectsDetails/subcomponents/NextPrevArrowNavigation';
import { directions } from '../../components/layouts/UniversalListNavigate/subcomponents/UniversalListNavigatePrevNextButton';

export interface ReturnedToReducer {
    type: preferencesTypes;
    payload?: any;
}

/**
 * Static class that stores methods responsible for basic handling of app preferences.
 */
export class PrefActions {

    /**
     * Method responsible for changing the state properties at the first level.
     *
     * @param field { prefFields } - type of field to change (1st level).
     * @param value { any } - primitive or object type to change state.
     */
    public static changeRootPrefField = (field: prefFields, value: any): ReturnedToReducer => ({
        type: preferencesTypes.CHANGE_ROOT_PREF_FIELD,
        payload: {
            field, value
        }
    });

    /**
     * Method responsible for changing state properties at the first and second level.
     *
     * @param fieldObject { prefFields } - type of field to change (1st level).
     * @param field { prefFields } - type of field to change (2nd level).
     * @param value { any } - primitive or object type to change state.
     */
    public static changeSecondRootPrefField = (
        fieldObject: prefFields, field: prefFields | string, value: any
    ): ReturnedToReducer => ({
        type: preferencesTypes.CHANGE_SECOND_ROOT_PREF_FIELD,
        payload: {
            fieldObject, field, value
        }
    });

    /**
     * Method responsible for changing the active element in the navigation bar (only on small devices).
     *
     * @param activeElement { number } - element indicator to change into active in state.
     * @param maxElms { number } - max elements.
     */
    public static setMobileNavActiveElm = (activeElement: number, maxElms: number): ReturnedToReducer => ({
        type: preferencesTypes.MOBILE_NAV_SET_ELM,
        payload: {
            activeElement, maxElms
        }
    });

    /**
     * Method responsible for changing the state of the active item tile. If the last one is selected,
     * the next in order is the first element of the array.
     *
     * @param dir { arrowDirs } - direction (left/right).
     * @param length { number } - count of subjects.
     */
    public static prevNextSubjectActivePanel = (dir: arrowDirs, length: number):ReturnedToReducer => ({
        type: preferencesTypes.PREV_NEXT_ACTIVE_PANEL,
        payload: {
            dir, length
        }
    });

    /**
     * Method responsible for changing the page in the navigation of a specific item list (based on a parameter).
     *
     * @param type { cmsListIndicators } - selected CMS panel list navigation.
     * @param page { number } - page number.
     * @param maxPage { number } - max pages in number.
     * @param dir { directions | null } - direction.
     */
    public static changeCmsListPageNumber = (
        type: cmsListIndicators, page: number, maxPage: number, dir: directions | null = null
    ): ReturnedToReducer => ({
        type: preferencesTypes.CHANGE_CMS_LIST_PAGE_NUMBER,
        payload: {
            page, type, maxPage, dir
        }
    });

    /**
     * Method responsible for changing the page in the navigation of a specific item list (based on a parameter).
     *
     * @param type { cmsListIndicators } - selected CMS panel list navigation.
     * @param maxShowingElms { number } - max of showing nagivation elements.
     */
    public static changeCmsListShowingElementsCount = (type: cmsListIndicators, maxShowingElms: number): ReturnedToReducer => ({
        type: preferencesTypes.CHANGE_MAX_SHOWING_CMS_LIST_ELMS,
        payload: {
            type, maxShowingElms
        }
    });

    /**
     * Method responsible for changing the sorting mode of the items in the list.
     *
     * @param type { cmsListIndicators } - selected CMS panel list navigation.
     */
    public static changeUniversalListSortingType = (type: cmsListIndicators): ReturnedToReducer => ({
        type: preferencesTypes.CHANGE_CMS_LIST_SORTING_TYPE,
        payload: {
            type
        }
    });

}