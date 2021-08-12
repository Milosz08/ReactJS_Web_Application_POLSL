import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from 'uuid';

const { insertDataInputField } = require('./../Panels.module.scss');

const INPUT_ID = uuidv4();

interface PropsProvider {
   inputField: string;
   setInputField: Dispatch<SetStateAction<string>>;
   placeholderProp: string;
}

/**
 * Komponent renderujący polę wyszukiwania, gdzie w propsach przekazywane są stan inputa wraz z funkcją zmieniającą
 * ten stan oraz wartość w placeholderze.
 *
 * @param inputField { string } - wartość w inpucie.
 * @param setInputField { Dispatch<SetStateAction<string>> } - funkcja zmieniająca stan w inpucie.
 * @param placeholderProp { string } - wartość w placeholderze.
 */
const SearchBox: React.FC<PropsProvider> = ({ inputField, setInputField, placeholderProp }) => {
   return (
      <label
         htmlFor = {`${placeholderProp}__id_${INPUT_ID}`}
         className = {insertDataInputField}
      >
         <div>
            <input
               type = 'text'
               placeholder = {placeholderProp}
               value = {inputField}
               onChange = {({ target }) => setInputField(target.value)}
               id = {`${placeholderProp}__id_${INPUT_ID}`}
            />
            <button
               onClick = {() => setInputField('')}
               title = 'Wyczyść pole'
            >
               <FontAwesomeIcon
                  icon = {['fas', 'trash-alt']}
               />
            </button>
         </div>
      </label>
   );
}

export default SearchBox;