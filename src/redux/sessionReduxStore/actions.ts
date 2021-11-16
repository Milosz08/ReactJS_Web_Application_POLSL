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

import sessionTypes from './types';
import { ROLES } from '../../helpers/functionsAndClasses/LoginValidator';

interface ReturnedToReducer {
    type: sessionTypes;
    payload?: {
        [name: string]: string | boolean | number;
    };
}

export const changeAdminLoggedStatus = (status: boolean, role = ROLES.UNDEFINED): ReturnedToReducer => ({
    type: sessionTypes.CHANGE_ADMIN_LOGGED_STATUS,
    payload: {
        status, role
    }
});

export const changeUserLoggedStatus = (status: boolean) => ({
    type: sessionTypes.CHANGE_USER_LOGGED_STATUS,
    payload: {
        status
    }
});

export const increaseSessionCounter = (counter: number) => ({
    type: sessionTypes.INCREASE_SESSION_COUNER,
    payload: {
        counter
    }
});

export const toggleWarningSessionModal = (toggleModal: boolean) => ({
    type: sessionTypes.TOGGLE_WARNING_SESSION_MODAL,
    payload: {
        toggleModal
    }
});