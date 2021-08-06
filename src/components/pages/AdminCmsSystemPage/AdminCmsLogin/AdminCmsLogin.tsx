import React, { Fragment, useState, useEffect } from 'react';
import axiosInstance from '../../../../helpers/request';
import { AES, enc } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

import CookiesNotification from "../../../layouts/CookiesNotification/CookiesNotification";
import Header from "../../../layouts/Header/Header";
import CurrentURLpath from "../../../layouts/CurrentURLpath/CurrentURLpath";

import COOKIES_OBJECT from "../../../../constants/allCookies";
import AdminCmsLoginInputs from "./AdminCmsLoginInputs";

const {
   adminLoginWrapper, adminLoginContainer, adminCredentials, onSubmitCSS, infoAboutToken, poweredBy,
   authenticationHeader
} = require('./AdminCmsLogin.module.scss');

const COOKIE_ID = uuidv4();

interface PropsProvider {
   setAuth: (value: boolean) => boolean;
   handleCookie: any;
}

interface StateProvider {
   login: string;
   password: string;
   token: string;
}

interface ErrorsProvider {
   login: boolean;
   password: boolean;
   token: boolean;
}

interface HashProvider {
   _id: string;
   role: number;
   login: string;
   password: string;
   token: string;
   adminToken: string;
   __v: number;
}

/**
 *
 * @param setAuth
 * @param handleCookie
 */
const AdminCmsLogin: React.FC<PropsProvider> = ({ setAuth, handleCookie }) => {

   const [ credentials, setCredentials ] = useState<StateProvider>({ login: '', password: '', token: '' });
   const [ errors, setErrors ] = useState<ErrorsProvider>({ login: false, password: false, token: false });

   const [ visible, setVisible ] = useState<{ password: boolean, token: boolean }>({ password: false, token: false });
   const [ credentialsHash, setCredentialsHash ] = useState<Array<HashProvider>>([]);

   const checkAuthentication = (): { loginBool: boolean, passwordBool: boolean, tokenBool: boolean } => {
      let loginBool = false, passwordBool = false, tokenBool = false;
      let decryptArray: Array<string> = [];

      credentialsHash.forEach(object => {
         const decrLogin = AES.decrypt(object.login, object.token).toString(enc.Utf8);
         decryptArray.push(decrLogin);
         const decrPassword = AES.decrypt(object.password, object.token).toString(enc.Utf8);
         decryptArray.push(decrPassword);
         const decrToken = AES.decrypt(object.adminToken, object.token).toString(enc.Utf8);
         decryptArray.push(decrToken);
      });

      if(credentials.login === decryptArray[0]) {
         handleCookie(COOKIES_OBJECT.credentialsLevel, 1, { path: '/', sameSite: 'strict' });
      } else if(credentials.login === decryptArray[3]) {
         handleCookie(COOKIES_OBJECT.credentialsLevel, 2, { path: '/', sameSite: 'strict' });
      }

      if(credentials.login !== decryptArray[0] && credentials.login !== decryptArray[3]) {
         loginBool = true;
      }
      if(credentials.password !== decryptArray[1] && credentials.password !== decryptArray[4]) {
         passwordBool = true;
      }
      if(credentials.token !== decryptArray[2] && credentials.token !== decryptArray[5]) {
         tokenBool = true;
      }

      return { loginBool, passwordBool, tokenBool };
   }

   const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const { loginBool, passwordBool, tokenBool } = checkAuthentication();
      if(!loginBool && !passwordBool && !tokenBool) {
         setAuth(true);
         setCredentialsHash([]);
         handleCookie(COOKIES_OBJECT.adminSession, COOKIE_ID, { path: '/', sameSite: 'strict' });
         setCredentials({ login: '', password: '', token: '' });
      } else {
         setErrors({ login: loginBool, password: passwordBool, token: tokenBool });
         if(loginBool) {
            setCredentials({ ...credentials, login: '' });
         }
         if(passwordBool) {
            setCredentials({ ...credentials, password: '' });
         }
         if(tokenBool) {
            setCredentials({ ...credentials, token: '' });
         }
      }
      setVisible({ password: false, token: false });
   }

   useEffect(() => {
      const fetchData = async () => {
         const { data } = await axiosInstance.get('authentication');
         const authArray = data.filter((authField: any) => authField.role !== 0);
         setCredentialsHash(authArray);
      }
      fetchData();
   }, []);

   return (
      <Fragment>
         <CookiesNotification/>
         <Header ifHeaderHasRedBar = {false}/>
         <CurrentURLpath ifImportatHeaderActive = {false}/>
         <div className = {adminLoginContainer}>
            <div className = {adminLoginWrapper}>
               <h3 className = {authenticationHeader}>Logowanie do systemu CMS</h3>
               <form className = {adminCredentials} onSubmit = {handleOnSubmit}>
                  <AdminCmsLoginInputs
                     credentials = {credentials}
                     setCredentials = {setCredentials}
                     errors = {errors}
                     setErrors = {setErrors}
                     visible = {visible}
                     setVisible = {setVisible}
                  />
                  <button className = {onSubmitCSS}>Zaloguj</button>
                  <aside className = {infoAboutToken}>
                     * W celu pozyskania unikalnego tokenu uwierzytelniającego skontaktuj się z głównym
                     administratorem systemu.
                  </aside>
               </form>
               <div className = {poweredBy}>
                  <img src = {`${process.env.PUBLIC_URL}/images/strapi.png`} alt = 'strapi'/>
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default AdminCmsLogin;