import React, { Fragment, useState } from 'react';
import classnames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
 * @details
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