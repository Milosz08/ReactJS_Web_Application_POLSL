import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from "classnames";

import CONSTANT_DATA from '../../../constants/staticData';
import Navigation from "../Navigation/Navigation";

const {
   topNavBar, topNavBarLinks, headerContainer, mainHeader, siteImportantInfo, stickyHeader, topSiteHeader,
   ifHeaderIsOnCookies, siteImportantInfoHide
} = require('./Header.module.scss');

interface PropsProvider {
   ifHeaderHasRedBar: boolean;
}

/**
 * Komponent generujący nagłównek na stronie. W zależności od flagi ifHeaderHasRedBar, header będzie posiadał
 * pod spodem czerwony pasek informujący o witrynie.
 *
 * @param ifHeaderHasRedBar { boolean } - parametr definiujący, czy nagłówek ma się pokazywać z czerwonym paskiem
 *                                        informującym o witrynie (wartość true -> pasek aktywny).
 */
const Header: React.FC<PropsProvider> = ({ ifHeaderHasRedBar }) => {

   const { TOP_NAVBAR_ELMS } = CONSTANT_DATA;
   const topHeaderHeightRef = useRef<HTMLElement | null>(null);

   const [ offset, setOffset ] = useState<number>(0);
   const [ menuSticky, setMenuSticky ] = useState<boolean>(false);
   const [ elmHeight, setElmHeight ] = useState<number>(0);

   useEffect(() => {
      const handleScroll = () => {
         if(topHeaderHeightRef.current != null) {
            if(offset > topHeaderHeightRef.current.offsetHeight) {
               setMenuSticky(true);
            } else {
               setMenuSticky(false);
            }
            setOffset(window.pageYOffset);
         }
      }
      if(topHeaderHeightRef.current != null) {
         setElmHeight(topHeaderHeightRef.current.offsetHeight)
      }
      if(offset === 0) {
         setMenuSticky(false);
      }

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, [offset]);

   const topNavbarElm = TOP_NAVBAR_ELMS.map(singleLink => (
      <a
         key = {singleLink.title}
         href = {singleLink.link}
         target = '_blank'
         rel = 'noreferrer'
      >
         {singleLink.title}
      </a>
   ));

   const toggleMenuStickyClasses = menuSticky ? classnames(topSiteHeader, stickyHeader) : topSiteHeader;
   const toggleMainHeaderClasses = ifHeaderHasRedBar ? classnames(mainHeader, ifHeaderHasRedBar) : ifHeaderIsOnCookies;
   const toggleSiteInfoClasses = ifHeaderHasRedBar
      ? classnames(siteImportantInfo, siteImportantInfoHide) : siteImportantInfoHide;

   return (
      <header
         className = {toggleMenuStickyClasses}
         style = {menuSticky ? {top: `-${elmHeight}px`} : {}}
      >
         <nav
            className = {topNavBar}
            ref = {topHeaderHeightRef}
         >
            <div className = {topNavBarLinks}>
               {topNavbarElm}
            </div>
         </nav>
         <div
            className = {headerContainer}
            style = {{ height: `${offset > elmHeight ? 80 : (120 - offset)}px` }}
         >
            <div className = {toggleMainHeaderClasses}>
               <NavLink to = '/'>
                  <img
                     src = {process.env.PUBLIC_URL + `/images/logosBaner.png`}
                     alt = 'banerLogo'
                  />
               </NavLink>
               {!ifHeaderHasRedBar && <Navigation ifHeader = {true}/>}
            </div>
         </div>
         <div
            className = {toggleSiteInfoClasses}
            style = {{ transform: `translateY(-${offset}px)` }}
         >
            Nieoficjalna witryna internetowa kierunku "Informatyka" na wydziale Elektrycznym 2020/2021.
         </div>
      </header>
   );
}

export default Header;