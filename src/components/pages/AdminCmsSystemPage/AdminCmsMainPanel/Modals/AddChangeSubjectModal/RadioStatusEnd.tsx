import React, { useContext } from 'react';

import { FormDataAndValidateContext } from '../../../../../../contextStore/FormDataAndValidateProvider';

const { radioContainer, singleRadio, radiomark } = require('./AddChangeSubjectModal.module.scss');

/**
 * Komponent renderujący do pola formularza (modala) pole typu radio do wyboru, czy wprowadzany/modyfikowany
 * przedmiot jest zakończony, czy dalej trwa.
 */
const RadioStatusEnd = () => {

   const { ifEnd, setIfEnd } = useContext<any>(FormDataAndValidateContext);

   const handleRadioButton = (index: number): void => {
      if(index === 0) {
         setIfEnd([false, true]);
      } else {
         setIfEnd([true, false]);
      }
   }

   const generateStatusRadioInputs = Array.from(['w trakcie', 'zakończony']).map((status, index) => (
      <div key = {status} className = {singleRadio}>
         <input
            checked = {!ifEnd[index]}
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