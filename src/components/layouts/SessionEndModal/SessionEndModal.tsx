import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { GlobalModalsStateContext } from '../../../contextStore/GlobalModalsStateProvider';
import { CookiesObjectsContext } from '../../../contextStore/CookiesObjectsProvider';
import { LoginSessionContext } from '../../../contextStore/LoginSessionProvider';

import COOKIES_OBJECT from '../../../constants/allCookies';
import { MAX_INACTIVITY_TIME } from '../../additionalComponents/SessionActivityCount';

const {
   sessionWarningContainer, sessionWarningWrapper, show, active, timeContainer, fasIcon, countingInfo,
   buttonsContainer, stayLoggedButton, logoutButton, logoutInfo
} = require('./SessionEndModal.module.scss');

const LOGOUT_REMAIN_TIME = 30; //w sekundach
const DEFAULT_TITLE = 'Informatyka | Wydział Elektryczny POLSL';

/**
 *
 */
const SessionEndModal = () => {

   const { adminSessionInfo, setAdminSessionInfo } = useContext<any>(GlobalModalsStateContext);
   const { setAdminAuth } = useContext<any>(LoginSessionContext);
   const { removeCookie } = useContext<any>(CookiesObjectsContext);

   const [ classVisible, setClassVisible ] = useState<string>('');
   const [ containerVisible, setContainerVisible ] = useState<string>('');
   const [ iconPrefix, setIconPrefix ] = useState<any>('hourglass-start');
   const [ logoutCountdown, setLogoutCountdown ] = useState<number>(LOGOUT_REMAIN_TIME);

   const handleStayLogged = () => {
      document.title = DEFAULT_TITLE;
      setClassVisible('');
      setTimeout(() => setContainerVisible(''), 200);
      setAdminAuth(true);
      setAdminSessionInfo(false);
      setLogoutCountdown(LOGOUT_REMAIN_TIME);
   }

   const handleLogout = () => {
      document.title = DEFAULT_TITLE;
      setClassVisible('');
      setTimeout(() => setContainerVisible(''), 200);
      setAdminAuth(false);
      setAdminSessionInfo(false);
      setLogoutCountdown(LOGOUT_REMAIN_TIME);
      removeCookie(COOKIES_OBJECT.adminSession, { path: '/', sameSite: 'strict' });
      removeCookie(COOKIES_OBJECT.credentialsLevel, { path: '/', sameSite: 'strict' });
   }

   useEffect(() => {
      let index: NodeJS.Timeout;
      let logoutIndex: NodeJS.Timeout;
      let counter: number = 0;
      let toLogoutCounter: number = LOGOUT_REMAIN_TIME;
      const audio = new Audio(`${process.env.PUBLIC_URL}/audio/session-warning.mp3`);
      if(adminSessionInfo) {
         const hourglassAsyncAnimation = () => {
            counter++;
            switch(counter) {
               case 1:
                  setIconPrefix('hourglass-start');
                  break;
               case 2:
                  setIconPrefix('hourglass-half');
                  break;
               case 3:
                  setIconPrefix('hourglass-end');
                  counter = 0;
                  break;
            }
         }
         const logOutAsyncCounting = () => {
            if(toLogoutCounter % 5 === 0) {
               audio.play();
            }
            document.title = `Za ${toLogoutCounter} sekund nastąpi wylogowanie`;
            setLogoutCountdown(toLogoutCounter--);
            if(toLogoutCounter < 0) {
               handleLogout();
               clearInterval(index);
               clearInterval(logoutIndex);
            }
         }
         index = setInterval(hourglassAsyncAnimation, 1000);
         logoutIndex = setInterval(logOutAsyncCounting, 1000);
         setContainerVisible(show);
         setTimeout(() => setClassVisible(active), 200);
      }
      return () => {
         clearInterval(index);
         clearInterval(logoutIndex);
      }
   }, [adminSessionInfo]);

   return (
      <div className = {classnames(sessionWarningContainer, containerVisible, classVisible)}>
         <div className = {classnames(sessionWarningWrapper, classVisible)}>
            <div className = {timeContainer}>
               <FontAwesomeIcon
                  icon = {['fas', iconPrefix]}
                  className = {fasIcon}
               />
               <span className = {logoutInfo}>
                  Byłeś/byłaś nieaktywny/nieaktywna przez {MAX_INACTIVITY_TIME} minut. W celu ochrony
                  bezpieczeństwa systemu nastąpi automatyczne wylogowanie.
               </span>
               <span className = {countingInfo}>
                  Pozostało {logoutCountdown} sekund do automatycznego wylogowania z systemu.
               </span>
            </div>
            <div className = {buttonsContainer}>
               <button
                  className = {logoutButton}
                  onClick = {handleLogout}
               >Wyloguj</button>
               <button
                  className = {stayLoggedButton}
                  onClick = {handleStayLogged}
               >Pozostań na stronie</button>
            </div>
         </div>
      </div>
   );
}

export default SessionEndModal;