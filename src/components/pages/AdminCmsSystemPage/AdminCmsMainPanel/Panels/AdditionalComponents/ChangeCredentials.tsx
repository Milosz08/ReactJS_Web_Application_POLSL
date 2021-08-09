import React, { ChangeEvent, useEffect, useState } from 'react';
import CryptoJS, { AES, enc } from 'crypto-js';
import axiosInstance from '../../../../../../helpers/request';
import { v4 as uuidv4 } from 'uuid';

import ShowHideAuthVisible from './ShowHideAuthVisible';
import GenerateAuthFields from './GenerateAuthFields';

const {
   changeCredentialsForm, loginField, confirmViaAdminPasswordField, inputNewAdminToken, errorValue, submitForm
} = require('./../HomePanel.module.scss');

interface PropsProvider {
   ifUser: boolean;
   disableButton: boolean;
}

interface CredentialsStateProvider {
   ifVisible: boolean;
   value: string;
}

interface HashProvider {
   password: string;
   token: string;
}

interface ErrorsProvider {
   login: boolean;
   password: boolean;
   passNotMath: boolean;
   token: boolean;
   notValidAdminPass: boolean;
}

/**
 * Komponent umożliwiający zmianę autentykacji dla kont administratorów, moderatorów treści oraz użytkowników.
 * Komponent aktywny tylko dla administratorów klasy 2 (najwyższy stopień, główny administrator systemu).
 * Komponent łączy się z bazą danych, wysyła jej nowe hasła uwcześniej je szyfrując metodą AES wraz z każdorazowym
 * ustawianiem sekretnego klucza 512 bitowego na podstawie hasła.
 *
 * @param ifUser { boolean } - flaga, mówiąca o tym, czy komponent działa dla użytkownika czy administratora.
 * @param disableButton { boolean } - flaga ustawiająca włączenie/wyłączenie przycisku wysłania formularza.
 */
const ChangeCredentials: React.FC<PropsProvider> = ({ ifUser, disableButton }) => {

   const [ newCredent, setNewCredent ] = useState<{ login: string, passwords: Array<any> }>({
      login: '',
      passwords: Array.from({ length: 2 }, () => ({ id: uuidv4(), ifVisible: false, value: '' })),
   });
   const [ confirmViaAdmin, setConfirmViaAdmin ] = useState<CredentialsStateProvider>({ ifVisible: false, value: '' });
   const [ adminToken, setAdminToken ] = useState<CredentialsStateProvider>({ ifVisible: false, value: '' });
   const [ adminCredHash, setAdminCredHash ] = useState<HashProvider>({ password: '', token: '' });
   const [ errors, setErrors ] = useState<ErrorsProvider>({
      login: false, password: false, passNotMath: false, token: false, notValidAdminPass: false,
   });

   const handleConfirmViaAdminVisible = (): void => {
      if(confirmViaAdmin.value !== '') {
         setConfirmViaAdmin(prevState => ({ ...confirmViaAdmin, ifVisible: !prevState.ifVisible }));
      }
   }

   const handleTokenVisible = (): void => {
      if(adminToken.value !== '') {
         setAdminToken(prevState => ({ ...adminToken, ifVisible: !prevState.ifVisible }))
      }
   }

   const validateData = () => {
      let loginBool = false, passBool = false, passNotMathBool = false, tokenBool = false;
      const { login, passwords } = newCredent;
      const { value } = adminToken;
      if(login.length < 5 || login.length > 20 || login.indexOf(' ') >= 0) {
         loginBool = true;
      }
      if(passwords[0].value.length < 5 || passwords[0].value.length > 20 || passwords[0].value.indexOf(' ') >= 0) {
         passBool = true;
      }
      if(passwords[0].value !== passwords[1].value) {
         passNotMathBool = true;
      }
      if(!ifUser && (value.length < 5 || value.length > 20 || value.indexOf(' ') >= 0)) {
         tokenBool = true;
      }
      return { loginBool, passBool, passNotMathBool, tokenBool };
   }

   const sendChangeCredentials = async () => {
      const { REACT_APP_ADMIN_ID, REACT_APP_USER_ID } = process.env;

      const salt = CryptoJS.lib.WordArray.random(128 / 8);
      const key512bits = CryptoJS.PBKDF2(newCredent.passwords[0].value, salt, { keySize: 512 / 32 })
      const hashKey = key512bits.toString(enc.Hex);

      const cryptLogin = AES.encrypt(newCredent.login, hashKey).toString();
      const cryptPassword = AES.encrypt(newCredent.passwords[0].value, hashKey).toString();

      if(!ifUser) { //administrator (ranga 1)
         const cryptAdminToken = AES.encrypt(adminToken.value, hashKey).toString();
         await axiosInstance.put(`authentication/${REACT_APP_ADMIN_ID}`, {
            role: 1, login: cryptLogin, password: cryptPassword, token: hashKey, adminToken: cryptAdminToken
         });
      } else { //użytkownik (ranga 0)
         await axiosInstance.put(`authentication/${REACT_APP_USER_ID}`, {
            role: 0, login: cryptLogin, password: cryptPassword, token: hashKey
         });
      }
   }

   const handleSubmitSendCredentials = (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const decrAdminPassword = AES.decrypt(adminCredHash.password, adminCredHash.token).toString(enc.Utf8);
      const { loginBool, passBool, passNotMathBool, tokenBool } = validateData();
      let notValidAdminPassBool = false;
      if(confirmViaAdmin.value !== decrAdminPassword) { notValidAdminPassBool = true; }

      if(!loginBool && !passBool && !passNotMathBool && !tokenBool && !notValidAdminPassBool) {
         sendChangeCredentials();
         setNewCredent({ ...newCredent, login: '' });
         setNewCredent({ ...newCredent,
            passwords: Array.from({ length: 2 }, () => ({ id: uuidv4(), ifVisible: false, value: '' }))
         });
         setConfirmViaAdmin({ ...confirmViaAdmin, value: '' });
         setAdminToken({ ...adminToken, value: '' });
      } else {
         setErrors({
            login: loginBool, password: passBool, passNotMath: passNotMathBool,
            token: tokenBool, notValidAdminPass: notValidAdminPassBool,
         });
      }
   }

   const handleInputs = ({ target }: ChangeEvent<HTMLInputElement>) => {
      switch(target.placeholder.toLocaleLowerCase()) {
         case 'nowy login':
            setNewCredent({ ...newCredent, login: target.value });
            setErrors({ ...errors, login: false });
            break;
         case 'nowy token':
            setAdminToken({ ...adminToken, value: target.value });
            setErrors({ ...errors, token: false });
            break;
         case 'potwierdź hasłem':
            setConfirmViaAdmin({ ...confirmViaAdmin, value: target.value });
            setErrors({ ...errors, notValidAdminPass: false });
            break;
         default: throw new Error('Unexpected input placeholder value');
      }
   }

   useEffect(() => {
      const fetchCredentials = async () => {
         const { data } = await axiosInstance.get('authentication');
         const { password, token } = data.find((authField: any) => authField.role === 2);
         setAdminCredHash({ password, token });
      }
      fetchCredentials();
   }, []);

   return (
      <form className = {changeCredentialsForm} onSubmit = {handleSubmitSendCredentials}>
         <h3>Zmiana poświadczeń dla konta {ifUser ? 'użytkownika' : 'administratora'}</h3>
         <div className = {loginField}>
            <input
               type = 'text'
               placeholder = 'Nowy login'
               value = {newCredent.login}
               onChange = {handleInputs}
               className = {errors.login ? errorValue : ''}
            />
         </div>
         <GenerateAuthFields
            newCredent = {newCredent}
            setNewCredent = {setNewCredent}
            errors = {errors}
            setErrors = {setErrors}
         />
         {!ifUser && <div className = {inputNewAdminToken}>
            <input
               type = {adminToken.ifVisible ? 'text' : 'password'}
               placeholder = 'Nowy token'
               value = {adminToken.value}
               onChange = {handleInputs}
               className = {errors.token ? errorValue : ''}
            />
            <ShowHideAuthVisible
               handleVisible = {handleTokenVisible}
               ifVisible = {adminToken.ifVisible}
            />
         </div>}
         <p>W celu dodatkowej autentykacji wprowadź hasło głównego administratora:</p>
         <div className = {confirmViaAdminPasswordField}>
            <input
               type = {confirmViaAdmin.ifVisible ? 'text' : 'password'}
               placeholder = 'Potwierdź hasłem'
               value = {confirmViaAdmin.value}
               onChange = {handleInputs}
               className = {errors.notValidAdminPass ? errorValue : ''}
            />
            <ShowHideAuthVisible
               handleVisible = {handleConfirmViaAdminVisible}
               ifVisible = {confirmViaAdmin.ifVisible}
            />
         </div>
         <button
            className = {submitForm}
            disabled = {disableButton}
         >
            Zatwierdź
         </button>
      </form>
   );
}

export default ChangeCredentials;