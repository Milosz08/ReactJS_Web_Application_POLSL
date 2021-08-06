import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../../helpers/request';
import { AES, enc } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../layouts/Header/Header';
import CurrentURLpath from '../../layouts/CurrentURLpath/CurrentURLpath';

import COOKIES_OBJECT from '../../../constants/allCookies';

const { userLoginContainer, userLoginWrapper, loginInfo } = require('./AidsPage.module.scss');
const {
   userCredentials, inputCredentials, showProtectedField, visibleIcon, onSubmitCSS, wrongData, authenticationHeader
} = require('./../AdminCmsSystemPage/AdminCmsLogin/AdminCmsLogin.module.scss');

const COOKIE_ID = uuidv4();

interface PropsProvider {
   setAuth: (value: boolean) => boolean;
   handleCookie: any;
}

interface CredentialsProvider {
   login: string;
   password: string;
   token: string;
}

interface ErrorsProvider {
   login: boolean;
   password: boolean;
}

/**
 * Komponent generujący pole autentykacji (logowania) użytkownika. Komponent posiada walidację wprowadzanych danych,
 * oraz po naciśnięciu przycisku submit, dane te są wysyłane w formie zapytania do API. Jeśli dane wysłane do API
 * są między sobą zgodne, następuje przekierowanie. Logowanie jest aktywnie przez jedną sesję przeglądarki (do
 * jej zamknięcia lub ręcznego wylogowania z systemu).
 *
 * @param setAuth { (value: boolean) => boolean } - ustawianie autnetykacji (true -> jest, false -> nie ma)
 * @param handleCookie { any } - funkcja usuwania/dodawania obiektu Cookie.
 */
const AidsLogin: React.FC<PropsProvider> = ({ setAuth, handleCookie }) => {

   const [ login, setLogin ] = useState<string>('');
   const [ password, setPassword ] = useState<string>('');
   const [ passVisible, setPassVisible ] = useState<boolean>(false);
   const [ credentialsHash, setCredentialsHash ] = useState<CredentialsProvider>({
      login: '', password: '', token: ''
   });
   const [ errors, setErrors ] = useState<ErrorsProvider>({ login: false, password: false });

   const checkAuthentication = (): { loginBool: boolean, passwordBool: boolean } => {
      let loginBool = false, passwordBool = false;

      const decrLogin = AES.decrypt(credentialsHash.login, credentialsHash.token).toString(enc.Utf8);
      const decrPassword = AES.decrypt(credentialsHash.password, credentialsHash.token).toString(enc.Utf8);

      if(decrLogin !== login) {
         loginBool = true;
      }
      if(decrPassword !== password) {
         passwordBool = true;
      }
      return {
         loginBool, passwordBool
      }
   }

   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const { loginBool, passwordBool } = checkAuthentication();
      if(!loginBool && !passwordBool) {
         setAuth(true);
         handleCookie(COOKIES_OBJECT.userSession, COOKIE_ID, { path: '/', sameSite: 'strict' });
         setLogin('');
         setPassword('');
      } else {
         setErrors({ login: loginBool, password: passwordBool });
         if(loginBool) {
            setLogin('');
         }
         if(passwordBool) {
            setPassword('');
         }
      }
      setPassVisible(false);
   }

   const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
      switch(target.placeholder.toLocaleLowerCase()) {
         case 'login':
            setLogin(target.value);
            setErrors({ ...errors, login: false });
            break;
         case 'hasło':
            setPassword(target.value);
            setErrors({ ...errors, password: false });
            if(!target.value) { setPassVisible(false); }
            break;
         default: throw new Error('Unexpected target placeholder token');
      }
   }

   useEffect(() => {
      const fetchData = async () => {
         const { data } = await axiosInstance.get('authentication');
         const { login, password, token } = data.find((authField: any) => authField.role === 0);
         setCredentialsHash({ login, password, token });
      }
      fetchData();
   }, []);

   return (
      <Fragment>
         <CookiesNotification/>
         <Header ifHeaderHasRedBar = {true}/>
         <CurrentURLpath ifImportatHeaderActive = {true}/>
         <div className = {userLoginContainer}>
            <div className = {userLoginWrapper}>
               <p className = {loginInfo}>
                  Dostęp do tej sekcji wymaga autentykacji. Zaloguj się przy pomocy loginu oraz hasła. Jeśli nie
                  znasz swojego hasła, skontaktuj się z głównym administratorem systemu. Aktywne zalogowanie do
                  systemu trwa jedną sesję (do momentu zamknięcia przeglądarki) lub do manulalnego wylogowania z
                  systemu.
               </p>
               <h3 className = {authenticationHeader}>Logowanie do systemu</h3>

               <form className = {userCredentials} onSubmit = {handleFormSubmit}>
                  <div className = {inputCredentials}>
                     <input
                        type = 'text'
                        value = {login}
                        onChange = {handleChangeInput}
                        placeholder = 'Login'
                        className = {errors.login ?  wrongData : ''}
                     />
                  </div>
                  <div className = {inputCredentials}>
                     <input
                        type = {passVisible ? 'text': 'password'}
                        value = {password}
                        onChange = {handleChangeInput}
                        placeholder = 'Hasło'
                        className = {errors.password ?  wrongData : ''}
                     />
                     <button
                        type = 'button'
                        title = {!passVisible ? 'Pokaż hasło' : 'Ukryj hasło'}
                        onClick = {() => password ? setPassVisible(prevState => !prevState) : null}
                        className = {showProtectedField}
                     >
                        <FontAwesomeIcon
                           icon = {['fas', `${passVisible ? 'eye-slash' : 'eye'}`]}
                           className = {visibleIcon}
                        />
                     </button>
                  </div>
                  <button
                     className = {onSubmitCSS}
                  >Zaloguj</button>
               </form>
            </div>
         </div>
      </Fragment>
   );
}

export default AidsLogin;