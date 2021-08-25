/**
 * @file SearchSubject.tsx
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

import React, { Fragment, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubjectsProvider } from './Subjects';

const SubjectsTiles = React.lazy(() => import('./SubjectsTiles'));

const {
   searchSubjectWrapper,  removeInputField, subjectsWrapper, emptyIcon, emptySubjectField
} = require('./Subjects.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   state: number;
   input: string;
   setInput: Dispatch<SetStateAction<string>>
   setState: Dispatch<SetStateAction<number>>;
   filteredArray: SubjectsProvider[];
}

/**
 * @details Component that generates an item search field and displays the result of the item found. If the item
 *          does not exist (empty array), the component issues a message.
 *
 * @param state { number } - index of the currently displayed subject.
 * @param setState { Dispatch<SetStateAction<number>> } - function that changes the currently displaying subject.
 * @param filteredArray { SubjectsProvider[] } - array of all subjects.
 * @param input { string } - the value entered into the input field.
 * @param setInput { Dispatch<SetStateAction<number>> } - function that updates the value of the input field.
 */
const SearchSubject: React.FC<PropsProvider> = ({ state, setState, filteredArray, input, setInput }): JSX.Element => {

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