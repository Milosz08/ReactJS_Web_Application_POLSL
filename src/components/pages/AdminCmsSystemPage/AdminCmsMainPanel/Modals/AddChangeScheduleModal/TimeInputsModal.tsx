import React, { Fragment, useContext } from 'react';
import { FormScheduleModalContext } from '../../../../../../contextStore/FormScheduleModalProvider';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const { inputWrapper, someError } = require('./AddChangeScheduleModal.module.scss');
const { timePicker, modalAddIcon } = require('./../AddChangeCalendarModal/AddChangeCalendarModal.module.scss');

/**
 *
 */
const TimeInputsModal = () => {

   const { scheduleForm, setScheduleForm, errors, setErrors } = useContext<any>(FormScheduleModalContext);

   const handleChangeInput = (target: EventTarget & HTMLInputElement, id: number) => {
      switch(id) {
         case 1:
            setErrors({ ...errors, hourStart: false });
            setScheduleForm({ ...scheduleForm, start: target.value });
            break;
         case 2:
            setErrors({ ...errors, hourEnd: false });
            setScheduleForm({ ...scheduleForm, end: target.value })
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
               value = {scheduleForm.start}
               className = {errors.hourStart ? someError : ''}
               onChange = {({ target }) => handleChangeInput(target, 1)}
            />
            <div className = {timePicker}>
               <FontAwesomeIcon
                  icon = {['fas', 'clock']}
                  className = {modalAddIcon}
               />
            </div>
         </div>
         <span>-</span>
         <div className = {inputWrapper}>
            <input
               type = 'time'
               value = {scheduleForm.end}
               className = {errors.hourEnd ? someError : ''}
               onChange = {({ target }) => handleChangeInput(target, 2)}
            />
            <div className = {timePicker}>
               <FontAwesomeIcon
                  icon = {['fas', 'clock']}
                  className = {modalAddIcon}
               />
            </div>
         </div>
      </Fragment>
   );
}

export default TimeInputsModal;