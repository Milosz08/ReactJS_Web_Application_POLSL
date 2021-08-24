/**
 * @file TypeAndPlatform.tsx
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
 * @date final version: 08/24/2021
 */

import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { FormDataAndValidateContext, FormDataAndValidateType } from '../../../../../../contextStore/FormDataAndValidateProvider';
import STATIC_OPTIONS from '../../../../../../constants/inputOptions';

const {
   typeAndPlatformContainer, addNewPZEmodule, someError, oneTypeContainer, removeInputField, selectArrowIcon,
   selectContainer
} = require('./AddChangeSubjectModal.module.scss');

/**
 * Komponent renderujący sekcję modala dodającego nowy przedmiot, która umożliwia dodanie linków do platformy.
 * Komponent pobiera dane ze stora przechowującego klasę walidującą oraz dane wprowadzane przez użytkownika w modalu.
 */
const TypeAndPlatform = (): JSX.Element => {

   const { TYPE_OPTIONS, PLATFORMS_OPTIONS } = STATIC_OPTIONS;

   const {
      classesPlatforms, setClassesPlatforms, classesPlatformsCount, setClassesPlatformsCount, errors, setErrors
   } = useContext<Partial<FormDataAndValidateType>>(FormDataAndValidateContext);

   const addNewValuePZEmodule = (): void => {
      if(classesPlatformsCount! < TYPE_OPTIONS.length) {
         setClassesPlatformsCount!((prevState: number) => prevState + 1);
         let updateArray = [...classesPlatforms!];
         updateArray.push({ type: 'Wykłady', place: 'Zoom', link: '' });
         setClassesPlatforms!(updateArray);
      }
   }

   const toggleClass = errors!.platform ? someError : '';

   const generatePZElinks = Array.from({ length: classesPlatformsCount! }, (v, i) => i).map((str, index) => {

      const handleChange = (target: any, typeInput: number): void => {
         let newStateArray = [...classesPlatforms!];
         switch(typeInput) {
            case 1:
               newStateArray[index].type = target.value;
               break;
            case 2:
               newStateArray[index].place = target.value;
               break;
            case 3:
               newStateArray[index].link = target.value;
               break;
            default:
               throw new Error('Type of input not exist');
         }
         setErrors!({ ...errors, platform: false });
         setClassesPlatforms!(newStateArray);
      }

      const handleRemoveField = () => {
         let newStateArray = [...classesPlatforms!];
         newStateArray.splice(index, 1);
         if(index !== -1) {
            setClassesPlatformsCount!((prevState: number) => prevState - 1);
            setClassesPlatforms!(newStateArray);
         }
      }

      const generateTypeOptions = TYPE_OPTIONS.map(option => (
         <option value = {option} key = {option}>{option}</option>
      ));
      const generatePlatformsOptions = PLATFORMS_OPTIONS.map(option => (
         <option value = {option} key = {option}>{option}</option>
      ));

      return (
         <div key = {index} className = {oneTypeContainer}>
            <div className = {selectContainer}>
               <select
                  value = {classesPlatforms![index].type}
                  onChange = {({ target }) => handleChange(target, 1)}
               >{generateTypeOptions}</select>
               <FontAwesomeIcon
                  icon = {['fas', 'chevron-down']}
                  className = {selectArrowIcon}
               />
            </div>
            <div className = {selectContainer}>
               <select
                  value = {classesPlatforms![index].place}
                  onChange = {({ target }) => handleChange(target, 2)}
               >{generatePlatformsOptions}</select>
               <FontAwesomeIcon
                  icon = {['fas', 'chevron-down']}
                  className = {selectArrowIcon}
               />
            </div>
            <input
               type = 'url'
               pattern = 'https://.*'
               placeholder = 'Link do Platformy Zdalej Edukacji'
               value = {classesPlatforms![index].link}
               onChange = {({ target }) => handleChange(target, 3)}
            />
            {index !== 0 && <button type = 'button' onClick = {handleRemoveField}>
               <FontAwesomeIcon
                  icon = {['fas', 'times']}
                  className = {removeInputField}
               />
            </button>}
         </div>
      );
   });

   return (
      <div className = {classnames(typeAndPlatformContainer, toggleClass)}>
         {generatePZElinks}
         <button
            type = 'button'
            className = {addNewPZEmodule}
            onClick = {addNewValuePZEmodule}
         >
            Dodaj nowy link (max {TYPE_OPTIONS.length})
         </button>
      </div>
   );
}

export default TypeAndPlatform;