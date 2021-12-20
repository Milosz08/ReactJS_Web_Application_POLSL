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

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/reduxStore';
import { ModalsActions } from '../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../redux/modalsReduxStore/initialState';
import { allModals, allModalsInputs, modalInputHeader } from '../../redux/modalsReduxStore/types';

/**
 * Custom hook responsible for validate inputs content in all modals in CMS panels.
 *
 * @param modalType { allModals } - selected modal.
 */
const useValidateAddEditCmsModal = (modalType: allModals) => {

    const modal: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const selModal = modal[modalType].modalInputFields;

    const { CALENDAR_MODAL, HELPERS_LINKS_MODAL } = allModals;
    const { DATE, ITEMS, START, MESSAGE, TITLE, LINK } = allModalsInputs;
    const { ERROR } = modalInputHeader;

    const dispatcher = useDispatch();
    const { changeModalSelectedInputArray, changeModalSelectedInput } = ModalsActions;

    const clearSelectedInput = (inputField: allModalsInputs): void => {
        if(modal[modalType].modalInputErrorsFields![inputField]) {
            dispatcher(ModalsActions.changeModalSelectedInput(modalType, inputField, false, modalInputHeader.ERROR));
        }
    };

    const clearSelectedArrayInput = (array: allModalsInputs, inputField: allModalsInputs, itemIdx: number): void => {
        if(modal[modalType].modalInputErrorsFields![array][itemIdx][inputField]) {
            dispatcher(ModalsActions.changeModalSelectedInputArray(
                modalType, array, inputField, itemIdx, false, modalInputHeader.ERROR
            ));
        }
    };

    const validateReducer = () => {
        switch(modalType) {

            case allModals.HELPERS_LINKS_MODAL: {
                let nonValid = false;
                if(selModal!.title.length < 3) {
                    dispatcher(changeModalSelectedInput(HELPERS_LINKS_MODAL, TITLE, true, ERROR));
                    nonValid = true;
                }
                if(selModal!.link.length < 5 || !selModal!.link.toLowerCase().includes('https://')) {
                    dispatcher(changeModalSelectedInput(HELPERS_LINKS_MODAL, LINK, true, ERROR));
                    nonValid = true;
                }
                return nonValid;
            }

            case allModals.CALENDAR_MODAL: {
                let nonValid = false;
                if (selModal!.date.length === 0) {
                    dispatcher(changeModalSelectedInput(CALENDAR_MODAL, DATE, true, ERROR));
                    nonValid = true;
                }
                selModal!.items.forEach((item: any, idx: number) => {
                    if (item.start.length === 0) {
                        dispatcher(changeModalSelectedInputArray(CALENDAR_MODAL, ITEMS, START, idx, true, ERROR));
                        nonValid = true;
                    }
                    if (item.message.length === 0) {
                        dispatcher(changeModalSelectedInputArray(CALENDAR_MODAL, ITEMS, MESSAGE, idx, true, ERROR));
                        nonValid = true;
                    }
                });
                return nonValid;
            }

        }
    };

    return { validateReducer, clearSelectedInput, clearSelectedArrayInput };
};

export default useValidateAddEditCmsModal;