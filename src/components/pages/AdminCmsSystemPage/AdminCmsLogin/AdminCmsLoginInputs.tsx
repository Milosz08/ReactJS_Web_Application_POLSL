import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { inputCredentials, wrongData, showProtectedField, visibleIcon } = require('./AdminCmsLogin.module.scss');

interface PropsProvider {
   credentials: { login: string, password: string, token: string };
   setCredentials: Dispatch<SetStateAction<{ login: string, password: string, token: string }>>;
   errors: { login: boolean, password: boolean, token: boolean };
   setErrors: Dispatch<SetStateAction<{ login: boolean, password: boolean, token: boolean }>>;
   visible: { password: boolean, token: boolean };
   setVisible: Dispatch<SetStateAction<any>>;
}

/**
 * Komponent generujący pola wprowadzania loginu, hasła oraz tokena uwierzytelniającego w celu zalogowania do
 * systemu CMS. Komponent nie posiada walidacji. Za walidację wejść odpowiada komponent wyższego rzędu.
 *
 * @param credentials { object } - obiekt przechowujący login, hasło, token.
 * @param setCredentials { Dispatch<SetStateAction<object>> } - metoda ustawiająca parametry logowania.
 * @param errors { object } - błędy w loginie, haśle, tokenie.
 * @param setErrors { Dispatch<SetStateAction<object>> } - metoda ustawiająca błędy wprowadzanych danych.
 * @param visible { object } - widoczność wprowadzanych wartości w polu hasło/token.
 * @param setVisible { Dispatch<SetStateAction<object>> } - metoda ustawiająca widoczność wprowadzanych danych.
 */
const AdminCmsLoginInputs: React.FC<PropsProvider> = ({
   credentials, setCredentials, errors, setErrors, visible, setVisible,
}) => {

   const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      switch(target.placeholder.toLocaleLowerCase()) {
         case 'login':
            setCredentials({ ...credentials, login: target.value });
            setErrors({ ...errors, login: false });
            break;
         case 'hasło':
            setCredentials({ ...credentials, password: target.value });
            setErrors({ ...errors, password: false });
            break;
         case 'unikalny token uwierzytelniający*':
            setCredentials({ ...credentials, token: target.value });
            setErrors({ ...errors, token: false });
            break;
         default:
            throw new Error('Unexpected target placeholder token');
      }
   }

   return (
      <Fragment>
         <div className = {inputCredentials}>
            <input
               type = 'text'
               placeholder = 'Login'
               value = {credentials.login}
               onChange = {handleChangeInput}
               className = {(errors.login && wrongData).toString()}
            />
         </div>
         <div className = {inputCredentials}>
            <input
               type = {visible.password ? 'text' : 'password'}
               placeholder = 'Hasło'
               value = {credentials.password}
               onChange = {handleChangeInput}
               className = {(errors.password && wrongData).toString()}
            />
            <button
               className = {showProtectedField}
               type = 'button'
               onClick = {() => setVisible((prevState: any) => ({ ...setVisible, password: !prevState.password }))}
            >
               <FontAwesomeIcon
                  icon = {['fas', `${visible.password ? 'eye-slash' : 'eye'}`]}
                  className = {visibleIcon}
               />
            </button>
         </div>
         <div className = {inputCredentials}>
            <input
               type = {visible.token ? 'text' : 'password'}
               placeholder = 'Unikalny token uwierzytelniający*'
               value = {credentials.token}
               onChange = {handleChangeInput}
               className = {(errors.token && wrongData).toString()}
            />
            <button
               className = {showProtectedField}
               type = 'button'
               onClick = {() => setVisible((prevState: any) => ({ ...setVisible, token: !prevState.token }))}
            >
               <FontAwesomeIcon
                  icon = {['fas', `${visible.token ? 'eye-slash' : 'eye'}`]}
                  className = {visibleIcon}
               />
            </button>
         </div>
      </Fragment>
   );
}

export default AdminCmsLoginInputs;
