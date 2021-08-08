import React, { SetStateAction, Dispatch } from 'react';
import classnames from 'classnames';

import CONSTANT_DATA from '../../../constants/staticData';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const {
   hamburgerContainter, hamburgerButton, hamburgerBars, activeBars, menuWrapper, referentialLinks, outerLinks,
   activeMenu, externalLinkIcon
} = require('./Header.module.scss');

interface PropsProvider {
   activeHamburger: boolean;
   setActiveHamburger: Dispatch<SetStateAction<boolean>>;
}

/**
 * Komponent generujący przycisk Hamburger wraz z rozwijaną listą menu (tylko na urządzeniach > 1250px).
 *
 * @param activeHamburger { boolean } - parametr mówiący, czy menu hamburger jest aktywne.
 * @param setActiveHamburger { Dispatch<SetStateAction<boolean>> } - zmiana menu hamburger (pokazanie/schowanie).
 */
const HamburgerMenu: React.FC<PropsProvider> = ({ activeHamburger, setActiveHamburger }) => {

   const changeHamburgerButton = activeHamburger ? classnames(hamburgerBars, activeBars) : hamburgerBars;
   const changeMenuSlide = activeHamburger ? classnames(menuWrapper, activeMenu) : menuWrapper;
   const { TOP_NAVBAR_ELMS, SITES } = CONSTANT_DATA;

   const topNavbarElm = TOP_NAVBAR_ELMS.map((singleLink: any) => (
      <li key = {singleLink.title}>
         <a
            href = {singleLink.link}
            target = '_blank'
            rel = 'noreferrer'
         >
            {singleLink.title}
            <FontAwesomeIcon
               icon = {['fas', 'external-link-alt']}
               className = {externalLinkIcon}
            />
         </a>
      </li>
   ));

   const navigationElements = SITES.map(site => {
      const redeptWithPolish: string = site.title.replace(/\s+/g, '-').toLowerCase();

      return (
         <li key = {site.title}>
            <NavLink to = {redeptWithPolish}>
               {site.title}
            </NavLink>
         </li>
      );
   });

   return (
      <div className = {hamburgerContainter}>
         <button
            className = {hamburgerButton}
            onClick = {() => setActiveHamburger((prevState: boolean) => !prevState)}
            title = {`Kliknij aby ${!activeHamburger ? 'rozwinąć' : 'schować'} menu`}
         >
            <div className = {changeHamburgerButton}/>
         </button>
         <div className = {changeMenuSlide}>
            <div className = {referentialLinks}>
               <ul>
                  {navigationElements}
               </ul>
            </div>
            <div className = {outerLinks}>
               <ul>
                  {topNavbarElm}
               </ul>
            </div>
         </div>
      </div>
   );
}

export default HamburgerMenu;