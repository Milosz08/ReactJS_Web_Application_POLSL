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

import { allModals, allModalsActions, allModalsInputs, modalInputHeader, modalsTypes } from './types';

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
     * @param valueInput { modalInputHeader } - enum type decided if is normal or error inputs.
     * @param value { any } - primitive type to change state.
     */
    public static changeModalSelectedInput = (
        modalType: allModals, inputType: allModalsInputs, value: any, valueInput = modalInputHeader.NORMAL
    ): ReturnedToReducer => ({
        type: modalsTypes.CHANGE_MODAL_SELECTED_INPUT,
        payload: {
            modalType, inputType, value, valueInput
        }
    });

    /**
     * Method responsible for change selected input in array.
     *
     * @param modalType { allModals } - modal currently supported.
     * @param arrayType { allModalsInputs } - selected array in supported modal.
     * @param inputType { allModalsInputs } - input in currently supported modal.
     * @param arrayIdx { number } - array element index.
     * @param value { any } - primitive type to change state.
     * @param valueInput { modalInputHeader } - enum type decided if is normal or error inputs.
     */
    public static changeModalSelectedInputArray = (
        modalType: allModals, arrayType: allModalsInputs, inputType: allModalsInputs,
        arrayIdx: number, value: any, valueInput = modalInputHeader.NORMAL
    ): ReturnedToReducer => ({
        type: modalsTypes.CHANGE_MODAL_SELECTED_ARRAY,
        payload: {
            modalType, arrayType, inputType, arrayIdx, value, valueInput
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
     * Method responsible for adding element into redux modal data elements array.
     *
     * @param modalType { allModals } - modal currently supported.
     * @param inputType { allModalsInputs } - input in currently supported modal.
     * @param elementToAdd { object } - object values added into array.
     * @param valueInput
     */
    public static addElementIntoArray = (
        modalType: allModals, inputType: allModalsInputs, elementToAdd: object, valueInput = modalInputHeader.NORMAL
    ): ReturnedToReducer => ({
        type: modalsTypes.ADD_ELEMENT_INTO_ARRAY,
        payload: {
            modalType, inputType, elementToAdd, valueInput
        }
    });

    /**
     * Method responsible for deleting element from redux modal data elements array.
     *
     * @param modalType { allModals } - modal currently supported.
     * @param inputType { allModalsInputs } - input in currently supported modal.
     * @param elmIdx { number } - array element index.
     * @param valueInput { boolean? } - flag decided, if errors fields together with normal fields should removed
     */
    public static removeElementFromArray = (
        modalType: allModals, inputType: allModalsInputs, elmIdx: number, valueInput = modalInputHeader.NORMAL
    ): ReturnedToReducer => ({
        type: modalsTypes.REMOVE_ELEMENT_FROM_ARRAY,
        payload: {
            modalType, inputType, elmIdx, valueInput
        }
    });
}