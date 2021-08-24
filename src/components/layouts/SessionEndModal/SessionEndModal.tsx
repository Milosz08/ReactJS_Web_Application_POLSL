/**
 * @file SessionEndModal.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactDelayLink: "^1.1.6"
 *                ReactCSSmodules: "^4.7.11"
 *                classnames: "^2.3.1"
 *
 * @date final version: 08/24/2021
 */

import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { GlobalModalsStateContext, GlobalModalsStateTypes } from '../../../contextStore/GlobalModalsStateProvider';
import { LoginSessionContext, LoginSessionProviderTypes } from '../../../contextStore/LoginSessionProvider';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../contextStore/CookiesObjectsProvider';

import COOKIES_OBJECT from '../../../constants/allCookies';
import ROUTING_PATH_NAMES from "../../../constants/routingPathNames";
import { MAX_INACTIVITY_TIME } from '../CredentialsSequencers/SessionActivityCount';

const {
   sessionWarningContainer, sessionWarningWrapper, show, active, timeContainer, fasIcon, countingInfo,
   buttonsContainer, stayLoggedButton, logoutButton, logoutInfo
} = require('./SessionEndModal.module.scss');

/**
 * Constant describing the time remaining until automatic logout from the system (active modal) in seconds.
 */
const LOGOUT_REMAIN_TIME = 30;

/**
 * A constant that describes the default SPA page title
 */
const DEFAULT_TITLE = ROUTING_PATH_NAMES.START_PAGE;

/**
 * @details Component generating a modal informing the user / administrator about the end of an active session (no activity on
 *          the page). It allows you to log out manually or stay logged in. If the user does not show the action, after some
 *          time in the variable "LOGOUT_REMAIN_TIME", he will be automatically logged out of the system.
 */
const SessionEndModal = (): JSX.Element => {

   const { adminSessionInfo, setAdminSessionInfo } = useContext<Partial<GlobalModalsStateTypes>>(GlobalModalsStateContext);
   const { setAdminAuth } = useContext<Partial<LoginSessionProviderTypes>>(LoginSessionContext);
   const { removeCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);

   const [ classVisible, setClassVisible ] = useState<string>('');
   const [ containerVisible, setContainerVisible ] = useState<string>('');
   const [ iconPrefix, setIconPrefix ] = useState<any>('hourglass-start');
   const [ logoutCountdown, setLogoutCountdown ] = useState<number>(LOGOUT_REMAIN_TIME);

   const commonDependencies = () => {
      document.title = DEFAULT_TITLE;
      setClassVisible('');
      setTimeout(() => setContainerVisible(''), 200);
      setAdminSessionInfo!({ ...adminSessionInfo, modalOpen: false });
      setLogoutCountdown(LOGOUT_REMAIN_TIME);
   }

   const handleStayLogged = () => {
      commonDependencies();
      setAdminAuth!(true);
   }

   const handleLogout = () => {
      commonDependencies();
      setAdminAuth!(false);
      removeCookie!(COOKIES_OBJECT.adminSession, { path: '/', sameSite: 'strict' });
      removeCookie!(COOKIES_OBJECT.credentialsLevel, { path: '/', sameSite: 'strict' });
   }

   useEffect(() => {
      let index: NodeJS.Timeout;
      let logoutIndex: NodeJS.Timeout;
      let counter: number = 0;
      let toLogoutCounter: number = LOGOUT_REMAIN_TIME;
      if(adminSessionInfo!.modalOpen) {
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
               new Audio(`${process.env.PUBLIC_URL}/audio/session-warning.mp3`).play();
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [adminSessionInfo!.modalOpen]);

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