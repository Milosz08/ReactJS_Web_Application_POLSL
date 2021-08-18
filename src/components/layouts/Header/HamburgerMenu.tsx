/**
 * @file HambugerMenu.tsx
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

import React, { SetStateAction, Dispatch, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DelayLink from 'react-delay-link';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreContext';
import CONSTANT_DATA from '../../../constants/staticData';

const {
   hamburgerContainter, hamburgerButton, hamburgerBars, activeBars, menuWrapper, referentialLinks, outerLinks,
   activeMenu, externalLinkIcon
} = require('./Header.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   activeHamburger: boolean;
   setActiveHamburger: Dispatch<SetStateAction<boolean>>;
}

/**
 * @details Component generating hamburget button and hamburger drop-down menu after click (only on devices > 1250px).
 *
 * @param activeHamburger { boolean } - parameter that tells if the hamburger menu is active.
 * @param setActiveHamburger { Dispatch<SetStateAction<boolean>> } - change visibility of the hamburger (show / hide).
 */
const HamburgerMenu: React.FC<PropsProvider> = ({ activeHamburger, setActiveHamburger }) => {

   const changeHamburgerButton = activeHamburger ? classnames(hamburgerBars, activeBars) : hamburgerBars;
   const changeMenuSlide = activeHamburger ? classnames(menuWrapper, activeMenu) : menuWrapper;

   const { TOP_NAVBAR_ELMS, SITES } = CONSTANT_DATA;
   const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

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
            <DelayLink
               to = {`/${redeptWithPolish}`}
               delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
               replace = {false}
               clickAction = {timeoutRoutePath}
            >
               <a href = {`/${redeptWithPolish}`}>
                  {site.title}
               </a>
            </DelayLink>
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