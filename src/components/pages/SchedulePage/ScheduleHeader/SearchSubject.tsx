import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SheduleContext } from '../../../../contextStore/ScheduleProvider';

const { searchSubjectWrapper, removeInputField } = require('./../../../layouts/Subjects/SearchSubject.module.scss');

/**
 * Komponent generujący pole wyszukiwania przedmiotów na planie. Wartości inputów pobierane z kontekstu.
 */
const SearchSubject = () => {

   const { inputField, setInputField } = useContext<any>(SheduleContext);

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