/**
 * @file AdminCmsLeftNavigation.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { Dispatch, SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import STATIC_NAV, { StaticNavTypes } from '../../../../constants/navigationStatic';

const { activeSection, cmsNavigation } = require('./AdminCmsMainPanel.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   activeNavElm: number;
   setActiveNavElm: Dispatch<SetStateAction<number>>
}

/**
 * @details Component that generates navigation through the CMS system administrator panels.
 *
 * @param activeNavElm { number } - the number indicating the active panel.
 * @param setActiveNavElm { Dispatch<SetStateAction<number>> } - function to set the active panel.
 */
const AdminCmsLeftNavigation: React.FC<PropsProvider> = ({ activeNavElm, setActiveNavElm  }): JSX.Element => {

   const generateNavStructure = STATIC_NAV.map((navElm: StaticNavTypes, id: number) => (
      <button
         className = {activeNavElm === id ? activeSection : ''}
         onClick = {() => setActiveNavElm(id)}
         key = {id}
      >
         <FontAwesomeIcon
            icon = {['fas', navElm.icon]}
            title = {navElm.alt}
         />
      </button>
   ));

   return (
      <nav className = {cmsNavigation}>
         {generateNavStructure}
      </nav>
   )
}

export default AdminCmsLeftNavigation;