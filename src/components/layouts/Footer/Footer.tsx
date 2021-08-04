import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import FooterForm from './FooterForm';
import CopyrightFooter from './CopyrightFooter';

import CONSTANT_DATA from "../../../constants/staticData";

const {
   footerWrapper, linksPages, revelarPages, footerContainer, externalLinkIcon, formContainer, footerHeaders,
   footerRouterContex, disclaimerBlock, copyrightSectionContainer, asideSeparator, asideOtherElements,
   adminPanelRoute
} = require('./Footer.module.scss');

/**
 * Komponent odpowiadający za implementację stopki (stopka jest uniwersalna i występuje na
 * każdej podstronie, nie zmienia swojej zawartości). Zawiera linki i formularz.
 */
const Footer = () => {

   const { TOP_NAVBAR_ELMS, SITES } = CONSTANT_DATA;

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
            <NavLink to = {redeptWithPolish}>
               {navElm.title}
            </NavLink>
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
                  <div className = {asideSeparator}>
                     <div className = {disclaimerBlock}>
                        Strona nie jest powiązania ani zarządzana przez Politechnikę Śląską. Strona służy jedynie w
                        celach informacyjnych dla studentów kierunku Informatyka na wydziale Elektrycznym,
                        rozpoczętym w roku 2020.
                     </div>
                     <NavLink
                        to = {'/logowanie-do-panelu-administratora'}
                        className = {adminPanelRoute}
                     >
                        Logowanie do Panelu Administratora
                     </NavLink>
                  </div>
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