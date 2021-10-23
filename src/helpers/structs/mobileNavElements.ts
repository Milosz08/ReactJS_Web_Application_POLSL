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

import { FRONT_ENDPOINTS } from './appEndpoints';

const { ABSOLUTE, SCHEDULE, CALENDAR, TERMS, HELPS } = FRONT_ENDPOINTS;

export interface MobileNavElmsProvider {
    path: FRONT_ENDPOINTS;
    iconFamilySufix: string,
}

const MOBILE_NAV_ELMS: MobileNavElmsProvider[] = [
    {
        path: ABSOLUTE,
        iconFamilySufix: 'Home',
    },
    {
        path: SCHEDULE,
        iconFamilySufix: 'Schedule',
    },
    {
        path: CALENDAR,
        iconFamilySufix: 'Calendar',
    },
    {
        path: TERMS,
        iconFamilySufix: 'CreditCard',
    },
    {
        path: HELPS,
        iconFamilySufix: 'Bulb',
    }
];

export default MOBILE_NAV_ELMS;