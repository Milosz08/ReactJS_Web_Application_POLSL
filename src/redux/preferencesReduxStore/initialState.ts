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

import { cmsListIndicators, groupsTypes, searchInputs } from './types';

import { FOOTER_INPUTS, FOOTER_OPTIONS } from '../../helpers/structs/footerOptions.config';
import { CMS_LIST_QUANTITY_VALUES } from '../../helpers/structs/cmsSystem.config';

import GROUPS_STATIC from '../../helpers/structs/allGroups';

const { USER_NICKNAME, USER_MESSAGE, TYPEOF_MESSAGE, IF_ACCEPTED_TERMS } = FOOTER_INPUTS;
const { NORMAL, ENGLISH, SK } = groupsTypes;
const { SUBJECT_SEARCH, SCHEDULE_SEARCH, CMS_SUBJECTS_SEARCH, CMS_USER_MESSAGES } = searchInputs;
const { SUBJECTS, USER_MESSAGES } = cmsListIndicators;

export interface PreferencesInitialTypes {
    hamburgerToggle: boolean;
    footerForm: {
        [value: string]: string;
    };
    footerFormErrors: {
        [value: string]: boolean;
    };
    mobileNavActiveElement: number;
    routePathActive: boolean;
    cmsHamburgerToggle: boolean;
    searchInputs: {
        [value: string]: string;
    };
    searchInputsErrors: {
        [value: string]: boolean;
    };
    activeSubjectPanelID: number;
    chooseGroups: {
        [value: string]: string;
    }
    saveScheduleOptionModalOpen: boolean;
    clearScheduleOptionModalOpen: boolean;
    calendarMobileModalOpen: {
        toggleState: boolean,
        dateInfo: Date,
    };
    userLogoutModalOpen: boolean;
    currentActivePage: {
        activePage: number;
        maxShowingElms: number;
    };
}

export const initialState = {
    hamburgerToggle: false,
    footerForm: {
        [USER_NICKNAME]: '',
        [USER_MESSAGE]: '',
        [TYPEOF_MESSAGE]: FOOTER_OPTIONS[0].value,
        [IF_ACCEPTED_TERMS]: false,
    },
    footerFormErrors: {
        [USER_NICKNAME]: false,
        [USER_MESSAGE]: false,
        [TYPEOF_MESSAGE]: false,
        [IF_ACCEPTED_TERMS]: false,
    },
    mobileNavActiveElement: 0,
    routePathActive: false,
    cmsHamburgerToggle: false,
    searchInputs: {
        [SUBJECT_SEARCH]: '',
        [SCHEDULE_SEARCH]: '',
        [CMS_SUBJECTS_SEARCH]: '',
        [CMS_USER_MESSAGES]: '',
    },
    searchInputsErrors: {
        [SUBJECT_SEARCH]: false,
        [SCHEDULE_SEARCH]: false,
        [CMS_SUBJECTS_SEARCH]: false,
        [CMS_USER_MESSAGES]: false,
    },
    activeSubjectPanelID: 0,
    chooseGroups: {
        [NORMAL]: GROUPS_STATIC.NORMAL_GROUPS[0],
        [ENGLISH]: GROUPS_STATIC.ENG_GROUPS[0],
        [SK]: GROUPS_STATIC.SK_GROUPS[0],
    },
    saveScheduleOptionModalOpen: false,
    clearScheduleOptionModalOpen: false,
    calendarMobileModalOpen: {
        toggleState: false,
        dateInfo: new Date(),
    },
    userLogoutModalOpen: false,
    currentActivePage: {
        [SUBJECTS]: {
            activePage: 1,
            maxShowingElms: CMS_LIST_QUANTITY_VALUES[0],
        },
        [USER_MESSAGES]: {
            activePage: 1,
            maxShowingElms: CMS_LIST_QUANTITY_VALUES[0],
        },
    }
} as const;