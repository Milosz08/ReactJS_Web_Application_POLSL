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
import { sessInitialState } from './initialState';

import ROUTING_PATH_NAMES from '../../helpers/structs/routingPathNames';

const {
    CHANGE_ADMIN_LOGGED_STATUS, CHANGE_USER_LOGGED_STATUS, INCREASE_SESSION_COUNER, TOGGLE_WARNING_SESSION_MODAL
} = sessionTypes;

const sessionReducer = (state = sessInitialState, action: any) => {
    switch(action.type) {

        case CHANGE_ADMIN_LOGGED_STATUS: {
            const { status: logged, role: identity } = action.payload;
            if(!logged) {
                document.title = ROUTING_PATH_NAMES.CMS_LOGIN_PAGE;
            }
            return { ...state, adminAuthStatus: { logged, identity } };
        }

        case CHANGE_USER_LOGGED_STATUS: {
            const { status: userLoggedStatus } = action.payload;
            if(!userLoggedStatus) {
                document.title = ROUTING_PATH_NAMES.CMS_LOGIN_PAGE;
            }
            return { ...state, userLoggedStatus };
        }

        case INCREASE_SESSION_COUNER: {
            const { counter: adminSessionCounter } = action.payload;
            return { ...state, sessionInfo: { ...state.sessionInfo, adminSessionCounter } };
        }

        case TOGGLE_WARNING_SESSION_MODAL: {
            const { toggleModal: ifModalOpen } = action.payload;
            return { ...state, sessionInfo: { ...state.sessionInfo, ifModalOpen } };
        }

        default:
            return state;
    }
};

export default sessionReducer;