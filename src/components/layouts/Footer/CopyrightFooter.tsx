import React, {useContext} from 'react';
import DelayLink from 'react-delay-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MainStoreContext, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreContext';

const {
   copyrightSectionWrapper, copyIcons, copyAuthor, copyCookies, cookiesIcon
} = require('./Footer.module.scss');

/**
 * Komponent generujący końcową stopkę (prawa autorskie, link do polityki plików Cookies oraz wykorzystane ikony
 * z biblioteki FontAwesome).
 */
const CopytightFooter = () => {

   const { timeoutRoutePath } = useContext<any>(MainStoreContext);

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
            <DelayLink
               to = '/polityka-prywatności-cookies'
               delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
               replace = {false}
               clickAction = {timeoutRoutePath}
            >
               <a href = {'/polityka-prywatności-cookies'}>
                  Polityka Prywatności
               </a>
            </DelayLink>
         </div>
      </div>
   );
}

export default CopytightFooter;