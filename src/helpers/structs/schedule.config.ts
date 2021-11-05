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

export interface StaticDaysTypes {
    id: number;
    name: string;
    eng: string;
}

/**
 * Static array of strings representing the consecutive days of the week.
 */
export const STATIC_DAYS: StaticDaysTypes[] = [
    {
        id: 0,
        name: 'poniedziałek',
        eng: 'monday'
    },
    {
        id: 1,
        name: 'wtorek',
        eng: 'tuesday'
    },
    {
        id: 2,
        name: 'środa',
        eng: 'wednesday'
    },
    {
        id: 3,
        name: 'czwartek',
        eng: 'thursday'
    },
    {
        id: 4,
        name: 'piątek',
        eng: 'friday'
    }
];

export const ALL_GROUPS: string = 'wszyscy';