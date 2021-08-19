/**
 * @file SearchBox.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                uuid: "^8.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';

const { insertDataInputField } = require('./../Panels.module.scss');

/**
 * Constant representing the ID value of the input field
 */
const INPUT_ID = uuidv4();

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   inputField: string;
   setInputField: Dispatch<SetStateAction<string>>;
   placeholderProp: string;
}

/**
 * @details Component that renders a search field, where the state of the input is passed in props along with a function
 *          that changes this state and the value in the placeholder.
 *
 * @param inputField { string } - value in input.
 * @param setInputField { Dispatch<SetStateAction<string>> } - function that changes state in input field.
 * @param placeholderProp { string } - value in the placeholder.
 */
const SearchBox: React.FC<PropsProvider> = ({ inputField, setInputField, placeholderProp }): JSX.Element => {
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