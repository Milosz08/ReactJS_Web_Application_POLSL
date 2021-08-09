import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from "classnames";

import { FormDataAndValidateContext } from "../../../../../../contextStore/FormDataAndValidateProvider";

const {
   departmentsContainer, addNewDepartment, someError, removeInputField, inputContainer
} = require('./AddChangeSubjectModal.module.scss');

/**
 * Komponent renderujący możliwośc wprowadzenia nowego wydziału/edycji już wprowadzonych wydziałów, na którym
 * odbywane są zajęcia (do modala z formularzem w panelu CMS administratora - panel dodawania/edycji przedmiotów).
 */
const DepartmentsInject = () => {

   const {
      departments, setDepartments, departmentsCount, setDepartmentsCount, errors, setErrors
   } = useContext<any>(FormDataAndValidateContext);

   const addNewValueDepartment = () => {
      if(departmentsCount < 4) {
         setDepartmentsCount((prevState: number) => prevState + 1);
         let updateArray = [...departments];
         updateArray.push('');
         setDepartments(updateArray);
      }
   }

   const toggleClass = errors.department ? someError : ''

   const generateDepartmentsInputs = Array.from({ length: departmentsCount }, (v, i) => i).map((str, index) => {

      const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
         let newStateArray = [...departments];
         newStateArray[index] = target.value;
         setErrors({ ...errors, department: false });
         setDepartments(newStateArray);
      }

      const handleRemoveField = () => {
         let newStateArray = [...departments];
         newStateArray.splice(index, 1);
         if(index !== -1) {
            setDepartmentsCount((prevState: number) => prevState - 1);
            setDepartments(newStateArray);
         }
      }

      return (
         <div key = {index} className = {inputContainer}>
            <input
               type = 'text'
               key = {index}
               value = {departments[index]}
               onChange = {handleChange}
               placeholder = 'Wprowadź nazwę wydziału'
            />
            {index !== 0 && <button
               type = 'button'
               onClick = {handleRemoveField}
               title = 'Usuń pole wprowadzania wydziału'
            >
               <FontAwesomeIcon
                  icon = {['fas', 'times']}
                  className = {removeInputField}
               />
            </button>}
         </div>
      )
   });

   return (
      <div className = {classnames(departmentsContainer, toggleClass)}>
         {generateDepartmentsInputs}
         <button
            type = 'button'
            className = {addNewDepartment}
            onClick = {addNewValueDepartment}
            title = 'Dodaj nowy wydział'
         >Dodaj nowy wydział (max 4)</button>
      </div>
   );
}

export default DepartmentsInject;