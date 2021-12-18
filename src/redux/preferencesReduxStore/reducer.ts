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

import preferencesTypes, { sortingTypes } from './types';
import { PrefInitialState } from './initialState';

import { arrowDirs } from '../../components/layouts/SubjectsDetails/subcomponents/NextPrevArrowNavigation';
import { directions } from '../../components/layouts/UniversalListNavigate/subcomponents/UniversalListNavigatePrevNextButton';

/**
 * The reducer function responsible for managing state for the ReduxPreferences tree.
 *
 * @param state { apiInitialState } - ReduxPreferences tree state.
 * @param action { any } - object stored action: type and payload.
 */
const preferencesReducer = (state = PrefInitialState, action: any) => {
    switch(action.type) {

        case preferencesTypes.TOGGLE_HAMBURGER: {
            return { ...state, hamburgerToggle: !state.hamburgerToggle };
        }

        case preferencesTypes.INSERT_FOOTER_INPUTS: {
            const { inputType, value } = action.payload;
            return { ...state, footerForm: { ...state.footerForm, [inputType]: value } };
        }

        case preferencesTypes.ERRORS_FOOTER_INPUTS: {
            const { inputType, error } = action.payload;
            return { ...state, footerFormErrors: { ...state.footerFormErrors, [inputType]: error } };
        }

        case preferencesTypes.MOBILE_NAV_SET_ELM: {
            const { activeElement, maxElms } = action.payload;
            if(activeElement > maxElms) {
                return state;
            }
            return { ...state, mobileNavActiveElement: activeElement };
        }

        case preferencesTypes.ROUTE_PATH_TOGGLE: {
            const { toggleState } = action.payload;
            return { ...state, routePathActive: toggleState };
        }

        case preferencesTypes.TOGGLE_CMS_HAMBURGER: {
            return { ...state, cmsHamburgerToggle: !state.cmsHamburgerToggle };
        }

        case preferencesTypes.INSERT_SEARCH_INPUT: {
            const { inputType, value } = action.payload;
            return { ...state, searchInputs: { ...state.searchInputs, [inputType]: value } };
        }

        case preferencesTypes.ERRORS_SEARCH_INPUTS: {
            const { inputType, error } = action.payload;
            return { ...state, searchInputsErrors: { ...state.searchInputsErrors, [inputType]: error } };
        }

        case preferencesTypes.CHANGE_ACTIVE_PANEL: {
            const { dbID } = action.payload;
            return { ...state, activeSubjectPanelID: dbID };
        }

        case preferencesTypes.PREV_NEXT_ACTIVE_PANEL: {
            const { dir, length } = action.payload;
            let activeID: number = state.activeSubjectPanelID;
            switch(dir) {
                case arrowDirs.PREV: {
                    if(state.activeSubjectPanelID === 0) { activeID = length - 1; }
                        else { activeID--; }
                    break;
                }
                case arrowDirs.NEXT: {
                    if(state.activeSubjectPanelID === length - 1) { activeID = 0; }
                        else { activeID++; }
                    break;
                }
            }
            return { ...state, activeSubjectPanelID: activeID };
        }

        case preferencesTypes.CHANGE_CHOOSE_SCHEDULE_GROUP: {
            const { type, group } = action.payload;
            return { ...state, chooseGroups: { ...state.chooseGroups, [type]: group.toLocaleLowerCase() } };
        }

        case preferencesTypes.TOGGLE_SCHEDULE_MODAL: {
            const { toggleState } = action.payload;
            return { ...state, saveScheduleOptionModalOpen: toggleState };
        }

        case preferencesTypes.TOGGLE_SCHEDULE_CLEAR_MODAL: {
            const { toggleState } = action.payload;
            return { ...state, clearScheduleOptionModalOpen: toggleState };
        }

        case preferencesTypes.TOGGLE_CALENDAR_MOBILE_MODAL: {
            const { toggleState, dateInfo } = action.payload;
            return { ...state, calendarMobileModalOpen: { toggleState, dateInfo } };
        }

        case preferencesTypes.TOGGLE_USER_LOGOUT_MODAL: {
            const { toggleState } = action.payload;
            return { ...state, userLogoutModalOpen: toggleState };
        }

        case preferencesTypes.CHANGE_CMS_LIST_PAGE_NUMBER: {
            const { page, type, maxPage, dir } = action.payload;
            let increment: number = state.currentActivePage[type].activePage;
            if(page !== maxPage && dir === Number(directions.NEXT)) {
                ++increment;
            } else if(page !== 1 && dir === Number(directions.PREV)) {
                --increment;
            } else if(dir === null) {
                increment = page;
            }
            return { ...state, currentActivePage: {
                ...state.currentActivePage, [type]: { ...state.currentActivePage[type], activePage: increment
            }}};
        }

        case preferencesTypes.CHANGE_MAX_SHOWING_CMS_LIST_ELMS: {
            const { type, maxShowingElms } = action.payload;
            return { ...state, currentActivePage: {
                ...state.currentActivePage, [type]: { ...state.currentActivePage[type], maxShowingElms
            }}};
        }

        case preferencesTypes.CHANGE_CMS_LIST_SORTING_TYPE: {
            const { type } = action.payload;
            const { DECREASE, INCREASE } = sortingTypes;
            const sortingMode = state.currentActivePage[type].sortingMode === DECREASE ? INCREASE : DECREASE;
            return { ...state, currentActivePage: {
                ...state.currentActivePage, [type]: { ...state.currentActivePage[type], sortingMode
            }}};
        }

        default: {
            return state;
        }
    }
};

export default preferencesReducer;