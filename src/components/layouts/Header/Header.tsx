/**
 * @file Header.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactDelayLink: "^1.1.6"
 *                ReactCSSmodules: "^4.7.11"
 *                classnames: "^2.3.1"
 *
 * @date final version: 08/18/2021
 */

import React, { useContext, useEffect, useRef, useState } from 'react';
import DelayLink from 'react-delay-link';
import classnames from 'classnames';

import { MainStoreContext, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreContext';
import CONSTANT_DATA from '../../../constants/staticData';

import Navigation from '../Navigation/Navigation';
import HamburgerMenu from './HamburgerMenu';
import LoadingBigBar from '../LoadingBigBar/LoadingBigBar';
import CmsInfoBar from '../CmsInfoBar/CmsInfoBar';

const {
   topNavBar, topNavBarLinks, headerContainer, mainHeader, siteImportantInfo, stickyHeader, topSiteHeader,
   ifHeaderIsOnCookies, siteImportantInfoHide, navigationRouter, headerHideClass
} = require('./Header.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   ifHeaderHasRedBar: boolean;
}

/**
 * @details Component that generates the header on the page. Depending on the ifHeaderHasRedBar flag, header will
 *          have a red site bar underneath it.
 *
 * @param ifHeaderHasRedBar { boolean } - parameter defining whether the header should be shown with a red bar
 *                                        informing about the site (true -> active bar).
 */
const Header: React.FC<PropsProvider> = ({ ifHeaderHasRedBar }) => {

   const { TOP_NAVBAR_ELMS } = CONSTANT_DATA;
   const topHeaderHeightRef = useRef<HTMLElement | null>(null);

   const { timeoutRoutePath } = useContext<any>(MainStoreContext);

   const [ offset, setOffset ] = useState<number>(0);
   const [ width, setWidth ] = useState<number>(window.innerWidth);
   const [ menuSticky, setMenuSticky ] = useState<boolean>(false);
   const [ elmHeight, setElmHeight ] = useState<number>(0);
   const [ headerHide, setHeaderHide ] = useState<boolean>(false);
   const [ activeHamburger, setActiveHamburger ] = useState<boolean>(false);

   useEffect(() => {
      let prevScrollpos = window.pageYOffset;
      const handleScroll = () => {
         if(topHeaderHeightRef.current != null && width > 1250) {
            if(offset > topHeaderHeightRef.current.offsetHeight) {
               setMenuSticky(true);
            } else {
               setMenuSticky(false);
            }
         } else if(topHeaderHeightRef.current != null && width < 1250) {
            if(offset > 200 && !activeHamburger) {
               const currentScrollPos = window.pageYOffset;
               if(prevScrollpos > currentScrollPos) {
                  setHeaderHide(false);
               } else {
                  setHeaderHide(true);
               }
               prevScrollpos = currentScrollPos;
            }
            setMenuSticky(true);
         }
         setOffset(window.pageYOffset);
      }
      if(topHeaderHeightRef.current != null && width > 1250) {
         setElmHeight(topHeaderHeightRef.current.offsetHeight)
      }
      if(offset === 0) {
         setMenuSticky(false);
      }

      const handleResize = () => setWidth(window.innerWidth);

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('scroll', handleScroll);
         window.removeEventListener('resize', handleResize);
      };
   }, [activeHamburger, offset, width]);

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
   const hideHeaderBar = headerHide && width < 1250 ? headerHideClass : '';
   const toggleMainHeaderClasses = !ifHeaderHasRedBar ? classnames(mainHeader, ifHeaderIsOnCookies) : mainHeader;
   const toggleSiteInfoClasses = !ifHeaderHasRedBar
      ? classnames(siteImportantInfo, siteImportantInfoHide) : siteImportantInfo;

   return (
      <header
         className = {classnames(toggleMenuStickyClasses, hideHeaderBar)}
         style = {width > 1250 ? (menuSticky ? {top: `-${elmHeight}px`} : { }) : { }}
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
            style = {width > 1250 ? ({ height: `${offset > elmHeight ? 80 : (120 - offset)}px` }) : { height: 90 }}
         >
            <div className = {toggleMainHeaderClasses}>
               <DelayLink
                  to = '/'
                  delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                  replace = {false}
                  clickAction = {timeoutRoutePath}
               >
                  <a href = '/'>
                     <img
                        src = {process.env.PUBLIC_URL + `/images/logosBaner.png`}
                        alt = 'banerLogo'
                     />
                  </a>
               </DelayLink>
               <div className = {navigationRouter}>
                  {ifHeaderHasRedBar && <Navigation ifHeader = {true}/>}
               </div>
               <HamburgerMenu
                  activeHamburger = {activeHamburger}
                  setActiveHamburger = {setActiveHamburger}
               />
            </div>
         </div>
         <LoadingBigBar/>
         <div
            className = {toggleSiteInfoClasses}
            style = {{ transform: `translateY(-${offset}px)` }}
         >
            Nieoficjalna witryna internetowa kierunku "Informatyka" na wydziale Elektrycznym 2020/2021.
         </div>
         {document.location.pathname.includes('panel-administratora') && <CmsInfoBar/>}
      </header>
   );
}

export default Header;