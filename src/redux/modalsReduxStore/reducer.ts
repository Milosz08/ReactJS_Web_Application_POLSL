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

import { allModalsActions, modalsTypes } from './types';
import { initialStateForModalsInputs } from './singleInitialStates';

/**
 * The reducer function responsible for managing state for the ReduxModals tree.
 *
 * @param state { apiInitialState } - ReduxModals tree state.
 * @param action { any } - object stored action: type and payload.
 */
const modalsReducer = (state = modalsInitialState, action: any) => {
    switch (action.type) {

        case modalsTypes.CHANGE_MODAL_STATE: {
            const { ifOpen, type, id, modal } = action.payload;
            let newType: allModalsActions = state[modal].action;
            if (Boolean(type)) {
                newType = type;
            }
            return {
                ...state, [modal]: {
                    ...state[modal], ifOpen, action: newType, dataID: id
                }
            };
        }

        case modalsTypes.CHANGE_MODAL_ROOT_ELEMENT: {
            const { modal, rootElement, rootValue } = action.payload;
            return {
                ...state, [modal]: {
                    ...state[modal], [rootElement]: rootValue
                }
            };
        }

        case modalsTypes.CHANGE_MODAL_SELECTED_INPUT: {
            const { modalType, inputType, value, valueInput } = action.payload;
            return {
                ...state, [modalType]: {
                    ...state[modalType], [valueInput]: {
                        ...state[modalType][valueInput], [inputType]: value
                    }
                }
            };
        }

        case modalsTypes.CHANGE_MODAL_SELECTED_ARRAY: {
            const { modalType, arrayType, inputType, valueInput, arrayIdx, value } = action.payload;
            const arrayCopy = state[modalType][valueInput]![arrayType];
            arrayCopy[arrayIdx][inputType] = value;
            return {
                ...state, [modalType]: {
                    ...state[modalType], [valueInput]: {
                        ...state[modalType][valueInput], [arrayType]: arrayCopy
                    }
                }
            };
        }

        case modalsTypes.CLEAR_ALL_SINGLE_MODAL_INPUTS: {
            const { modalType } = action.payload;
            const copyInitialState = JSON.parse(JSON.stringify(initialStateForModalsInputs[modalType]));
            return {
                ...state, [modalType]: {
                    ...state[modalType],
                    modalInputFields: copyInitialState.normal,
                    modalInputErrorsFields: copyInitialState.errors,
                }
            };
        }

        case modalsTypes.ADD_ELEMENT_INTO_ARRAY: {
            const { modalType, inputType, elementToAdd, valueInput } = action.payload;
            return {
                ...state, [modalType]: {
                    ...state[modalType], [valueInput]: {
                        ...state[modalType][valueInput],
                        [inputType]: [ ...state[modalType][valueInput]![inputType], elementToAdd ]
                    }
                }
            };
        }

        case modalsTypes.REMOVE_ELEMENT_FROM_ARRAY: {
            const { modalType, inputType, elmIdx, valueInput } = action.payload;
            const match = state[modalType][valueInput]![inputType].filter((_: any, idx: number) => idx !== elmIdx);
            return {
                ...state, [modalType]: {
                    ...state[modalType], [valueInput]: {
                        ...state[modalType][valueInput], [inputType]: match
                    }
                }
            };
        }

        default: {
            return state;
        }

    }
};

export default modalsReducer;