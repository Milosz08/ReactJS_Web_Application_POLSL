/**
 * @file CmsInfoHamburger.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                ReactCSSmodules: "^4.7.11"
 *                classnames: "^2.3.1"
 *
 * @date final version: 08/24/2021
 */

import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const {
   hamburgerContainer, hamburgerButton, hamburgerBars, hamburgerMenu, active, loginInfoHamburger, sessionTimeHamburger,
   logoutButton, logoutButtonHamburger, logoutIcon
} = require('./CmsInfoBar.module.scss');

interface PropsProvider {
   credLevel: string;
   timeCounting: string;
   callback: () => void;
}

/**
 * @details Component responsible for generating the hamburger menu for small devices in the CMS panel.
 */
const CmsInfoHamburger: React.FC<PropsProvider> = ({ credLevel, timeCounting, callback }): JSX.Element => {

   const [ activeMenu, setActiveMenu ] = useState<boolean>(false);

   return (
      <Fragment>
         <div className = {hamburgerContainer}>
            <button
               className = {hamburgerButton}
               onClick = {() => setActiveMenu(prevState => !prevState)}
            >
               <span className = {classnames(hamburgerBars, activeMenu ? active : '')}/>
            </button>
         </div>
         <div className = {classnames(hamburgerMenu, activeMenu ? active : '')}>
            <span className = {loginInfoHamburger}>
               Zalogowany jako: <strong>{credLevel}</strong>
            </span>
            <span className = {sessionTimeHamburger}>
               Pozostały czas sesji: <strong>{timeCounting}</strong>
            </span>
            <button
               className = {classnames(logoutButton, logoutButtonHamburger)}
               onClick = {callback}
            >
               <FontAwesomeIcon
                  icon = {['fas', 'power-off']}
                  className = {logoutIcon}
               />
               Wyloguj
            </button>
         </div>
      </Fragment>

   );
}

export default CmsInfoHamburger;