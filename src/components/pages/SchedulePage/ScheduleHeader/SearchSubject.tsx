/**
 * @file SearchSubject.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ScheduleContext } from '../../../../contextStore/ScheduleProvider';

const { searchSubjectWrapper, removeInputField } = require('./../../../layouts/Subjects/Subjects.module.scss');

/**
 * Komponent generujący pole wyszukiwania przedmiotów na planie. Wartości inputów pobierane z kontekstu.
 */
const SearchSubject = (): JSX.Element => {

   const { inputField, setInputField } = useContext<any>(ScheduleContext);

   return (
      <aside className = {searchSubjectWrapper}>
         <label htmlFor = 'searchSubject'>
            <input
               type = 'text'
               placeholder = 'Wyszukaj przedmiot'
               value = {inputField}
               onChange = {({ target }) => setInputField(target.value)}
               id = 'searchSubject'
            />
            <button
               onClick = {() => setInputField('')}
               title = 'Wyczyść pole'
            >
               <FontAwesomeIcon
                  icon = {['fas', 'trash-alt']}
                  className = {removeInputField}
               />
            </button>
         </label>
      </aside>
   );
}

export default SearchSubject;