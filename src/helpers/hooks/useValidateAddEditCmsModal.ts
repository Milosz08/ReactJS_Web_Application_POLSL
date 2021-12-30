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

    const { CALENDAR_MODAL, HELPERS_LINKS_MODAL, SUBJECT_MODAL, SCHEDULE_MODAL } = allModals;
    const {
        DATE, ITEMS, START, MESSAGE, TITLE, LINK, SEMESTERS, DEPARTMENTS, SHORT, TYPE, PLACE, CLASSES, GROUP,
        START_HOUR, END_HOUR
    } = allModalsInputs;
    const { ERROR } = modalInputHeader;

    const dispatcher = useDispatch();
    const { changeModalSelectedInputArray, changeModalSelectedInput } = ModalsActions;

    const clearSelectedInput = (inputField: allModalsInputs): void => {
        if (modal[modalType].modalInputErrorsFields![inputField]) {
            dispatcher(ModalsActions.changeModalSelectedInput(modalType, inputField, false, modalInputHeader.ERROR));
        }
    };

    const clearSelectedArrayInput = (array: allModalsInputs, inputField: allModalsInputs, itemIdx: number): void => {
        if (modal[modalType].modalInputErrorsFields![array][itemIdx][inputField]) {
            dispatcher(ModalsActions.changeModalSelectedInputArray(
                modalType, array, inputField, itemIdx, false, modalInputHeader.ERROR
            ));
        }
    };

    const validateStartAndEndTime = (): boolean => {
        const startNumber = parseInt(selModal!.startHour.replace(':', ''));
        const endNumber = parseInt(selModal!.endHour.replace(':', ''));
        return startNumber > endNumber;
    };

    const validateReducer = () => {
        switch (modalType) {
            case HELPERS_LINKS_MODAL: {
                let nonValid = false;
                if (selModal!.title.length < 3) {
                    dispatcher(changeModalSelectedInput(HELPERS_LINKS_MODAL, TITLE, true, ERROR));
                    nonValid = true;
                }
                if (selModal!.link.length < 5 || !selModal!.link.toLowerCase().includes('https://')) {
                    dispatcher(changeModalSelectedInput(HELPERS_LINKS_MODAL, LINK, true, ERROR));
                    nonValid = true;
                }
                return nonValid;
            }
            case CALENDAR_MODAL: {
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
            case SUBJECT_MODAL: {
                let nonValid = false;
                if (selModal!.title.length < 3) {
                    dispatcher(changeModalSelectedInput(SUBJECT_MODAL, TITLE, true, ERROR));
                    nonValid = true;
                }
                if (selModal!.semesters.length === 0) {
                    dispatcher(changeModalSelectedInput(SUBJECT_MODAL, SEMESTERS, true, ERROR));
                    nonValid = true;
                }
                selModal!.departments.forEach((item: any, idx: number) => {
                    if (item.title.length === 0) {
                        dispatcher(changeModalSelectedInputArray(SUBJECT_MODAL, DEPARTMENTS, TITLE, idx, true, ERROR));
                        nonValid = true;
                    }
                    if (item.shortName.length === 0) {
                        dispatcher(changeModalSelectedInputArray(SUBJECT_MODAL, DEPARTMENTS, SHORT, idx, true, ERROR));
                        nonValid = true;
                    }
                    if (item.link.length < 5 || !item.link.toLowerCase().includes('https://')) {
                        dispatcher(changeModalSelectedInputArray(SUBJECT_MODAL, DEPARTMENTS, LINK, idx, true, ERROR));
                        nonValid = true;
                    }
                });
                selModal!.classesPlatforms.forEach((item: any, idx: number) => {
                    if (item.type === 'typ zajęć') {
                        dispatcher(changeModalSelectedInputArray(SUBJECT_MODAL, CLASSES, TYPE, idx, true, ERROR));
                        nonValid = true;
                    }
                    if (item.place === 'miejsce') {
                        dispatcher(changeModalSelectedInputArray(SUBJECT_MODAL, CLASSES, PLACE, idx, true, ERROR));
                        nonValid = true;
                    }
                    if (item.link.length < 5 || !item.link.toLowerCase().includes('https://')) {
                        dispatcher(changeModalSelectedInputArray(SUBJECT_MODAL, CLASSES, LINK, idx, true, ERROR));
                        nonValid = true;
                    }
                });
                return nonValid;
            }
            case SCHEDULE_MODAL: {
                let nonValid = false;
                if (selModal!.title === 'wybierz przedmiot') {
                    dispatcher(changeModalSelectedInput(SCHEDULE_MODAL, TITLE, true, ERROR));
                    nonValid = true;
                }
                if (selModal!.group === 'wybierz grupę') {
                    dispatcher(changeModalSelectedInput(SCHEDULE_MODAL, GROUP, true, ERROR));
                    nonValid = true;
                }
                if (selModal!.type === 'wybierz typ zajęć') {
                    dispatcher(changeModalSelectedInput(SCHEDULE_MODAL, TYPE, true, ERROR));
                    nonValid = true;
                }
                if (selModal!.startHour.length === 0) {
                    dispatcher(changeModalSelectedInput(SCHEDULE_MODAL, START_HOUR, true, ERROR));
                    nonValid = true;
                }
                if (selModal!.endHour.length === 0) {
                    dispatcher(changeModalSelectedInput(SCHEDULE_MODAL, END_HOUR, true, ERROR));
                    nonValid = true;
                }
                if (validateStartAndEndTime()) {
                    dispatcher(changeModalSelectedInput(SCHEDULE_MODAL, START_HOUR, true, ERROR));
                    dispatcher(changeModalSelectedInput(SCHEDULE_MODAL, END_HOUR, true, ERROR));
                    nonValid = true;
                }
                return nonValid;
            }
        }
    };

    return { validateReducer, clearSelectedInput, clearSelectedArrayInput };
};

export default useValidateAddEditCmsModal;