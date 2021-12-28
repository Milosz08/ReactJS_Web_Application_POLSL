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

import moment from 'moment';

import { allModals } from './types';
import { LEVELS } from '../../helpers/structs/calendar.config';

const { HELPERS_LINKS_MODAL, CALENDAR_MODAL, SUBJECT_MODAL } = allModals;

/**
 * Object that stores all initial states for modals inputs.
 */
export const initialStateForModalsInputs = {
    [HELPERS_LINKS_MODAL]: {
        normal: {
            title: '',
            icon: 'FaBorderNone',
            link: '',
        },
        errors: {
            title: false,
            link: false,
        }
    },
    [CALENDAR_MODAL]: {
        normal: {
            date: moment().format('yyyy-MM-DD'),
            items: [
                {
                    start: '',
                    message: '',
                    importantLevel: LEVELS.LOW,
                }
            ],
        },
        errors: {
            date: false,
            items: [
                {
                    start: false,
                    message: false,
                }
            ],
        }
    },
    [SUBJECT_MODAL]: {
        normal: {
            title: '',
            icon: 'FaBorderNone',
            ifEnd: false,
            semesters: [],
            departments: [
                {
                    title: '',
                    shortName: '',
                    link: ''
                }
            ],
            classesPlatforms: [
                {
                    type: '',
                    place: '',
                    link: ''
                }
            ]
        },
        errors: {
            title: false,
            semesters: false,
            departments: [
                {
                    title: false,
                    shortName: false,
                    link: false
                }
            ],
            classesPlatforms: [
                {
                    type: false,
                    place: false,
                    link: false,
                }
            ]
        }
    },
};