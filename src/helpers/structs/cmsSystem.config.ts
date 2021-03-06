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

/**
 * All rangs usage in CMS panel header indicator.
 */
export const RANGS_NAMES: string[] = [
    'Niezdefiniowany', 'Użytkownik', 'Moderator', 'Administrator'
];

/**
 * Maximal risk number possibily insert into covid warnings blocks select field.
 */
export const MAX_RISK_NUMBER: number = 21;

/**
 * Max elements in single page.
 */
export const CMS_LIST_QUANTITY_VALUES: number[] = [
   5, 10, 15, 20, 25, 50
];

/**
 * All semesters.
 */
export const SUBJECTS_SEMESTERS: string[] = [
    'pierwszy', 'drugi', 'trzeci', 'czwarty', 'piąty', 'szósty', 'siódmy'
];

/**
 * Classes types and plaform used, when user add new subject in subject modal.
 */
export const CLASSES_OPTIONS: { TYPES: string[], PLATFORMS: string[] } = {
    TYPES: [
        'wykłady', 'ćwiczenia', 'laboratoria', 'konwersatoria', 'seminaria', 'warsztaty', 'repetytoria', 'wszystkie zajęcia'
    ],
    PLATFORMS: [
        'microsoft teams', 'google classroom', 'hangouts meet', 'zoom', 'skype', 'slack', 'facebook', 'whatsapp',
        'big blue button', 'cisco webed teams', 'kontaktowy'
    ]
}