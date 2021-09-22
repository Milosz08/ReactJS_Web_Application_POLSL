/**
 * @file TimeInputsModal.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/18/2021
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