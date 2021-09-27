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

import React, { Fragment, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FormScheduleModalContext, FormScheduleModalTypes } from '../../../../../../contextStore/FormScheduleModalProvider';

const { inputWrapper, someError } = require('./AddChangeScheduleModal.module.scss');
const { timePicker, modalAddIcon } = require('./../AddChangeCalendarModal/AddChangeCalendarModal.module.scss');

/**
 * @details Component that generates fields for entering the start time and end time of an item in the modal.
 */
const TimeInputsModal = (): JSX.Element => {

    const {
        scheduleForm, setScheduleForm, errors, setErrors
    } = useContext<Partial<FormScheduleModalTypes>>(FormScheduleModalContext);

    const handleChangeInput = (target: EventTarget & HTMLInputElement, id: number) => {
        switch (id) {
            case 1:
                setErrors!({ ...errors, hourStart: false });
                setScheduleForm!({ ...scheduleForm, start: target.value });
                break;
            case 2:
                setErrors!({ ...errors, hourEnd: false });
                setScheduleForm!({ ...scheduleForm, end: target.value })
                break;
            default:
                throw new Error('Unexpected input id!');
        }
    }

    return (
        <Fragment>
            <div className = {inputWrapper}>
                <input
                    type = 'time'
                    value = {scheduleForm!.start}
                    className = {errors!.hourStart ? someError : ''}
                    onChange = {({ target }) => handleChangeInput(target, 1)}
                />
                <div className = {timePicker}>
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'clock' ]}
                        className = {modalAddIcon}
                    />
                </div>
            </div>
            <span>-</span>
            <div className = {inputWrapper}>
                <input
                    type = 'time'
                    value = {scheduleForm!.end}
                    className = {errors!.hourEnd ? someError : ''}
                    onChange = {({ target }) => handleChangeInput(target, 2)}
                />
                <div className = {timePicker}>
                    <FontAwesomeIcon
                        icon = {[ 'fas', 'clock' ]}
                        className = {modalAddIcon}
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default TimeInputsModal;