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

export const CALENDAR_LEVELS = [
    {
        name: 'niski',
        color: 'green',
        colorPolish: 'zielony'
    },
    {
        name: 'średni',
        color: 'orange',
        colorPolish: 'żółty'
    },
    {
        name: 'wyskoki',
        color: 'red',
        colorPolish: 'czerwony'
    },
];

/**
 * Constant that defines the maximum width of the browser window in which it is possible to
 * open the modal with activities (in px).
 */
export const MAX_WIDTH_CLICK_ACTION: number = 970;

export enum LEVELS {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}