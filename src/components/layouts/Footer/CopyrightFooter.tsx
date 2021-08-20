/**
 * @file CopyrightFooter.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactDelayLink: "^1.1.6"
 *                ReactFontAwesome: "^0.1.15"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/18/2021
 */

import React, { useContext } from 'react';
import DelayLink from 'react-delay-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';

const {
   copyrightSectionWrapper, copyIcons, copyAuthor, copyCookies, cookiesIcon
} = require('./Footer.module.scss');

/**
 * @details Component that generates the final footer (copyright, link to the Cookies policy and icons from the
 *          FontAwesome library used).
 */
const CopytightFooter = (): JSX.Element => {

   const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

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
            </a>.
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