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

import { modalsInitialState } from './initialState';
import { modalsTypes } from './types';

const { CHANGE_MODAL_STATE } = modalsTypes;

const modalsReducer = (state = modalsInitialState, action: any) => {
    switch(action.type) {

        case CHANGE_MODAL_STATE: {
            const { ifOpen, type, id, modal } = action.payload;
            return { ...state, [modal]: { ...state[modal], ifOpen, action: type, dataID: id } };
        }

        default: {
            return state;
        }

    }
};

export default modalsReducer;