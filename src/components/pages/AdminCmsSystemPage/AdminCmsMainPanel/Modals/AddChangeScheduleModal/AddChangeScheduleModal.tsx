import React, { useContext } from 'react';
import classnames from "classnames";

import { MODAL_TYPES, ModalsStateContext } from "../../../../../../contextStore/ModalsStateProvider";
import { FormScheduleModalContext } from "../../../../../../contextStore/FormScheduleModalProvider";

import UniversalHeader from "../../../../../layouts/UniversalHeader/UniversalHeader";
import SelectSubjectList from "./SelectSubjectList";

import GROUPS_STATIC from '../../../../../../constants/allGroups';
import axiosInstance from "../../../../../../helpers/request";
import {MainStoreContext} from "../../../../../../contextStore/MainStoreContext";
import updateLogsDateAsync from "../../../../../../constants/updateLogsDateAsync";

const {
   modalContainer, modalWrapper, modalOpen, modalAddWrapper
} = require('./../WarningDeleteModal/WarningDeleteModal.module.scss');
const {
   newChangeEntrie, formCalendarButtons, restoreWindow, subjectFormSend
} = require('./../AddChangeCalendarModal/AddChangeCalendarModal.module.scss');

/**
 *
 */
const AddChangeScheduleModal = () => {

   const { scheduleModal, setScheduleModal } = useContext<any>(ModalsStateContext);
   const { dataFetchFromServer, setDataFetchFromServer } = useContext<any>(MainStoreContext);
   const {
      scheduleForm, setScheduleForm, allSubjects, validateAll, setErrors
   } = useContext<any>(FormScheduleModalContext);

   const ifModalOpen = scheduleModal.ifOpen && scheduleModal.type !== MODAL_TYPES.REMOVE ? modalOpen : '';
   const headerContent = `Kreator ${scheduleModal.type !== MODAL_TYPES.EDIT 
      ? 'dodawania' : 'edytowania'} przedmiotu w dniu`;

   const editExistValue = async (newObject: any) => {
      const copy = [...dataFetchFromServer.scheduleSubjects];
      await axiosInstance.put(`subject-shedule/${scheduleModal.id}`, newObject);
      const index = copy.findIndex((x: any) => x._id === scheduleModal.id);
      if(index >= 0) {
         copy[index] = newObject;
         setDataFetchFromServer({ ...dataFetchFromServer, scheduleSubjects: copy });
      }
   }

   const addNewValue = async (newObject: any) => {
      const copy = [...dataFetchFromServer.scheduleSubjects];
      const res = await axiosInstance.post('subject-shedule', newObject);
      const newSubjectInSchedule = res.data;
      copy.push(newSubjectInSchedule);
      setDataFetchFromServer({ ...dataFetchFromServer, scheduleSubjects: copy });
   }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const objErrors = validateAll();
      if(!objErrors.hourStartBool && !objErrors.hourStartEnd) {
         const copy = [...allSubjects];
         const { title, group, type, start, end } = scheduleForm;
         const findOneSubject = copy.find((subject: any) => subject.title === scheduleForm.title);
         // eslint-disable-next-line array-callback-return
         const findPzePlatform = findOneSubject.classesPlatforms.find((platform: any) => {
            if(platform.type === '') {
               return findOneSubject.classesPlatforms[0].place;
            } else if(platform.type === scheduleForm.type) {
               return platform;
            }
         });
         const newObject = {
            title, group, day: scheduleModal.day, type, start, end,
            pzeInfo: {
               platform: findPzePlatform.place,
               pzeLink: findPzePlatform.link,
            }
         };
         if(scheduleModal.type === MODAL_TYPES.EDIT) {
            editExistValue(newObject);
         } else {
            addNewValue(newObject);
         }
         updateLogsDateAsync('schedule', process.env.REACT_APP_SCHEDULE_ID);
         restoreValues();
      } else {
         setErrors({ hourStart: objErrors.hourStartBool, hourEnd: objErrors.hourEndBool });
      }
   }

   const restoreValues = (): void => {
      setScheduleForm({
         title: allSubjects[0].title,
         group: GROUPS_STATIC.NORMAL_GROUPS[0].field,
         type: allSubjects[0].classesPlatforms[0].type,
         start: '',
         end: ''
      });
      setScheduleModal({ ...scheduleModal, ifOpen: false });
   }

   return (
      <div className = {classnames(modalContainer, ifModalOpen)}>
         <div className = {classnames(modalWrapper, modalAddWrapper)}>
            <UniversalHeader
               iconP = {['fas', scheduleModal.type !== 'edit' ? 'folder-plus' : 'edit']}
               content = {headerContent}
               ifCloseButtonVisible = {false}
               addHeaderDayIndicator = {scheduleModal.day}
            />
            <form className = {newChangeEntrie} onSubmit = {handleSubmit} noValidate>
               <SelectSubjectList/>
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

export default AddChangeScheduleModal;