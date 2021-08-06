import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CookiesNotification from '../../layouts/CookiesNotification/CookiesNotification';
import Header from '../../layouts/Header/Header';
import CurrentURLpath from '../../layouts/CurrentURLpath/CurrentURLpath';

import COOKIES_OBJECT from '../../../constants/allCookies';
import TILES_DATA from '../../../constants/aidsTilesData';

const { universalHeader, fasIcon } = require('./../../layouts/Navigation/Navigation.module.scss');
const {
   aidsContainer, aisdWrapper, logoutButton, aidsMainContent, msTeamsTile, title, iconContainer, icon
} = require('./AidsPage.module.scss');

interface PropsProvider {
   setAuth: (value: boolean) => boolean;
   handleCookie: any;
}

/**
 * Komponent generujący stronę z Pomocami Naukowymi.
 *
 * @param setAuth { (value: boolean) => boolean } - funkcja ustawiająca autentykację.
 * @param handleCookie { any } - funkcja usuwająca/dodająca obiekt Cookie.
 */
const AidsPage: React.FC<PropsProvider> = ({ setAuth, handleCookie }) => {

   const handleLogout = (): void => {
      setAuth(false);
      handleCookie(COOKIES_OBJECT.userSession, { path: '/', sameSite: 'strict' });
   }

   const generateTilesStructure = TILES_DATA.map((tile: any) => (
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