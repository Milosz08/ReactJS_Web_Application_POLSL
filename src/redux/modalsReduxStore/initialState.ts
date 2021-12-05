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

const { SUBJECT_MODAL, USER_MESSAGES_MODAL, HELPERS_LINKS_MODAL, CALENDAR_MODAL } = allModals;

interface ModalParametersProvider {
    ifOpen: boolean;
    action: allModalsActions;
    dataID: string | null;
    iconComponent: string;
    titleContent: string;
}

export interface ModalsInitialTypes {
    [key: string]: ModalParametersProvider,
}

export const modalsInitialState: ModalsInitialTypes = {
    [SUBJECT_MODAL]: {
        ifOpen: false,
        action: allModalsActions.EDIT_ELEMENT,
        dataID: null,
        iconComponent: 'BsBookmarkCheck',
        titleContent: 'przemiot',
    },
    [USER_MESSAGES_MODAL]: {
        ifOpen: false,
        action: allModalsActions.EDIT_ELEMENT,
        dataID: null,
        iconComponent: 'BsEnvelope',
        titleContent: 'wiadomość użytkownika',
    },
    [HELPERS_LINKS_MODAL]: {
        ifOpen: false,
        action: allModalsActions.EDIT_ELEMENT,
        dataID: null,
        iconComponent: 'BsDownload',
        titleContent: 'link do pomocy',
    },
    [CALENDAR_MODAL]: {
        ifOpen: false,
        action: allModalsActions.EDIT_ELEMENT,
        dataID: null,
        iconComponent: 'BsCalendar',
        titleContent: 'wpisy kalendarza',
    }
};