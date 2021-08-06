import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const { cookiesInfoHeader, fasIcon } = require('./../../../layouts/Navigation/Navigation.module.scss');
const { cookiesSections, cookieContent } = require('./../CookiesPolicyPage.module.scss');

const CookiesHeader = () => {
   return (
      <header className = {classnames(cookiesInfoHeader, cookiesSections)}>
         <h3>
            <FontAwesomeIcon
               icon = {['fas', 'cookie-bite']}
               className = {fasIcon}
            />
            Polityka Cookies
            <aside/>
         </h3>
         <div className = {cookieContent}>
            Poniższa treść Polityki Cookies określa zasady zapisywania i uzyskiwania dostępu do danych na
            Urządzeniach elektronicznych, dalej nazywanych Urządzeniami Użytkowników korzystających z
            Serwisu do celów świadczenia usług drogą elektroniczną przez Administratora Serwisu.
         </div>
      </header>
   );
}

export default CookiesHeader;