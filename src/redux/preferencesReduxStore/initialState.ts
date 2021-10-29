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

import { FOOTER_INPUTS, FOOTER_OPTIONS } from '../../helpers/structs/footerOptions.config';

const { USER_NICKNAME, USER_MESSAGE, TYPEOF_MESSAGE, IF_ACCEPTED_TERMS } = FOOTER_INPUTS;

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
        subjectSearch: '',
    },
    searchInputsErrors: {
        subjectSearch: false,
    }
} as const;