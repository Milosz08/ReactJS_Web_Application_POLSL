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

import { allModals, allModalsActions } from './types';

import ROUTING_PATH_NAMES from '../../helpers/structs/routingPathNames';
import { API_ENDPOINTS } from '../../helpers/structs/appEndpoints';
import { apiReducerTypes, updateSections } from '../apiReduxStore/types';
import { LEVELS } from '../../helpers/structs/calendar.config';
import { initialStateForModalsInputs } from './singleInitialStates';

const { SUBJECT_MODAL, USER_MESSAGES_MODAL, HELPERS_LINKS_MODAL, CALENDAR_MODAL } = allModals;
const { EDIT_ELEMENT } = allModalsActions;

const { SUBJECT_CMS_PAGE, USERS_MESS_CMS_PAGE, HELPS_CMS_PAGE, CALENDAR_CMS_PAGE } = ROUTING_PATH_NAMES;
const { SUBJECTS_ELMS, FOOTER_FORM, HELPERS_LINKS, CALENDAR_RECORDS } = API_ENDPOINTS;
const { USER_MESSAGES, SUBJECTS, CALENDAR, HELPERS_LINKS: HELPERS } = apiReducerTypes;
const { SUBJECTS: UP_SUBJECTS, CALENDAR: UP_CALENDAR, USER_MESS: UP_USER_MESS, HELPERS: UP_HELPS } = updateSections;

interface ModalParametersProvider {
    ifOpen: boolean;
    action: allModalsActions;
    dataID: string | null;
    iconComponent: string;
    titleContent: string;
    pageTitle: string;
    apiActionsPath: string;
    apiReducerObjectKey: string;
    updateApiParam: string;
    modalInputFields?: {
        [key: string]: string | CalendarSingleItem[] | any;
    };
    modalInputErrorsFields?: {
        [key: string]: boolean | { [key: string]: boolean }[] | any;
    };
}

export interface ModalsInitialTypes {
    [key: string]: ModalParametersProvider,
}

export interface CalendarSingleItem {
    start: string;
    message: string;
    importantLevel: LEVELS
}

const copyInitialState = JSON.parse(JSON.stringify(initialStateForModalsInputs));

export const modalsInitialState: ModalsInitialTypes = {
    [SUBJECT_MODAL]: {
        ifOpen: false,
        action: EDIT_ELEMENT,
        dataID: null,
        iconComponent: 'BsBookmarkCheck',
        titleContent: 'przemiot',
        pageTitle: SUBJECT_CMS_PAGE,
        apiActionsPath: SUBJECTS_ELMS,
        apiReducerObjectKey: SUBJECTS,
        updateApiParam: UP_SUBJECTS,
        modalInputFields: copyInitialState[SUBJECT_MODAL].normal,
        modalInputErrorsFields: copyInitialState[SUBJECT_MODAL].errors,
    },
    [USER_MESSAGES_MODAL]: {
        ifOpen: false,
        action: EDIT_ELEMENT,
        dataID: null,
        iconComponent: 'BsEnvelope',
        titleContent: 'wiadomość użytkownika',
        pageTitle: USERS_MESS_CMS_PAGE,
        apiActionsPath: FOOTER_FORM,
        apiReducerObjectKey: USER_MESSAGES,
        updateApiParam: UP_USER_MESS,
        modalInputFields: copyInitialState[CALENDAR_MODAL].normal,
        modalInputErrorsFields: copyInitialState[CALENDAR_MODAL].errors,
    },
    [HELPERS_LINKS_MODAL]: {
        ifOpen: false,
        action: EDIT_ELEMENT,
        dataID: null,
        iconComponent: 'BsDownload',
        titleContent: 'link do pomocy',
        pageTitle: HELPS_CMS_PAGE,
        apiActionsPath: HELPERS_LINKS,
        apiReducerObjectKey: HELPERS,
        updateApiParam: UP_HELPS,
        modalInputFields: copyInitialState[HELPERS_LINKS_MODAL].normal,
        modalInputErrorsFields: copyInitialState[HELPERS_LINKS_MODAL].errors,
    },
    [CALENDAR_MODAL]: {
        ifOpen: false,
        action: EDIT_ELEMENT,
        dataID: null,
        iconComponent: 'BsCalendar',
        titleContent: 'wpis/y kalendarza',
        pageTitle: CALENDAR_CMS_PAGE,
        apiActionsPath: CALENDAR_RECORDS,
        apiReducerObjectKey: CALENDAR,
        updateApiParam: UP_CALENDAR,
        modalInputFields: copyInitialState[CALENDAR_MODAL].normal,
        modalInputErrorsFields: copyInitialState[CALENDAR_MODAL].errors,
    }
};