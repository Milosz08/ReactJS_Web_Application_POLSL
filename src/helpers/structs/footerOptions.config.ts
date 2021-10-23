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

export const FOOTER_OPTIONS: { [name: string]: string }[] = [
    {
        name: 'Kliknij, aby wybrać opcję',
        value: 'optionDisabled',
    },
    {
        name: 'Błąd na stronie',
        value: 'pageError',
    },
    {
        name: 'Modyfikacja Planu Zajęć',
        value: 'sheduleModify',
    },
    {
        name: 'Modyfikacja/dodanie ważnego terminu',
        value: 'calendarNewDate',
    },
    {
        name: 'Inny, niewymieniony wyżej',
        value: 'default',
    },
];

export enum FOOTER_TEXTAREA_PROPS {
    MIN_LENGTH_TEXTAREA = 10,
    MAX_LENGTH_TEXTAREA = 300,
    TEXTAREA_ROWS = 7
}

export const FOOTER_INPUTS = {
    USER_NICKNAME: 'userNickname',
    TYPEOF_MESSAGE: 'typeOfMessage',
    USER_MESSAGE: 'userMessage',
    IF_ACCEPTED_TERMS: 'ifAcceptedTerms'
} as const;