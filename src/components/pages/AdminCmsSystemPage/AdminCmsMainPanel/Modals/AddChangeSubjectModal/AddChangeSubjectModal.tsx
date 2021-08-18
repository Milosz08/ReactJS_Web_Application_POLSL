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

import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../../../../../helpers/request';

import { ModalsStateContext, ModalStateType, MODAL_TYPES } from '../../../../../../contextStore/ModalsStateProvider';
import { FormDataAndValidateContext } from '../../../../../../contextStore/FormDataAndValidateProvider';
import { MainStoreContext, MainStoreProviderTypes } from '../../../../../../contextStore/MainStoreContext';

import CheckboxSemesters from './CheckboxSemesters';
import RadioStatusEnd from './RadioStatusEnd';
import DepartmentsInject from './DepartmentsInject';
import TypeAndPlatform from './TypeAndPlatform';
import UniversalHeader from "../../../../../layouts/UniversalHeader/UniversalHeader";

const {
   modalContainer, modalWrapper, modalOpen, modalAddWrapper
} = require('./../WarningDeleteModal/WarningDeleteModal.module.scss');
const {
   someError, titleContainer, iconContainer, signleInputsContainer, removeInputField, multipleInputsContainer,
   checkFieldsLeft, restoreWindow, subjectFormSend, formModalButtons
} = require('./AddChangeSubjectModal.module.scss');

/**
 * @details Modal generating component that allows the administrator to enter a new item/edit the item. The component uses
 *          other components that generate the rest of the form inputs and validate the input by the user. The component uses
 *          the main store that stores the data downloaded from the API. After sending the form, the component connects to the
 *          API and, based on appropriate methods, updates or adds a new item.
 */
const AddChangeSubjectModal = () => {

   const { subjectModal, setSubjectModal } = useContext<Partial<ModalStateType>>(ModalsStateContext);
   const { dataFetchFromServer, setDataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const {
      title, setTitle, icon, setIcon, errors, setErrors, semesters, setSemesters, departments, setDepartments,
      ifEnd, setIfEnd, classesPlatforms, setClassesPlatforms, setDepartmentsCount, setClassesPlatformsCount,
      validateAll, restoreValues,
   } = useContext<any>(FormDataAndValidateContext);

   const { subjectsData } = dataFetchFromServer;
   const ifModalOpen = subjectModal!.ifOpen && subjectModal!.type !== MODAL_TYPES.REMOVE ? modalOpen : '';

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
         _id: subjectModal!.id,
         title: title,
         semesters: semesters,
         ifEnd: ifEnd[0],
         departments: departments,
         icon: ['fas', icon],
         classesPlatforms: classesPlatforms,
      }
      await axiosInstance.put(`subjects-data/${subjectModal!.id}`, newObject);
      const index = copyArray.findIndex(x => x._id === subjectModal!.id);
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
         setSubjectModal!({ id: '', type: '', ifOpen: false });
         if(subjectModal!.type === MODAL_TYPES.EDIT) {
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
      if(subjectModal!.id !== null && subjectModal!.id) {
         const shellingObject = subjectsData.find((object: any) => object._id === subjectModal!.id);
         if(subjectModal!.type === MODAL_TYPES.EDIT) {
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
   }, [subjectModal!.ifOpen]);

   return (
      <div className = {`${modalContainer} ${ifModalOpen}`}>
         <div className = {`${modalWrapper} ${modalAddWrapper}`}>
            <UniversalHeader
               iconP = {['fas', subjectModal!.type !== 'edit' ? 'folder-plus' : 'edit']}
               content = {`Kreator ${subjectModal!.type !== 'edit' ? 'dodawania' : 'edytowania'} przedmiotu`}
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