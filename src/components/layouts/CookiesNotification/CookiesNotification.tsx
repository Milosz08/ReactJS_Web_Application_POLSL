import React, { useContext } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { CookiesObjectsContext } from '../../../contextStore/CookiesObjectsProvider';

import UniversalHeader from "../UniversalHeader/UniversalHeader";

import cookieExpires from '../../../constants/cookieExpires';
import COOKIES_OBJECT from '../../../constants/allCookies';

const {
   cookieNotifContainer, cookiesNotifPopupContainer, cookiesMainContent, cookiesButtons, readPolicity,
   acceptPolicity, showCookiePopup
} = require('./CookiesNotification.module.scss');

const COOKIE_ID = uuidv4();

/**
 * Komponent odpowiadający za wyświetlanie powiadomienia o używaniu przez aplikację plików Cookies.
 * Komponent korzysta z kontekstu przechowującego metody dostępu do plików Cookie. Komponent tworzy nowy
 * plik cookie po zaakceptowaniu warunków. Modal nie jest wyświetlany, jeśli plik Cookie istnieje.
 */
const CookiesNotification = () => {

   const { cookie, setCookie } = useContext(CookiesObjectsContext)
   const ifCookieNotExist = cookie.__cookieNotification === undefined ? showCookiePopup : '';

   const handleCookieButtons = () => {
      if(cookie.__cookieNotification === undefined) { //jeśli plik Cookie nie istnieje
         const expCookie : Date = cookieExpires(365);
         setCookie(COOKIES_OBJECT.cookiesPopup, COOKIE_ID, {
            path: '/', expires: expCookie, sameSite: 'strict'
         });
      }
   }

   return (
      <div className = {classnames(cookieNotifContainer, ifCookieNotExist)}>
         <div className = {cookiesNotifPopupContainer}>
            <UniversalHeader
               iconP = {['fas', 'cookie-bite']}
               content = 'Pliki Cookies'
               ifCloseButtonVisible = {true}
               setCloseButton = {handleCookieButtons}
            />
            <section className = {cookiesMainContent}>
               W celu optymalizacji treści i wygody użytkowania, strona którą będziesz przeglądał korzysta z
               plików Cookies zapisanych na Twoim urządzeniu. Pliki Cookies, potocznie nazywane Ciasteczkami,
               możesz kontrolować za pomocą ustawień swojej przeglądarki internetowej. Dalsze korzystanie ze
               strony lub zamknięcie tego okna bez zmiany ustawień przeglądarki, oznacza że akceptujesz
               stosowanie polityki plików Cookies.
            </section>
            <div className = {cookiesButtons}>
               <button className = {readPolicity}>
                  <NavLink to = '/polityka-prywatności-cookies'>
                     Przeczytaj Politykę Prywatności
                  </NavLink>
               </button>
               <button
                  className = {acceptPolicity}
                  onClick = {handleCookieButtons}
               >
                  Zgadzam się z Polityką Cookies
               </button>
            </div>
         </div>
      </div>
   );
}

export default CookiesNotification;