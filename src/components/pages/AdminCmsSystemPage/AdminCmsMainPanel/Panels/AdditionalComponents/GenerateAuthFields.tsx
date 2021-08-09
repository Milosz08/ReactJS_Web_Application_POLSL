import React, { ChangeEvent, Dispatch, SetStateAction, Fragment } from 'react';

import ShowHideAuthVisible from "./ShowHideAuthVisible";

const { passwordField, errorValue } = require('./../HomePanel.module.scss');

interface PropsProvider {
   newCredent: any;
   setNewCredent: Dispatch<SetStateAction<any>>;
   errors: any;
   setErrors: Dispatch<SetStateAction<any>>;
}

/**
 * Komponent generujący pola do wprowadzania nowych danych autentykacji konta usera/konta moderatora (dostępne
 * tylko z poziomu autentykacji 2 - superadministrator (główny administrator systemu)).
 *
 * @param newCredent { string object } - nowy login/hasło/token.
 * @param setNewCredent { Dispatch<SetStateAction<object>> } - funkcja ustawiająca nowy login/hasło/token.
 * @param errors { boolean object } - obiekt przechowujący błędy przy wpisywaniu wartości do pól edycyjnych.
 * @param setErrors { Dispatch<SetStateAction<object>> } - funkcja ustawiająca błędy wartości pól.
 */
const GenerateAuthField: React.FC<PropsProvider> = ({ newCredent, setNewCredent, errors, setErrors }) => {

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