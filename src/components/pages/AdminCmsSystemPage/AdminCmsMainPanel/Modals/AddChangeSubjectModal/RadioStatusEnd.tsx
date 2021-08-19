/**
 * @file RadioStatusEnd.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext } from 'react';
import { FormDataAndValidateContext, FormDataAndValidateType } from '../../../../../../contextStore/FormDataAndValidateProvider';

const { radioContainer, singleRadio, radiomark } = require('./AddChangeSubjectModal.module.scss');

/**
 * @details A rendering component to a form field (modala) a radio type field to select whether the entered/modified
 *          item is completed or continues.
 */
const RadioStatusEnd = (): JSX.Element => {

   const { ifEnd, setIfEnd } = useContext<Partial<FormDataAndValidateType>>(FormDataAndValidateContext);

   const handleRadioButton = (index: number): void => {
      if(index === 0) {
         setIfEnd!([false, true]);
      } else {
         setIfEnd!([true, false]);
      }
   }

   const generateStatusRadioInputs = Array.from(['w trakcie', 'zakończony']).map((status, index) => (
      <div key = {status} className = {singleRadio}>
         <input
            checked = {!ifEnd![index]}
            type = 'radio'
            id = {status}
            name = 'subjectsStatus'
            value = {status}
            onChange = {() => handleRadioButton(index)}
         />
         <label htmlFor = {status}>
            {status}
         </label>
         <div className = {radiomark}/>
      </div>
   ));

   return (
      <div className = {radioContainer}>
         {generateStatusRadioInputs}
      </div>
  );
}

export default RadioStatusEnd;