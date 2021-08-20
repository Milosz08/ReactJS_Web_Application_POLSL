/**
 * @file AidsPage.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { Fragment, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ROUTING_PATH_NAMES from '../../../constants/routingPathNames';

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../layouts/Header/Header';
import CurrentURLpath from '../../layouts/CurrentURLpath/CurrentURLpath';

import COOKIES_OBJECT from '../../../constants/allCookies';
import TILES_DATA, { TilesDataTypes } from '../../../constants/aidsTilesData';

const { universalHeader, fasIcon } = require('./../../layouts/Navigation/Navigation.module.scss');
const {
   aidsContainer, aisdWrapper, logoutButton, aidsMainContent, msTeamsTile, title, iconContainer, icon
} = require('./AidsPage.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   setAuth: (value: boolean) => boolean;
   handleCookie: any;
}

/**
 * @details Component that generates a page with Learning Aids.
 *
 * @param setAuth { (value: boolean) => boolean } - function to set the authentication.
 * @param handleCookie { any } - function for removing/adding a Cookie object.
 */
const AidsPage: React.FC<PropsProvider> = ({ setAuth, handleCookie }) => {

   const handleLogout = (): void => {
      setAuth(false);
      handleCookie(COOKIES_OBJECT.userSession, { path: '/', sameSite: 'strict' });
   }

   const generateTilesStructure = TILES_DATA.map((tile: TilesDataTypes) => (
      <a href = {tile.link} target = '_blank' rel = 'noreferrer' key = {tile.title}>
         <section className = {msTeamsTile}>
            <div className = {iconContainer}>
               <FontAwesomeIcon
                  icon = {tile.icon}
                  className = {icon}
               />
            </div>
            <div className = {title}>{tile.title}</div>
         </section>
      </a>
   ));

   useEffect(() => {
      document.title = ROUTING_PATH_NAMES.AISD_PAGE;
      return () => { document.title = ROUTING_PATH_NAMES.START_PAGE };
   }, []);

   return (
      <Fragment>
         <CookiesNotification/>
         <Header ifHeaderHasRedBar = {true}/>
         <CurrentURLpath ifImportatHeaderActive = {true}/>
         <div className = {aidsContainer}>
            <div className = {aisdWrapper}>
               <section className = {universalHeader}>
                  <h3>
                     <FontAwesomeIcon
                        icon = {['fas', 'lightbulb']}
                        className = {fasIcon}
                     />
                     Pomoce Naukowe
                     <aside/>
                     <button
                        onClick = {handleLogout}
                        className = {logoutButton}
                     >Wyloguj</button>
                  </h3>
               </section>
               <div className = {aidsMainContent}>
                  {generateTilesStructure}
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default AidsPage;