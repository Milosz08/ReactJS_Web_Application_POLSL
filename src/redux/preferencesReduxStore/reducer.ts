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

import preferencesTypes from './types';
import { initialState } from './initialState';
import { arrowDirs } from '../../components/layouts/SubjectsDetails/subcomponents/NextPrevArrowNavigation';

const {
    TOGGLE_HAMBURGER, INSERT_FOOTER_INPUTS, ERRORS_FOOTER_INPUTS, MOBILE_NAV_SET_ELM, ROUTE_PATH_TOGGLE,
    TOGGLE_CMS_HAMBURGER, INSERT_SEARCH_INPUT, ERRORS_SEARCH_INPUTS, CHANGE_ACTIVE_PANEL, PREV_NEXT_ACTIVE_PANEL,
    CHANGE_CHOOSE_SCHEDULE_GROUP, TOGGLE_SCHEDULE_MODAL, TOGGLE_SCHEDULE_CLEAR_MODAL, TOGGLE_CALENDAR_MOBILE_MODAL,
    TOGGLE_USER_LOGOUT_MODAL
} = preferencesTypes;

const preferencesReducer = (state = initialState, action: any) => {
    switch(action.type) {

        case TOGGLE_HAMBURGER: {
            return { ...state, hamburgerToggle: !state.hamburgerToggle };
        }

        case INSERT_FOOTER_INPUTS: {
            const { inputType, value } = action.payload;
            return { ...state, footerForm: { ...state.footerForm, [inputType]: value } };
        }

        case ERRORS_FOOTER_INPUTS: {
            const { inputType, error } = action.payload;
            return { ...state, footerFormErrors: { ...state.footerFormErrors, [inputType]: error } };
        }

        case MOBILE_NAV_SET_ELM: {
            const { activeElement, maxElms } = action.payload;
            if(activeElement > maxElms) {
                return state;
            }
            return { ...state, mobileNavActiveElement: activeElement };
        }

        case ROUTE_PATH_TOGGLE: {
            const { toggleState } = action.payload;
            return { ...state, routePathActive: toggleState };
        }

        case TOGGLE_CMS_HAMBURGER: {
            return { ...state, cmsHamburgerToggle: !state.cmsHamburgerToggle };
        }

        case INSERT_SEARCH_INPUT: {
            const { inputType, value } = action.payload;
            return { ...state, searchInputs: { ...state.searchInputs, [inputType]: value } };
        }

        case ERRORS_SEARCH_INPUTS: {
            const { inputType, error } = action.payload;
            return { ...state, searchInputsErrors: { ...state.searchInputsErrors, [inputType]: error } };
        }

        case CHANGE_ACTIVE_PANEL: {
            const { dbID } = action.payload;
            return { ...state, activeSubjectPanelID: dbID };
        }

        case PREV_NEXT_ACTIVE_PANEL: {
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

        case CHANGE_CHOOSE_SCHEDULE_GROUP: {
            const { type, group } = action.payload;
            return { ...state, chooseGroups: { ...state.chooseGroups, [type]: group.toLocaleLowerCase() } };
        }

        case TOGGLE_SCHEDULE_MODAL: {
            const { toggleState } = action.payload;
            return { ...state, saveScheduleOptionModalOpen: toggleState };
        }

        case TOGGLE_SCHEDULE_CLEAR_MODAL: {
            const { toggleState } = action.payload;
            return { ...state, clearScheduleOptionModalOpen: toggleState };
        }

        case TOGGLE_CALENDAR_MOBILE_MODAL: {
            const { toggleState, dateInfo } = action.payload;
            return { ...state, calendarMobileModalOpen: { toggleState, dateInfo } };
        }

        case TOGGLE_USER_LOGOUT_MODAL: {
            const { toggleState } = action.payload;
            return { ...state, userLogoutModalOpen: toggleState };
        }

        default: {
            return state;
        }
    }
};

export default preferencesReducer;