/**
 * @file Footer.tsx
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DelayLink from 'react-delay-link';

import CONSTANT_DATA from "../../../constants/staticData";
import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from "../../../contextStore/MainStoreProvider";

const FooterForm = React.lazy(() => import('./FooterForm'));
const CopyrightFooter = React.lazy(() => import('./CopyrightFooter'));

const {
   footerWrapper, linksPages, revelarPages, footerContainer, externalLinkIcon, formContainer, footerHeaders,
   footerRouterContex, disclaimerBlock, copyrightSectionContainer, asideSeparator, asideOtherElements
} = require('./Footer.module.scss');

/**
 * @details The component responsible for the implementation of the footer (the footer is universal and appears on
 *          every subpage, it does not change its content). Includes links and a form.
 */
const Footer = (): JSX.Element => {

   const { TOP_NAVBAR_ELMS, SITES } = CONSTANT_DATA;
   const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const generateLinks = TOP_NAVBAR_ELMS.map(navElm => (
      <li key = {navElm.title}>
         <a
            href = {navElm.link}
            target = '_blank'
            rel = 'noreferrer'
         >
            {navElm.title}
            <FontAwesomeIcon
               icon = {['fas', 'external-link-alt']}
               className = {externalLinkIcon}
            />
         </a>
      </li>
   ));

   const generateReveal = SITES.map(navElm => {
      const redeptWithPolish = navElm.title.replace(/\s+/g, '-').toLowerCase();

      return (
         <li key = {navElm.title}>
            <DelayLink
               to = {`/${redeptWithPolish}`}
               delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
               replace = {false}
               clickAction = {timeoutRoutePath}
            >
               <a href = {`/${redeptWithPolish}`}>
                  {navElm.title}
               </a>
            </DelayLink>
         </li>
      );
   });

   return (
      <footer className = {footerWrapper}>
         <div className = {footerContainer}>
            <div className = {footerRouterContex}>
               <div className = {linksPages}>
                  <h3 className = {footerHeaders}>Linki Politechniki Śląskiej</h3>
                  <ul>{generateLinks}</ul>
               </div>
               <div className = {revelarPages}>
                  <h3 className = {footerHeaders}>Nawigacja</h3>
                  <ul>{generateReveal}</ul>
               </div>
               <div className = {asideOtherElements}>
                  <div className = {asideSeparator}/>
                  <div className = {disclaimerBlock}>
                     Strona nie jest powiązania ani zarządzana przez Politechnikę Śląską. Strona służy jedynie w
                     celach informacyjnych dla studentów kierunku Informatyka na wydziale Elektrycznym,
                     rozpoczętym w roku akademickim 2020/2021. Administratorzy/Moderatorzy systemu WCMS nie ponoszą
                     odpowiedzialności za błędne i/lub nieaktualne dane.
                  </div>
                  <DelayLink
                     to = {'/logowanie-do-panelu-administratora'}
                     delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                     replace = {false}
                     clickAction = {timeoutRoutePath}
                  >
                     <a href = {'/logowanie-do-panelu-administratora'}>
                        Logowanie do Panelu Administratora
                     </a>
                  </DelayLink>
               </div>
            </div>
            <div className = {formContainer}>
               <h3 className = {footerHeaders}>Wyślij wiadomość</h3>
               <FooterForm/>
            </div>
         </div>
         <div className = {copyrightSectionContainer}>
            <CopyrightFooter/>
         </div>
      </footer>
   );
}

export default Footer;