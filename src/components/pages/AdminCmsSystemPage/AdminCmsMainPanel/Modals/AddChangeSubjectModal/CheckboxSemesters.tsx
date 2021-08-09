import React, { useContext } from 'react';
import classnames from "classnames";

import { FormDataAndValidateContext } from "../../../../../../contextStore/FormDataAndValidateProvider";
import STATIC_OPTIONS from "../../../../../../constants/inputOptions";

const {
   checkboxContainer, someError, singleCheckboxField, checkmark
} = require('./AddChangeSubjectModal.module.scss');

/**
 * Komponent renderujący pola typu checkbox do zaznaczania semestrów, w których przedmiot jest odbywany (do modala
 * z formularzem w panelu CMS administratora - panel dodawania/edycji przedmiotów).
 */
const CheckboxSemesters = () => {

   const { SEMESTERS } = STATIC_OPTIONS;
   const { semesters, setSemesters, errors, setErrors } = useContext<any>(FormDataAndValidateContext);

   const toggleClass = errors.checkbox ? someError : '';

   const generateSemestersCheckboxInputs = SEMESTERS.map((sem, index) => {

      const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
         let updateArray = [...semesters];
         target.checked ? updateArray[index] = target.value : updateArray[index] = '';
         setErrors({ ...errors, checkbox: false });
         setSemesters(updateArray);
      }

      return (
         <div key = {sem} className = {singleCheckboxField}>
            <input
               checked = {sem === semesters[index]}
               type = 'checkbox'
               id = {sem}
               value = {sem}
               onChange = {handleChange}
            />
            <label htmlFor = {sem}>{`Semestr ${index + 1}`}</label>
            <div className = {checkmark}/>
         </div>
      )
   });

   return (
      <div className = {classnames(checkboxContainer, toggleClass)}>
         {generateSemestersCheckboxInputs}
      </div>
   );
}

export default CheckboxSemesters;