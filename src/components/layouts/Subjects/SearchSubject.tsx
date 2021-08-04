import React, { Fragment, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubjectsProvider } from "./Subjects";

import SubjectsTiles from "./SubjectsTiles";

const {
   searchSubjectWrapper,  removeInputField, subjectsWrapper, emptyIcon, emptySubjectField
} = require('./Subjects.module.scss');

interface PropsProvider {
   state: number;
   input: string;
   setInput: Dispatch<SetStateAction<string>>
   setState: Dispatch<SetStateAction<number>>;
   filteredArray: Array<SubjectsProvider>;
}

/**
 * Komponent generujący pole do wyszukania przedmiotu, oraz wyświetlający rezultat wyszukanego przedmiotu.
 * Jeśli przedmiot nie istnieje (pusta tablica), komponent generuje komunikat.
 *
 * @param state { number } - indeks aktualnie wyświetlanego przedmiotu.
 * @param setState { Dispatch<SetStateAction<number>> } - funkcja zmieniająca aktualnie wyświetlający przedmiot.
 * @param filteredArray { Array<SubjectsProvider> } - tablica wszystkich przedmiotów
 * @param input { string } - wartość wprowadzana do pola input.
 * @param setInput { Dispatch<SetStateAction<number>> } - funkcja aktualizująca wartość pola input.
 */
const SearchSubject: React.FC<PropsProvider> = ({ state, setState, filteredArray, input, setInput }) => {

   const ifSubjectExists = filteredArray.length !== 0 ? (
      <div className={subjectsWrapper}>
         <SubjectsTiles
            state = {state}
            setState = {setState}
            filteredArray = {filteredArray}
         />
      </div>
   ) : (
      <div className = {emptySubjectField}>
         <FontAwesomeIcon
            icon = {['fas', 'exclamation-circle']}
            className = {emptyIcon}
         />
         <span>Nie znalazłem szukanego przemiotu.</span>
      </div>
   );

   const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setState(0);
      setInput(target.value);
   }

   return (
      <Fragment>
         <aside className = {searchSubjectWrapper}>
            <label htmlFor = 'searchSubject'>
               <input
                  type = 'text'
                  placeholder = 'Wyszukaj przedmiot'
                  value = {input}
                  onChange = {handleInput}
                  id = 'searchSubject'
               />
               <button onClick = {() => setInput('')}>
                  <FontAwesomeIcon
                     icon = {['fas', 'trash-alt']}
                     className = {removeInputField}
                  />
               </button>
            </label>
         </aside>
         {ifSubjectExists}
      </Fragment>
   );
}

export default SearchSubject;