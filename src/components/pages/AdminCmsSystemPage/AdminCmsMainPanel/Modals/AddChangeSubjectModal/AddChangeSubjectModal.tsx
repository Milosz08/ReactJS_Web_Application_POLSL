import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../../../../../helpers/request';

import { ModalsStateContext } from '../../../../../../contextStore/ModalsStateProvider';
import { FormDataAndValidateContext } from '../../../../../../contextStore/FormDataAndValidateProvider';
import { MainStoreContext } from '../../../../../../contextStore/MainStoreContext';

import CheckboxSemesters from './CheckboxSemesters';
import RadioStatusEnd from './RadioStatusEnd';
import DepartmentsInject from './DepartmentsInject';
import TypeAndPlatform from './TypeAndPlatform';

import { MODAL_TYPES } from '../../../../../../contextStore/ModalsStateProvider';
import UniversalHeader from "../../../../../layouts/UniversalHeader/UniversalHeader";

const {
   modalContainer, modalWrapper, modalOpen, modalAddWrapper
} = require('./../WarningDeleteModal/WarningDeleteModal.module.scss');
const {
   someError, titleContainer, iconContainer, signleInputsContainer, removeInputField, multipleInputsContainer,
   checkFieldsLeft, restoreWindow, subjectFormSend, formModalButtons
} = require('./AddChangeSubjectModal.module.scss');

/**
 * Komponent generujący modal umożliwiający administratorowi wprowadzenie nowego przedmiotu/edycję przedmiotu.
 * Komponent korzysta z innych komponentów, generujących resztę inputów formularza oraz walidujących wprowadzane
 * dane przez użytkownika. Komponent korzysta z głównego stora przechowującego dane pobrane z API. Po wysłaniu
 * formularza, komponent łączy się z API i na podstawie odpowiednich metod aktualizuje, bądź dodaje nowy przedmiot.
 */
const AddChangeSubjectModal = () => {

   const { subjectModal, setSubjectModal } = useContext<any>(ModalsStateContext);
   const { dataFetchFromServer, setDataFetchFromServer } = useContext<any>(MainStoreContext);

   const {
      title, setTitle, icon, setIcon, errors, setErrors, semesters, setSemesters, departments, setDepartments,
      ifEnd, setIfEnd, classesPlatforms, setClassesPlatforms, setDepartmentsCount, setClassesPlatformsCount,
      validateAll, restoreValues,
   } = useContext<any>(FormDataAndValidateContext);

   const { subjectsData } = dataFetchFromServer;
   const ifModalOpen = subjectModal.ifOpen && subjectModal.type !== MODAL_TYPES.REMOVE ? modalOpen : '';

   const addNewRecord = async () => {
      const copyArray = [...subjectsData];
      const newObject = {
         title: title,
         semesters: semesters,
         ifEnd: ifEnd[0],
         departments: departments,
         icon: ['fas', icon],
         classesPlatforms: classesPlatforms,
      };
      const res = await axiosInstance.post('subjects-data', newObject);
      const newSubject = res.data;
      copyArray.push(newSubject);
      setDataFetchFromServer({ ...dataFetchFromServer, subjectsData: copyArray });
   }

   const editExistRecord = async () => {
      const copyArray = [...subjectsData];
      const newObject = {
         _id: subjectModal.id,
         title: title,
         semesters: semesters,
         ifEnd: ifEnd[0],
         departments: departments,
         icon: ['fas', icon],
         classesPlatforms: classesPlatforms,
      }
      await axiosInstance.put(`subjects-data/${subjectModal.id}`, newObject);
      const index = copyArray.findIndex(x => x._id === subjectModal.id);
      if(index >= 0) {
         copyArray[index] = newObject;
         setDataFetchFromServer({ ...dataFetchFromServer, subjectsData: copyArray });
      }
   }

   const updateDate = async () => {
      const date = new Date();
      const dateObject = {
         updateDateFor: 'subjects',
         updateDate: {
            day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear(),
            hour: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds(),
         },
      };
      await axiosInstance.put(`last-update/${process.env.REACT_APP_SUBJECTS_ID}`, dateObject);
   }

   const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { title, checkbox, department, icon, platform, checkFull } = validateAll();
      if(checkFull) {
         setSubjectModal({ id: null, type: '', ifOpen: false });
         if(subjectModal.type === MODAL_TYPES.EDIT) {
            editExistRecord();
         } else {
            addNewRecord();
         }
      } else {
         setErrors({ title, checkbox, department, icon, platform });
      }
      updateDate();
   }

   const handleSubjectTitle = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setErrors({ ...errors, title: false });
      setTitle(target.value);
   }

   const handleIcon = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setErrors({ ...errors, icon: false });
      setIcon(target.value);
   }

   useEffect(() => {
      if(subjectModal.id !== null && subjectModal.id) {
         const shellingObject = subjectsData.find((object: any) => object._id === subjectModal.id);
         if(subjectModal.type === MODAL_TYPES.EDIT) {
            setTitle(shellingObject.title);
            setIcon(shellingObject.icon[1]);
            setIfEnd([shellingObject.ifEnd, !shellingObject.ifEnd]);
            setSemesters(shellingObject.semesters);
            setDepartmentsCount(shellingObject.departments.length);
            setDepartments(shellingObject.departments);
            setClassesPlatformsCount(shellingObject.classesPlatforms.length);
            setClassesPlatforms(shellingObject.classesPlatforms);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [subjectModal.ifOpen]);

   return (
      <div className = {`${modalContainer} ${ifModalOpen}`}>
         <div className = {`${modalWrapper} ${modalAddWrapper}`}>
            <UniversalHeader
               iconP = {['fas', subjectModal.type !== 'edit' ? 'folder-plus' : 'edit']}
               content = {`Kreator ${subjectModal.type !== 'edit' ? 'dodawania' : 'edytowania'} przedmiotu`}
               ifCloseButtonVisible = {false}
            />
            <form onSubmit = {handleSubmitForm} noValidate>
               <div>
                  <div className = {signleInputsContainer}>
                     <div className = {titleContainer}>
                        <input
                           type = 'text'
                           placeholder = 'Nazwa przedmiotu'
                           value = {title}
                           onChange = {handleSubjectTitle}
                           className = {errors.title ? someError : ''}
                        />
                        <button type = 'button' onClick = {() => setTitle('')} title = 'Wyczyść pole'>
                           <FontAwesomeIcon
                              icon = {['fas', 'trash-alt']}
                              className = {removeInputField}
                           />
                        </button>
                     </div>
                     <div className = {iconContainer}>
                        <input
                           type = 'text'
                           placeholder = 'Ikona (dla prefiksów fas)'
                           value = {icon}
                           onChange = {handleIcon}
                           className = {errors.icon ? someError : ''}
                        />
                        <button type = 'button' onClick = {() => setIcon('')} title = 'Przejdź do FontAwesome'>
                           <a href = 'https://fontawesome.com/' rel = 'noreferrer' target = '_blank'>
                              <FontAwesomeIcon
                                 icon = {['fas', 'external-link-alt']}
                                 className = {removeInputField}
                              />
                           </a>
                        </button>
                     </div>
                  </div>
                  <div className = {multipleInputsContainer}>
                     <div className = {`${checkFieldsLeft} ${errors.checkbox ? someError : ''}`}>
                        <CheckboxSemesters/>
                        <RadioStatusEnd/>
                     </div>
                     <DepartmentsInject/>
                  </div>
                  <TypeAndPlatform/>
               </div>
               <div className = {formModalButtons}>
                  <button
                     type = 'button'
                     onClick = {restoreValues}
                     className = {restoreWindow}
                  >Odrzuć zmiany</button>
                  <button className = {subjectFormSend}>Zapisz zmiany</button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default AddChangeSubjectModal;