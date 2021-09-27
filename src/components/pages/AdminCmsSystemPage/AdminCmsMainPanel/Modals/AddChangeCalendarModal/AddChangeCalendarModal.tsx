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

import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import axiosInstance from '../../../../../../helpers/request';

import { ModalsStateContext, ModalStateType } from '../../../../../../contextStore/ModalsStateProvider';
import { FormCalendarModalContext, FormCalendarModalType } from '../../../../../../contextStore/FormCalendarModalProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreProvider';

import { MODAL_TYPES } from '../../../../../../contextStore/ModalsStateProvider';
import updateLogsDateAsync from '../../../../../../constants/updateLogsDateAsync';

const MessageModule = React.lazy(() => import('./MessageModule'));
const UniversalHeader = React.lazy(() => import('../../../../../layouts/UniversalHeader/UniversalHeader'));

const {
    modalContainer, modalWrapper, modalAddIcon, modalOpen, modalAddWrapper
} = require('./../WarningDeleteModal/WarningDeleteModal.module.scss');
const {
    dateInputsContainer, dateInput, addEntrieModule, calendarPicker, newChangeEntrie, addNewEntrie,
    formCalendarButtons, restoreWindow, subjectFormSend, someError
} = require('./AddChangeCalendarModal.module.scss');

/**
 * Constant that defines the maximum possible amount of calendar activity added in one day.
 */
const MAX_ENTRIES_ADD = 4;

/**
 * @details Modal rendering component for adding up to n calendar entries (for n constant "MAX_ENTRIES_ADD").
 *          The component has a validation of the data entered by the user and after clicking the confirmation
 *          button, it sends the data to the API.
 */
const AddChangeCalendarModal = (): JSX.Element => {

    const { calendarModal, setCalendarModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);
    const { dataFetchFromServer, setDataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const {
        date, setDate, entries, setEntries, errors, setErrors, validateAll
    } = useContext<Partial<FormCalendarModalType>>(FormCalendarModalContext);

    const ifModalOpen = calendarModal!.ifOpen && calendarModal!.type !== MODAL_TYPES.REMOVE ? modalOpen : '';
    const { calendarRecords } = dataFetchFromServer;

    const handleAddNewEntrie = () => {
        if (entries!.length < MAX_ENTRIES_ADD) {
            const copy = [ ...entries! ];
            copy.push({ _id: uuidv4(), start: '', message: '', importantLevel: 'low' });
            setEntries!(copy);
        }
    }

    const restoreValues = () => {
        setDate!('');
        setEntries!([ { _id: uuidv4(), start: '', message: '', importantLevel: 'low' } ]);
        setCalendarModal!({ ...calendarModal!, ifOpen: false });
        setErrors!({ date: false, time: false, message: false });
    }

    const editExistValue = async (newObject: any, copy: any[]) => {
        await axiosInstance.put(`calendar-record/${calendarModal!.id}`, newObject);
        const index = copy.findIndex((x: any) => x._id === calendarModal!.id);
        if (index >= 0) {
            copy[index] = newObject;
            setDataFetchFromServer!({ ...dataFetchFromServer, calendarRecords: copy });
        }
    }

    const addNewValue = async (newObject: any, copy: Array<any>) => {
        const res = await axiosInstance.post('calendar-record', newObject);
        const newCalendarRecord = res.data;
        copy.push(newCalendarRecord);
        setDataFetchFromServer!({ ...dataFetchFromServer, calendarRecords: copy });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const objErrors = validateAll!();
        if (!objErrors.dateBool && !objErrors.timeBool && !objErrors.messageBool) {
            const dateSplit = date!.split('-');
            const copy = [ ...calendarRecords ];
            const newObject = {
                _id: calendarModal!.id,
                day: parseInt(dateSplit[2]),
                month: parseInt(dateSplit[1]) - 1,
                year: parseInt(dateSplit[0]),
                items: entries!.map((entrie: any) => ({
                    start: entrie.start,
                    message: entrie.message,
                    importantLevel: entrie.importantLevel,
                })),
            };
            if (calendarModal!.type === MODAL_TYPES.EDIT) {
                editExistValue(newObject, copy);
            } else {
                addNewValue(newObject, copy);
            }
            updateLogsDateAsync('calendar', process.env.REACT_APP_CALENDAR_ID);
            restoreValues();
        } else {
            setErrors!({ date: objErrors.dateBool, time: objErrors.timeBool, message: objErrors.messageBool });
        }
    }

    useEffect(() => {
        if (calendarModal!.id !== null) {
            const shellingObject = calendarRecords.find((object: any) => object._id === calendarModal!.id);
            if (shellingObject !== undefined) {
                const month = shellingObject.month < 10 ? `0${shellingObject.month + 1}` : shellingObject.month + 1;
                const day = shellingObject.day < 10 ? `0${shellingObject.day}` : shellingObject.day;
                if (calendarModal!.type === MODAL_TYPES.EDIT) {
                    setDate!(`${shellingObject.year}-${month}-${day}`);
                    setEntries!(shellingObject.items.map((item: any) => ({
                        _id: uuidv4(),
                        start: item.start,
                        message: item.message,
                        importantLevel: item.importantLevel,
                    })));
                } else {
                    setDate!('');
                    setEntries!([ { _id: uuidv4(), start: '', message: '', importantLevel: 'low' } ]);
                }
            }
        }
    }, [ calendarModal, calendarRecords, setDate, setEntries ]);

    const classToggle = errors!.message || errors!.time ? someError : '';
    const inputClassToggle = errors!.date ? someError : '';

    return (
        <div className = {classnames(modalContainer, ifModalOpen)}>
            <div className = {classnames(modalWrapper, modalAddWrapper)}>
                <UniversalHeader
                    iconP = {[ 'fas', calendarModal!.type !== 'edit' ? 'folder-plus' : 'edit' ]}
                    content = {`Kreator ${calendarModal!.type !== 'edit' ? 'dodawania' : 'edytowania'} wpisu kalendarza`}
                    ifCloseButtonVisible = {false}
                />
                <form className = {newChangeEntrie} onSubmit = {handleSubmit} noValidate>
                    <div className = {dateInputsContainer}>
                        <input
                            type = 'date'
                            value = {date}
                            onChange = {({ target }) => setDate!(target.value)}
                            className = {classnames(dateInput, inputClassToggle)}
                        />
                        <div className = {calendarPicker}>
                            <FontAwesomeIcon
                                icon = {[ 'fas', 'calendar-alt' ]}
                                className = {modalAddIcon}
                            />
                        </div>
                    </div>
                    <div className = {classnames(addEntrieModule, classToggle)}>
                        <MessageModule/>
                        <button
                            type = 'button'
                            className = {addNewEntrie}
                            onClick = {handleAddNewEntrie}
                            title = 'Dodaj nowy wpis kalendarza'
                        >
                            Dodaj nowy wpis ({entries!.length}/{MAX_ENTRIES_ADD})
                        </button>
                    </div>
                    <div className = {formCalendarButtons}>
                        <button
                            type = 'button'
                            onClick = {restoreValues}
                            className = {restoreWindow}
                        >
                            Odrzuć zmiany
                        </button>
                        <button className = {subjectFormSend}>
                            Zapisz zmiany
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddChangeCalendarModal;