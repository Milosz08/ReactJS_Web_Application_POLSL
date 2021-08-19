/**
 * @file GenerateAuthFields.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { ChangeEvent, Dispatch, SetStateAction, Fragment } from 'react';
import ShowHideAuthVisible from './ShowHideAuthVisible';

const { passwordField, errorValue } = require('./../HomePanel.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   newCredent: {
      login: string;
      passwords: any[];
   };
   setNewCredent: Dispatch<SetStateAction<{ login: string, passwords: any[] }>>;
   errors: {
      [value: string]: boolean;
   };
   setErrors: Dispatch<SetStateAction<{ [value: string]: boolean }>>;
}

/**
 * @details Component that generates fields for entering new authentication data of a user / moderator's account
 *          (available only from authentication level 2 - superadministrator (main system administrator)).
 *
 * @param newCredent { string object } - new login/password/token.
 * @param setNewCredent { Dispatch<SetStateAction<object>> } - function that sets a new login/password/token.
 * @param errors { boolean object } - an object that stores errors when entering values into edit fields.
 * @param setErrors { Dispatch<SetStateAction<object>> } - a function that sets errors in field values.
 */
const GenerateAuthField: React.FC<PropsProvider> = ({ newCredent, setNewCredent, errors, setErrors }): JSX.Element => {

   const generatePasswordsFields = newCredent.passwords.map((password: any, index: number) => {
      const copy = [...newCredent.passwords];
      const indexOfArray = copy.findIndex(copyArray => copyArray === password);

      const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>): void => {
         copy[indexOfArray].value = target.value;
         if(target.placeholder.includes('ponownie')) {
            setErrors({ ...errors, passNotMath: false });
         } else {
            setErrors({ ...errors, password: false });
         }
         setNewCredent({ ...newCredent, passwords: copy });
      }

      const handleChangeVisibility = (): void => {
         if(copy[indexOfArray].value !== '') {
            copy[indexOfArray].ifVisible = !copy[indexOfArray].ifVisible;
            setNewCredent({ ...newCredent, passwords: copy });
         }
      }

      return (
         <div className = {passwordField} key = {password.id}>
            <input
               type = {password.ifVisible ? 'text' : 'password'}
               placeholder = {`Wprowadź ${index !== 0 ? 'ponownie' : ''} nowe hasło`}
               value = {password.value}
               onChange = {handleChangeInput}
               className = {index === 0 ? (errors.password ? errorValue : '') : (errors.passNotMath ? errorValue : '')}
            />
            <ShowHideAuthVisible
               handleVisible = {handleChangeVisibility}
               ifVisible = {password.ifVisible}
            />
         </div>
      );
   });

   return (
      <Fragment>
         {generatePasswordsFields}
      </Fragment>
   );
}

export default GenerateAuthField;