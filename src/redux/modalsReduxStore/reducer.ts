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

import { modalsInitialState, START_ICON } from './initialState';
import { allModalsActions, allModalsInputs, modalsTypes } from './types';

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

        case modalsTypes.CHANGE_MODAL_SELECTED_INPUT: {
            const { modalType: modal, inputType: input, value } = action.payload;
            return {
                ...state, [modal]: {
                    ...state[modal], modalInputFields: {
                        ...state[modal].modalInputFields, [input]: value
                    }, modalInputErrorsFields: {
                        ...state[modal].modalInputErrorsFields, initialFields: false,
                    }
                }
            };
        }

        case modalsTypes.CHECK_ALL_INPUTS_ERR: {
            const { modalType } = action.payload;
            const modalFieldsState = state[modalType].modalInputFields!;
            const newModalState = state[modalType].modalInputErrorsFields!;
            Object.keys(modalFieldsState).forEach(input => {
                if (input in newModalState && input !== 'initialFields') {
                    const inputField = modalFieldsState[input];
                    if (inputField.length < 3 && typeof inputField === 'string') {
                        newModalState[input] = true;
                    } else {
                        if (input === allModalsInputs.LINK && !inputField.includes('https://')) {
                            newModalState[allModalsInputs.LINK] = true;
                        } else {
                            newModalState[input] = false;
                        }
                    }
                }
            });
            return {
                ...state, [modalType]: {
                    ...state[modalType], modalInputErrorsFields: newModalState
                }
            };
        }

        case modalsTypes.CLEAR_ALL_SINGLE_MODAL_INPUTS: {
            const { modalType } = action.payload;
            const newSelectedModalState = state[modalType];
            Object.keys(newSelectedModalState.modalInputFields!).forEach(input => {
                if (input !== allModalsInputs.ICON && input !== allModalsInputs.ITEMS) {
                    newSelectedModalState.modalInputFields![input] = '';
                } else if (input === allModalsInputs.ICON) {
                    newSelectedModalState.modalInputFields![input] = START_ICON;
                } else {
                    newSelectedModalState.modalInputFields![input].length = 1;
                }
            });
            Object.keys(newSelectedModalState.modalInputErrorsFields!).forEach(errInput => {
                if (errInput !== 'initialFields') {
                    if (errInput !== allModalsInputs.ITEMS) {
                        newSelectedModalState.modalInputErrorsFields![errInput] = false;
                    } else {
                        newSelectedModalState.modalInputErrorsFields![errInput].length = 1;
                    }
                } else {
                    newSelectedModalState.modalInputErrorsFields![errInput] = true;
                }
            });
            return { ...state, [modalType]: newSelectedModalState };
        }

        case modalsTypes.ADD_ELEMENT_INTO_ARRAY: {
            const { modalType, inputType, elementToAdd, errorElements } = action.payload;
            if (errorElements) {
                return {
                    ...state, [modalType]: {
                        ...state[modalType], modalInputFields: {
                            ...state[modalType].modalInputFields,
                            [inputType]: [ ...state[modalType].modalInputFields![inputType], elementToAdd ]
                        }, modalInputErrorsFields: {
                            ...state[modalType].modalInputErrorsFields,
                            [inputType]: [ ...state[modalType].modalInputErrorsFields![inputType], errorElements ]
                        }
                    }
                };
            }
            return {
                ...state, [modalType]: {
                    ...state[modalType], modalInputFields: {
                        [inputType]: [ ...state.modalInputFields[inputType], elementToAdd ]
                    }
                }
            };
        }

        case modalsTypes.REMOVE_ELEMENT_FROM_ARRAY: {
            const { modalType, inputType, elmIdx } = action.payload;
            const modal = state[modalType];
            const findAllWithoutSearch = modal.modalInputFields![inputType].filter((_: any, idx: number) => idx !== elmIdx);
            const findAllErrWithoutSearch = modal.modalInputErrorsFields![inputType].filter((_: any, idx: number) => idx !== elmIdx);
            return {
                ...state, [modalType]: {
                    ...state[modalType], modalInputFields: {
                        ...state[modalType].modalInputFields, [inputType]: findAllWithoutSearch
                    }, modalInputErrorsFields: {
                        ...state[modalType].modalInputErrorsFields, [inputType]: findAllErrWithoutSearch
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