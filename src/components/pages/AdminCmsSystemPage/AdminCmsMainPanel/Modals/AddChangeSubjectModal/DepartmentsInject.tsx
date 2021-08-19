/**
 * @file DepartmentsInject.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { FormDataAndValidateContext, FormDataAndValidateType } from '../../../../../../contextStore/FormDataAndValidateProvider';

const {
   departmentsContainer, addNewDepartment, someError, removeInputField, inputContainer
} = require('./AddChangeSubjectModal.module.scss');

/**
 * @details Component rendering the possibility of introducing a new faculty/editing already entered faculties where classes
 *          are held (to the modal with the form in the administrator's CMS panel - the panel for adding/editing subjects).
 */
const DepartmentsInject = (): JSX.Element => {

   const {
      departments, setDepartments, departmentsCount, setDepartmentsCount, errors, setErrors
   } = useContext<Partial<FormDataAndValidateType>>(FormDataAndValidateContext);

   const addNewValueDepartment = () => {
      if(departmentsCount! < 4) {
         setDepartmentsCount!((prevState: number) => prevState + 1);
         let updateArray = [...departments!];
         updateArray.push('');
         setDepartments!(updateArray);
      }
   }

   const toggleClass = errors!.department ? someError : ''
   const generateDepartmentsInputs = Array.from({ length: departmentsCount! }, (v, i) => i).map((str, index) => {

      const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
         let newStateArray = [...departments!];
         newStateArray[index] = target.value;
         setErrors!({ ...errors, department: false });
         setDepartments!(newStateArray);
      }

      const handleRemoveField = () => {
         let newStateArray = [...departments!];
         newStateArray.splice(index, 1);
         if(index !== -1) {
            setDepartmentsCount!((prevState: number) => prevState - 1);
            setDepartments!(newStateArray);
         }
      }

      return (
         <div key = {index} className = {inputContainer}>
            <input
               type = 'text'
               key = {index}
               value = {departments![index]}
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