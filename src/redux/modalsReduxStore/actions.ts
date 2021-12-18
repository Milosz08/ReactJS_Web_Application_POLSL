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

import { allModals, allModalsActions, allModalsInputs, modalsTypes } from './types';

interface ReturnedToReducer {
    type: modalsTypes;
    payload?: {
        [name: string]: any;
    };
}

/**
 * Static class that stores methods responsible for basic handling of app modals (mostly in CMS panel).
 */
export class ModalsActions {

    /**
     * Method responsible for calling the reducer function that change modal state.
     *
     * @param ifOpen { boolean } - flag decided, if modal is open or closed.
     * @param modal { allModals } - modal currently supported.
     * @param id { string } - element ID (necessary in EDIT_ELEMENT modal action).
     * @param type { allModalsActions? } - modal action type (by default is EDIT_MODE).
     */
    public static changeModalStateElements = (
        ifOpen: boolean, modal: allModals, id: string | null = null, type?: allModalsActions
    ): ReturnedToReducer => ({
        type: modalsTypes.CHANGE_MODAL_STATE,
        payload: {
            ifOpen, type, id, modal
        }
    });

    /**
     * Method responsible for calling the reducer function that change modal selected input property.
     *
     * @param modalType { allModals } - modal currently supported.
     * @param inputType { allModalsInputs } - input in currently supported modal.
     * @param value { any } - primitive type to change state.
     */
    public static changeModalSelectedInput = (modalType: allModals, inputType: allModalsInputs, value: any): ReturnedToReducer => ({
        type: modalsTypes.CHANGE_MODAL_SELECTED_INPUT,
        payload: {
            modalType, inputType, value
        }
    });

    /**
     * Method responsible for calling the reducer function that clear all inputs in selected modal.
     *
     * @param modalType { allModals } - modal currently supported.
     */
    public static clearAllInputs = (modalType: allModals): ReturnedToReducer => ({
        type: modalsTypes.CLEAR_ALL_SINGLE_MODAL_INPUTS,
        payload: {
            modalType
        }
    });

    /**
     * Method responsible for calling the reducer function that check all inputs in selected modal.
     *
     * @param modalType { allModals } - modal currently supported.
     */
    public static checkAllInputs = (modalType: allModals): ReturnedToReducer => ({
        type: modalsTypes.CHECK_ALL_INPUTS_ERR,
        payload: {
            modalType
        }
    });
}