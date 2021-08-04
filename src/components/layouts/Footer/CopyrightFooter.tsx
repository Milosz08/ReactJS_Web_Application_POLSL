import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { copyrightSectionWrapper, copyIcons, copyAuthor, copyCookies, cookiesIcon } = require('./Footer.module.scss');

const CopytightFooter = () => {
   return (
      <div className = {copyrightSectionWrapper}>
         <div className = {copyIcons}>
            <span>Ikony pochodzą z biblioteki </span>
            <a
               href = 'https://fontawesome.com/'
               target = '_blank'
               rel = 'noreferrer'
            >
               Font Awesome
            </a>
         </div>
         <div className = {copyAuthor}>
            <span>&copy; 2020-2021 by </span>
            <a
               href = 'https://github.com/Milosz08'
               target = '_blank'
               rel = 'noreferrer'
            >
               Miłosz Gilga.
            </a>
         </div>
         <div className = {copyCookies}>
            <span>Ta strona wykorzystuje pliki cookies.</span>
            <FontAwesomeIcon
               icon = {['fas', 'cookie-bite']}
               className = {cookiesIcon}
            />
            <NavLink to = '/polityka-prywatności-cookies'>
               Polityka Prywatności
            </NavLink>
         </div>
      </div>
   );
}

export default CopytightFooter;